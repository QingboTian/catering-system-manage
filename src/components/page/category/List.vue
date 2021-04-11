<template>
  <div class="app">
    <div class="btn">
      <el-button type="primary" style="margin-bottom: 20px" @click="addLevel1()"
        >添加一级分类</el-button
      >
      <el-button type="primary" @click="loadClassify()">刷新</el-button>
    </div>
    <div class="block">
      <el-tree
        :data="list"
        show-checkbox
        node-key="id"
        :default-expand-all="false"
        :default-expanded-keys="[215]"
        :expand-on-click-node="true"
        highlight-current
        :props="{label: 'name'}"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              v-if="node.level < 2"
              @click="() => append(node, data)"
            >
              添加子节点
            </el-button>
            <el-button
              size="mini"
              type="text"
              v-if="node.isLeaf"
              @click="() => remove(node, data)"
              style="color: red"
            >
              删除该节点
            </el-button>
            <!-- <el-button size="mini" type="text" @click="() => edit(node, data)">
              编辑
            </el-button> -->
          </span>
        </span>
      </el-tree>
    </div>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model.trim="form.name" autofocus></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {categoryList, create, deleteCategory} from "../../../api/category"
export default {
  data() {
    return {
      dialogVisible: false,
      list: [],
      form: {
        name: "",
        parentId: 0,
        level: 1,
      },
      query: {
        parentId: 0
      },
      editFlag: false,
    };
  },

  methods: {
    append(node, data) {
      this.form.parentId = data.id;
      this.form.id = null;
      this.form.name = "";
      this.dialogVisible = true;
      this.editFlag = false;
    },

    edit(node, data) {
      this.form.name = data.label;
      this.form.parentId = null;
      this.form.level = node.level;
      this.form.id = data.value;
      this.dialogVisible = true;
      this.editFlag = true;
    },

    addLevel1() {
      this.form.parentId = 0;
      this.form.level = 1;
      this.form.name = "";
      this.form.id = null;
      this.editFlag = false;
      this.dialogVisible = true;
    },

    submitHandler() {
      if (!this.form.name || this.form.name == "") {
        this.$message("名称为空");
        return;
      }

      if (this.editFlag) {
        this.update();
      } else {
        this.save();
      }
    },

    update() {
      this.axios.post("/api/classify/update", this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("节点修改成功");
          this.dialogVisible = false;

          this.loadClassify();
        } else {
          this.$message.error("节点修改失败");
        }
      });
    },

    save() {
      create(this.form).then(() => {
        this.dialogVisible = false;
        this.$message.success("节点添加成功");
        this.loadClassify();
      })
    },

    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCategory(data.id).then(() => {
            this.$message.success("节点删除成功");
            this.loadClassify();
          });
        })
        .catch(() => {});
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },

    loadClassify() {
      categoryList(this.query).then(res => {
        this.list = res.data;
      })
    },
  },

  created() {
    this.loadClassify();
  },
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

</style>