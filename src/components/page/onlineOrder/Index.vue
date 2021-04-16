<template>
    <div>
        <div class="category">
            <el-menu
                :default-active="defaultActice"
                class="category"
                mode="horizontal"
                @select="categorySelectHandle"
                background-color="#EBEEF5"
                text-color="#000"
            >
                <el-menu-item index="all">全部</el-menu-item>
                <el-submenu v-for="item in categoryList" :key="item.id" :index="item.id.toString()">
                    <template slot="title">{{ item.name }}</template>
                    <el-menu-item :index="subItem.id.toString()" v-for="subItem in item.children" :key="subItem.id">{{
                        subItem.name
                    }}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="con">
            <span v-for="item in tableData" :key="item.id" class="dishes">
                <div class="poster">
                    <el-image style="width: 200px; height: 200px; border-radius: 10%" :src="item.url" fit="fit"></el-image>
                </div>
                <div class="desc">
                    <div class="name-price">
                        <div class="name">{{ item.name }} - ({{ item.category }})</div>
                        <div class="price">{{ item.price }}RMB {{ item.unit }}</div>
                    </div>
                    <div class="add-img" @click="addItem(item)">
                        <el-image style="width: 30px; height: 30px" :src="require('../../../img/Add.png')" fit="fit"></el-image>
                    </div>
                </div>
            </span>
        </div>
        <div class="shopping-car">
            <div></div>
            <div style="flex: 1" class="car" @click="clickCartHandler">
                <el-image style="width: 50px; height: 50px" :src="require('../../../assets/car.png')" fit="fit"></el-image>
                <div>
                    购物车
                    <span style="color: red"> ({{ carItemNum }}) </span>
                </div>
            </div>
        </div>
        <div style="margin-top: 20px">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="query.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <el-dialog title="购物车" :visible.sync="dialogTableVisible">
            <div>总价：{{ cartTotalPrice }}RMB</div>
            <el-button type="primary" size="small" @click="orderHandler">下单</el-button>
            <el-table :data="carItem" border style="margin-top: 20px" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column property="dishesName" label="菜品名称" align="center"></el-table-column>
                <el-table-column property="dishesPrice" label="单价" align="center"></el-table-column>
                <el-table-column property="total" label="数量" align="center"></el-table-column>
                <el-table-column property="totalPrice" label="总价" align="center"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="addItemHandler(scope.row)" size="small">增加</el-button>
                        <el-button type="primary" @click="subItemHandler(scope.row)" size="small">减少</el-button>
                        <el-button type="danger" @click="deleteItemHandler(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { list, cartList, addOrReduce, deleteCartItem, createOrder } from '../../../api/dishes';
import { categoryList } from '../../../api/category';
export default {
    data() {
        return {
            tableData: [],
            query: {
                currentPage: 1,
                pageNum: 21,
                status: 2
            },
            total: 0,
            categoryList: [],
            defaultActice: 'all',
            carItem: [],
            // 购物车商品数量
            carItemNum: 0,
            dialogTableVisible: false,
            cartTotalPrice: 0,
            // 购物车商品选择列表
            itemSelectArray: []
        };
    },
    methods: {
        // 下单操作
        orderHandler() {
            if (this.itemSelectArray.length <= 0) {
                this.$message('请选择商品再进行下单！');
                return;
            }
            var order = {
                phone: '',
                address: '',
                orderDetails: this.carItem
            };
            createOrder(order).then((res) => {
                this.$message.success('下单成功，请耐心等待！');
                this.dialogTableVisible = false;
                // 清理购物车商品
                for (var i = 0; i < this.itemSelectArray.length; i++) {
                    deleteCartItem(this.itemSelectArray[i].dishesId).then((res) => {
                        this.loadShoppingCartList();
                    });
                }
            });
        },
        handleSelectionChange(data) {
            this.itemSelectArray = data;
        },
        // 打开购物车
        clickCartHandler() {
            this.dialogTableVisible = true;
        },
        addItem(data) {
            addOrReduce({
                dishesId: data.id,
                num: 1
            }).then((res) => {
                this.$message.success('添加购物车成功！');
                this.loadShoppingCartList();
            });
        },
        // 购物车商品数量增加
        addItemHandler(row) {
            addOrReduce({
                dishesId: row.dishesId,
                num: 1
            }).then((res) => {
                this.loadShoppingCartList();
            });
        },
        // 购物车商品数量减少
        subItemHandler(row) {
            addOrReduce({
                dishesId: row.dishesId,
                num: -1
            }).then((res) => {
                this.loadShoppingCartList();
            });
        },
        // 购物车商品删除
        deleteItemHandler(row) {
            deleteCartItem(row.dishesId).then((res) => {
                this.$message.success('删除成功');
                this.loadShoppingCartList();
            });
        },
        handleSizeChange(val) {
            this.query.pageSize = val;
            this.loadDishesList(this.query);
        },
        handleCurrentChange(val) {
            this.query.currentPage = val;
            this.loadDishesList(this.query);
        },
        categorySelectHandle(id) {
            if (id == 'all') {
                this.query.categoryId = null;
            } else {
                this.query.categoryId = id;
            }
            this.loadDishesList(this.query);
        },
        // 加载菜单
        loadDishesList(query) {
            list(query).then((res) => {
                this.currentPage = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
                this.tableData = res.data.list;
            });
        },
        // 加载分类
        loadCategoryList() {
            categoryList({ parentId: 0 }).then((res) => {
                this.categoryList = res.data;
                this.defaultActice = this.categoryList[0].id.toString();
            });
        },
        // 若商品已经勾选之后商品数量还发生变化  需要重置
        itemSelectArrayInit(carItem) {
            console.log(this.itemSelectArray)
            for(var i = 0; i < this.itemSelectArray.length; i++) {
                if (carItem.dishesId == this.itemSelectArray[i].dishesId) {
                    this.itemSelectArray[i] = carItem;
                    break;
                }
            }
            console.log(this.itemSelectArray)
        },
        // 加载购物车
        loadShoppingCartList() {
            this.itemSelectArray;
            cartList().then((res) => {
                this.carItem = res.data;
                var size = 0;
                this.cartTotalPrice = 0;
                for (var i = 0; i < this.carItem.length; i++) {
                    size += this.carItem[i].total;
                    this.cartTotalPrice += this.carItem[i].totalPrice;
                    // this.itemSelectArrayInit(this.carItem[i]);
                }
                this.carItemNum = size;
                this.itemSelectArray = []
            });
        }
    },
    created() {
        this.loadDishesList(this.query);
        this.loadCategoryList();
        this.loadShoppingCartList();
    }
};
</script>

<style scoped>
.con {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: small;
}

.dishes {
    margin: 10px;
    border-radius: 10%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.desc {
    margin-left: 10px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.name-price {
    flex: 1;
    font-weight: bold;
}

.category {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.shopping-car {
    text-align: right;
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>