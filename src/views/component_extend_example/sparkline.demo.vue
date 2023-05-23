<template>
    <div>
        <page-header title="迷你图" content="Sparkline" />
        <page-main>
            <Sparkline :value="value1" />
            <Sparkline :value="value1" stroke-color="#409eff" fill-color="#b3d8ff" />
            <Sparkline :value="value2" tooltip />
            <Sparkline :value="value2" tooltip stroke-color="#409eff" fill-color="#b3d8ff" cursor-color="#e6a23c" spot-color="#909399" />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: [1, 5, 2, 4, 8, 3, 7],
            value2: [
                { tooltip: '值：1', value: 1 },
                { tooltip: '值：3', value: 3 },
                { tooltip: '值：5', value: 5 },
                { tooltip: '值：8', value: 8 },
                { tooltip: '值：4', value: 4 },
                { tooltip: '值：6', value: 6 },
                { tooltip: '值：9', value: 9 }
            ]
        }
    }
}
</script>
