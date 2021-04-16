<template>
    <div>
        <div class="query-area">
            <el-form :inline="true" :model="query">
                <el-form-item label="名称">
                    <el-input v-model="query.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="类目">
                    <el-select>
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="query.status">
                        <el-option v-for="item in options.status" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="searchHandler">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createHandler">创建</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="100" align="center"> </el-table-column>
                <el-table-column prop="name" label="名称" align="center"> </el-table-column>
                <el-table-column prop="taste" label="口味" align="center"> </el-table-column>
                <el-table-column prop="url" label="菜品图" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 50px; height: 50px" :src="'http://127.0.0.1:8081' + scope.url" fit="fit" :preview-src-list="['//localhost:8080' + scope.url]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="类目名称" align="center"> </el-table-column>
                <el-table-column prop="price" label="售价(元)" align="center"> </el-table-column>
                <el-table-column prop="costPrice" label="成本价(元)" align="center"> </el-table-column>
                <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                <el-table-column prop="created" label="创建时间" align="center"> </el-table-column>
                <el-table-column prop="creator" label="创建者" align="center"> </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待上架</span>
                        <span v-if="scope.row.status == 2" style="color: green">已上架</span>
                        <span v-if="scope.row.status == 3">已下架</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="editHandler(scope.row)">编辑</el-button> -->
                        <el-button
                            type="primary"
                            v-if="scope.row.status == 1 || scope.row.status == 3"
                            size="mini"
                            @click="onLineHandler(scope.row)"
                            >上架</el-button
                        >
                        <el-button type="primary" v-if="scope.row.status == 2" size="mini" @click="offLineHandler(scope.row)"
                            >下架</el-button
                        >
                        <el-button
                            type="danger"
                            v-if="scope.row.status == 1 || scope.row.status == 3"
                            size="mini"
                            @click="deleteHandler(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top: 20px">
            <center>
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="query.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </center>
        </div>
        <el-dialog :visible.sync="visible" :before-close="handleClose" center>
            <Create @onSubmit="onSubmit" @cancel="cancel"></Create>
        </el-dialog>
    </div>
</template>

<script>
import { create, deleteDishes, list, update, online, offline } from '../../../api/dishes';
import Create from './Create';
export default {
    data() {
        return {
            visible: false,
            tableData: [],
            query: {
                currentPage: 1,
                pageSize: 10
            },
            total: 0,
            options: {
                status: [
                    {
                        value: null,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '未上架'
                    },
                    ,
                    {
                        value: 2,
                        label: '已上架'
                    },
                    ,
                    {
                        value: 3,
                        label: '已下架'
                    }
                ]
            }
        };
    },
    methods: {
        cancel() {
            this.visible = false;
        },
        onSubmit() {
            this.visible = false;
            this.getList(this.query);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        editHandler(row) {
            var data = JSON.parse(JSON.stringify(row));
            this.visible = true;
            // update(row).then((res) => {
            //     if (res.status == 200) {
            //         this.$message.success('更新成功');
            //         this.getList(this.query);
            //     }
            // });
        },
        onLineHandler(row) {
            online(row.id).then((res) => {
                if (res.status == 200) {
                    this.$message.success('上架成功');
                    this.getList(this.query);
                }
            });
        },
        offLineHandler(row) {
            offline(row.id).then((res) => {
                if (res.status == 200) {
                    this.$message.success('下架成功');
                    this.getList(this.query);
                }
            });
        },
        deleteHandler(row) {
            deleteDishes(row.id).then((res) => {
                if (res.status == 200) {
                    this.$message.success('删除成功');
                    this.getList(this.query);
                }
            });
        },
        createHandler() {
            this.visible = true;
        },
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.getList(this.query);
        },
        handleCurrentChange(val) {
            this.query.currentPage = val;
            this.getList(this.query);
        },
        searchHandler() {
            this.query.currentPage = 1;
            this.query.pageSize = 10;
            this.getList(this.query);
        },
        getList(query) {
            list(query).then((res) => {
                this.currentPage = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
                this.tableData = res.data.list;
            });
        }
    },
    components: {
        Create
    },
    created() {
        this.getList(this.query);
    }
};
</script>

<style scoped>
</style>