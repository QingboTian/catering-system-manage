<template>
    <div>
        <div class="con">
            <span v-for="(item) in tableData" :key="item.id" class="dishes">
                <div class="poster">
                    <el-image
      style="width: 200px; height: 200px; border-radius: 10%;"
      :src="item.url"
      fit="fit"></el-image>
                </div>
                <div class="desc">
                    <div class="name-price">
                        <div class="name">
                            {{item.name}}
                        </div>
                        <div class="price">
                            {{item.price}}RMB {{item.unit}}
                        </div>
                    </div>
                    <div class="add-img">
                        <el-image
      style="width: 30px; height: 30px;"
      :src="require('../../../img/Add.png')"
      fit="fit"></el-image>
                    </div>
                </div>
            </span>
        </div>
        <div class="page">

        </div>
    </div>
</template>

<script>
import { list } from '../../../api/dishes';
export default {
    data() {
        return {
            tableData: [],
            query: {
                currentPage: 1,
                pageNum: 10
            },
            total: 0
        }
    },
    methods: {
        loadDishesList(query) {
            list(query).then(res => {
                this.currentPage = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                this.total = res.data.total;
                this.tableData = res.data.list;
            })
        }
    },
    created() {
        this.loadDishesList(this.query);
    }
}
</script>

<style scoped>
.con {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.dishes {
    margin: 10px;
    border-radius: 10%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.desc {
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.name-price {
    flex: 1;
}
</style>