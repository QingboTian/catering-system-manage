<template>
    <div>
        <!-- <div style="margin-bottom: 20px">
            <el-button type="primary" @click="appointmentHandler">预约</el-button>
        </div> -->
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="100" align="center"> </el-table-column>
                <el-table-column prop="roomId" label="包间ID" align="center"> </el-table-column>
                <el-table-column prop="roomName" label="包间名称" align="center"> </el-table-column>
                <el-table-column prop="roomType" label="包间类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.roomType == 1">大厅</span>
                        <span v-if="scope.row.roomType == 2">包间</span>
                    </template>
                </el-table-column>
                <el-table-column prop="creator" label="预约人" align="center"> </el-table-column>
                <el-table-column prop="startTime" label="开始时间" align="center"> </el-table-column>
                <el-table-column prop="endTime" label="结束时间" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="cancel(scope.row.id)">取消预约</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { appointment, cancel, list } from '../../../api/appointment';
export default {
    data() {
        return {
            dialogTableVisible: false,
            tableData: [],
            query: {},
            total: 0,
            roomList: []
        };
    },
    methods: {
        cancel(val) {
            cancel(val).then((res) => {
                if (res.status == 200) {
                    this.$message('取消成功');
                    this.getList(this.query);
                }
            });
        },
        editHandler() {},
        appointmentHandler() {
            this.dialogTableVisible = true;
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
                this.tableData = res.data;
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