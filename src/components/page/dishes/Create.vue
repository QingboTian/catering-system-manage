<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="口味">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <Upload :action="action"></Upload>
            </el-form-item>
            <el-form-item label="类目名称">

            </el-form-item>
            <el-form-item label="成本价">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="售价">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="单位" >
                <el-input v-model="form.name" placeholder="菜品的计量单位，如一份"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Upload from "../../Upload"
export default {
    data() {
        return {
            action: {},
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    components: {
        Upload
    }
};
</script>

<style scoped>
</style>