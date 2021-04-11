<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称" required="">
                <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="口味">
                <el-input type="textarea" v-model.trim="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="封面" required="">
                <Upload @onSuccess="onSuccess"></Upload>
            </el-form-item>
            <el-form-item label="类目名称" required="">
                <el-cascader
                    :options="options.category"
                    :props="{ expandTrigger: 'hover', label: 'name', value: 'id' }"
                    @change="categoryChangeHandle"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="成本价" required="">
                <el-input v-model.trim="form.costPrice"></el-input>
            </el-form-item>
            <el-form-item label="售价" required="">
                <el-input v-model.trim="form.price"></el-input>
            </el-form-item>
            <el-form-item label="单位" required="">
                <el-input v-model.trim="form.unit" placeholder="菜品的计量单位，如一份"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Upload from '../../Upload';
import { categoryList } from '../../../api/category';
import { create } from '../../../api/dishes';
export default {
    data() {
        return {
            form: {
                name: '',
                desc: '',
                url: '',
                categoryId: '',
                costPrice: '',
                price: '',
                unit: '',
            },
            options: {
                category: []
            }
        };
    },
    methods: {
        onSubmit() {
            var data = this.form;
            console.log(data)
            if (data.name == '') {
                this.$message("名称不能为空");
                return;
            }
            if (data.url == '') {
                this.$message("封面不能为空");
                return;
            }
            if (data.categortId == '') {
                this.$message("类目不能为空");
                return;
            }
            if (data.costPrice == '') {
                this.$message("成本价不能为空");
                return;
            }
            if (data.price == '') {
                this.$message("售价不能为空");
                return;
            }
            if (data.unit == '') {
                this.$message("单位不能为空");
                return;
            }
            create(data).then(res => {
                if (res.status == 200) {
                    this.$message.success("创建成功");
                    this.$emit('onSubmit');
                }
            })
        },
        onSuccess(response, file, fileList) {
            this.form.url = response.data;
        },
        categoryChangeHandle(data) {
            var categoryId = data[data.length - 1];
            this.form.categoryId = categoryId;
        },
        loadCategoryList() {
            categoryList({ parentId: 0 }).then((res) => {
                if (res.status == 200) {
                    this.options.category = res.data;
                }
            });
        }
    },
    components: {
        Upload
    },
    created() {
        this.loadCategoryList();
    },
    mounted() {}
};
</script>

<style scoped>
</style>