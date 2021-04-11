<template>
    <div>
        <div class="query-area">
            <el-form :inline="true" :model="query">
                <el-form-item label="用户名">
                    <el-input v-model="query.username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchHandler">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="100" align="center"> </el-table-column>
                <el-table-column prop="username" label="用户名" align="center"> </el-table-column>
                <el-table-column prop="birthday" label="生日" align="center"> </el-table-column>
                <el-table-column prop="roleId" label="用户类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.roleId == 1">管理员</span>
                        <span v-if="scope.row.roleId == 2">普通用户</span>
                        <span v-if="scope.row.roleId == 3">会员</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机" align="center"> </el-table-column>
                <el-table-column prop="mail" label="邮箱" align="center"> </el-table-column>
                <el-table-column prop="created" label="创建时间" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="deleteHandler(scope.row.id)">拉黑</el-button>
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
    </div>
</template>

<script>
import { create, deleteUser, list } from '../../../api/admin';
export default {
    data() {
        return {
            tableData: [],
            query: {
                currentPage: 1,
                pageSize: 10,
                username: ''
            },
            total: 0
        };
    },
    methods: {
        deleteHandler(val) {
            deleteUser(val).then((res) => {
                if (res.status == 200) {
                    this.$message("拉黑成功");
                    this.getList(this.query);
                }
            })
        },
        editHandler() {

        },
        createHandler() {

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
    created() {
        this.getList(this.query);
    }
};
</script>

<style scoped>
</style>