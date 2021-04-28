<template>
    <div>
        <div style="margin-bottom: 20px">
            <el-button type="primary" @click="createHandler" v-if="roleId == 1">创建</el-button>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="100" align="center"> </el-table-column>
                <el-table-column prop="name" label="名称" align="center"> </el-table-column>
                <el-table-column prop="no" label="编号" align="center"> </el-table-column>
                <el-table-column prop="type" label="类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 1">大厅</span>
                        <span v-if="scope.row.type == 2">包间</span>
                    </template>
                </el-table-column>
                <el-table-column prop="humanNum" label="人数" align="center"> </el-table-column>
                <el-table-column prop="created" label="创建时间" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="deleteHandler(scope.row.id)" v-if="roleId == 1">删除</el-button>
                        <el-button type="primary" size="mini" @click="appointmentHandler(scope.row.id)">预约</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog title="包间列表" :visible.sync="dialogTableVisible">
                <div style="margin-bottom: 20px">
                    <el-button type="primary" @click="todayOrTomor(1)">今天</el-button>
                    <el-button type="primary" @click="todayOrTomor(2)">明天</el-button>
                </div>
                <el-table :data="appointmentList">
                    <el-table-column property="desc" label="时间" align="center">
                        <!-- <template slot-scope="scope">
                            <span v-if="scope.row.areaCode == 1">08:00:00</span>
                            <span v-if="scope.row.areaCode == 2">10:00:00</span>
                            <span v-if="scope.row.areaCode == 3">12:00:00</span>
                            <span v-if="scope.row.areaCode == 4">14:00:00</span>
                            <span v-if="scope.row.areaCode == 5">16:00:00</span>
                            <span v-if="scope.row.areaCode == 6">18:00:00</span>
                            <span v-if="scope.row.areaCode == 7">20:00:00</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="appointment(scope.row)" :disabled="scope.row.status">
                                <span v-if="scope.row.status">已满</span>
                                <span v-else>预约</span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { create, deleteRoom, list } from '../../../api/room';
import { appointment, roomList } from '../../../api/appointment';
export default {
    data() {
        return {
            appointmentList: [],
            dialogTableVisible: false,
            tableData: [],
            query: {
                currentPage: 1,
                pageSize: 10,
                username: ''
            },
            total: 0,
            roomId: 0,
            roleId: 0
        };
    },
    methods: {
        appointment(row) {
            appointment(row).then((res) => {
                if (res.status == 200) {
                    this.$message.success('预约成功');
                    this.dialogTableVisible = false;
                }
            });
        },
        appointmentHandler(val) {
            var data = {
                day: val,
                roomId: val
            };
            this.dialogTableVisible = true;
            this.roomId = val;
            roomList(data).then((res) => {
                this.appointmentList = res.data;
            });
        },
        todayOrTomor(day) {
            var data = {
                day: day,
                roomId: this.roomId
            };
            this.dialogTableVisible = true;
            roomList(data).then((res) => {
                this.appointmentList = res.data;
            });
        },
        deleteHandler(val) {
            deleteRoom(val).then((res) => {
                if (res.status == 200) {
                    this.$message('删除成功');
                    this.getList(this.query);
                }
            });
        },
        editHandler() {},
        createHandler() {},
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
                this.tableData = res.data;
            });
        }
    },
    created() {
        this.getList(this.query);
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (1 == userInfo.roleId) {
            this.roleId = 1;
            this.loadStatistical();
        } else {
            this.roleId = 0;
        }
    }
};
</script>

<style scoped>
</style>