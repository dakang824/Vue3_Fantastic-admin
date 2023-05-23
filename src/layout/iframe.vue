<template>
    <iframe :src="$route.meta.link" frameborder="0" />
</template>

<script>
export default {
    name: 'IframeLayout'
}
</script>

<style lang="scss" scoped>
iframe {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
}
</style>
