<template>
    <div>
        <page-header title="轮播动画" content="基于 Swiper">
            <el-button icon="el-icon-link" @click="open('https://swiperjs.com/vue')">Swiper 官网</el-button>
        </page-header>
        <el-row :gutter="20" style="margin: -10px 10px;">
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" autoplay>
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" :pagination="{ clickable: true }">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" navigation>
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: -10px 10px;">
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" :pagination="{dynamicBullets: true}">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" :pagination="{type: 'fraction'}">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    <swiper class="swiper" :scrollbar="{ draggable: true }">
                        <swiper-slide>Slide 1</swiper-slide>
                        <swiper-slide>Slide 2</swiper-slide>
                        <swiper-slide>Slide 3</swiper-slide>
                        <swiper-slide>Slide 4</swiper-slide>
                        <swiper-slide>Slide 5</swiper-slide>
                        <swiper-slide>Slide 6</swiper-slide>
                        <swiper-slide>Slide 7</swiper-slide>
                        <swiper-slide>Slide 8</swiper-slide>
                        <swiper-slide>Slide 9</swiper-slide>
                        <swiper-slide>Slide 10</swiper-slide>
                    </swiper>
                </page-main>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {}
    },
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper {
    height: 300px;
    width: 100%;
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: 700;
        font-size: 36.4px;
        background-color: #fff;
    }
}
</style>
