<template>
    <div>
        <div class="query-area">
            <el-form :inline="true" :model="query">
                <el-form-item label="订单ID">
                    <el-input v-model="query.orderId"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select v-model="query.status">
                        <el-option v-for="item in options.status" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="searchHandler">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="roleId == 1">
            当日营收：{{statistical.todayRevenue}} 当日成本：{{statistical.todayCost}} 当日利润：{{statistical.todayRevenue - statistical.todayCost}} 总营收：{{statistical.totalRevenue}} 总成本：{{statistical.totalCost}} 总利润：{{statistical.totalRevenue - statistical.totalCost}}
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="orderId" label="订单ID" align="center"> </el-table-column>
                <el-table-column prop="totalPrice" label="订单总价（元）" align="center"> </el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"> </el-table-column>
                <el-table-column prop="地址" label="address" align="center"> </el-table-column>
                <el-table-column prop="address" label="地址" align="center"> </el-table-column>
                <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
                <el-table-column prop="created" label="创建时间" align="center"> </el-table-column>
                <el-table-column prop="creator" label="创建者" align="center"> </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1" style="color:red">未支付</span>
                        <span v-if="scope.row.status == 2" style="color:green">已支付</span>
                        <span v-if="scope.row.status == 3">进行中</span>
                        <span v-if="scope.row.status == 4" style="color:green">待评价</span>
                        <span v-if="scope.row.status == 5" style="color:green">已完成</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" v-if="scope.row.status != 5" size="mini" @click="doneHandler(scope.row)">完成</el-button>
                        <el-button type="primary" v-if="scope.row.status == 1" size="mini" @click="payHandler(scope.row)">支付</el-button>
                        <!-- <el-button type="primary" size="mini">订单详情</el-button> -->
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
import { create, deleteDishes, list, done, pay, statistical } from '../../../api/order';
export default {
    data() {
        return {
            roleId: 0,
            tableData: [],
            query: {
                currentPage: 1,
                pageSize: 10
            },
            statistical: {
                todayRevenue:null,
                todayCost: null,
                totalRevenue: null,
                totalCost: null
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
        payHandler(row) {
            pay(row.orderId).then((res) => {
                if (res.status == 200) {
                    this.$message.success('支付成功');
                    this.getList(this.query);
                }
            });
        },
        editHandler() {},
        doneHandler(row) {
            done(row.orderId).then((res) => {
                if (res.status == 200) {
                    this.$message.success('订单完成');
                    this.getList(this.query);
                }
            });
        },
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
                this.tableData = res.data.list;
            });
        },
        loadStatistical() {
            statistical().then(res => {
                var data = res.data;
                this.statistical = data;
            })
        }
    },
    created() {
        this.getList(this.query);
        this.loadStatistical();
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (1 == userInfo.roleId) {
            this.roleId = 1;
        } else {
            this.roleId = 0;
        }
    }
};
</script>

<style scoped>
</style>