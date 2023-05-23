<template>
    <div>
        <page-header title="自定义字体">
            <template #content>
                <p>自定义字体需要下载字体文件，不建议在非英文环境中使用</p>
                <p style="margin-bottom: 0;">以下为框架预设字体</p>
            </template>
        </page-header>
        <page-main title="Digital 7">
            <p class="digital-7">Fantastic-admin</p>
            <p class="digital-7">1234567890,.</p>
        </page-main>
        <page-main title="Digital 7（等宽）">
            <p class="digital-7_mono">Fantastic-admin</p>
            <p class="digital-7_mono">1234567890,.</p>
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/fonts/digital-7/stylesheet.css";
@import "../../assets/fonts/digital-7_mono/stylesheet.css";
.digital-7,
.digital-7_mono {
    font-size: 48px;
    margin: 10px 0;
}
.digital-7 {
    font-family: "digital-7regular";
}
.digital-7_mono {
    font-family: "digital-7_monomono";
}
</style>
