<template>
    <div>
        <page-header title="商品列表" content="以卡片的形式展现商品或图片信息。" />
        <el-row :gutter="20" style="margin: 0 10px;">
            <el-col :lg="6" :md="8" :sm="12">
                <el-card shadow="hover" class="goods-card">
                    <el-image fit="cover" :src="img1" class="image" />
                    <div class="title">Dell 显示器</div>
                    <div class="sub-title">高刷新率显示器</div>
                    <div class="price">
                        <span class="sales">879.00</span>
                        <span class="original">999.00</span>
                    </div>
                    <div class="tags">
                        <el-tag type="warning" size="small" effect="dark">推荐</el-tag>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12">
                <el-card shadow="hover" class="goods-card">
                    <el-image fit="cover" :src="img2" class="image" />
                    <div class="title">HHKB 静电容键盘</div>
                    <div class="sub-title">程序员最爱</div>
                    <div class="price">
                        <span class="sales">2499.00</span>
                        <span class="original">2699.00</span>
                    </div>
                    <div class="tags">
                        <el-tag type="danger" size="small" effect="dark">缺货</el-tag>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12">
                <el-card shadow="hover" class="goods-card">
                    <el-image fit="cover" :src="img3" class="image" />
                    <div class="title">雷蛇鼠标</div>
                    <div class="sub-title">电竞游戏专用</div>
                    <div class="price">
                        <span class="sales">109.00</span>
                        <span class="original">129.00</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12">
                <el-card shadow="hover" class="goods-card">
                    <el-image fit="cover" :src="img4" class="image" />
                    <div class="title">苹果 iPhone 12</div>
                    <div class="sub-title">苹果最新款手机</div>
                    <div class="price">
                        <span class="sales">5999.00</span>
                        <span class="original">6299.00</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12">
                <el-card shadow="hover" class="goods-card">
                    <el-image fit="cover" :src="img1" class="image" />
                    <div class="title">标题要长长长长长长长长长长长长</div>
                    <div class="sub-title">副标题也要长长长长长长长长长长</div>
                    <div class="price">
                        <span class="sales">9999.00</span>
                        <span class="original">10999.00</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img1: 'https://z3.ax1x.com/2021/02/01/yeIK58.jpg',
            img2: 'https://z3.ax1x.com/2021/02/01/yeInVP.jpg',
            img3: 'https://z3.ax1x.com/2021/02/01/yeIebt.jpg',
            img4: 'https://z3.ax1x.com/2021/02/01/yeIuUf.png'
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-card {
    position: relative;
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
    .image {
        width: 80%;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
        margin: 8px 0;
        @include text-overflow;
    }
    .sub-title {
        font-size: 14px;
        color: #808695;
        @include text-overflow;
    }
    .price {
        margin-top: 8px;
        .sales,
        .original {
            font-size: 14px;
            color: #ff6700;
            margin: 0 5px;
            &::before {
                content: "￥";
                font-size: 14px;
            }
        }
        .sales {
            font-size: 18px;
        }
        .original {
            color: #c5c8ce;
            text-decoration: line-through;
        }
    }
    .tags {
        position: absolute;
        top: 15px;
        right: 15px;
    }
}
</style>
