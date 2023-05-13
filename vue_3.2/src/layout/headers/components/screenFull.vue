<template>
    <div @click="handleFullScreen" id="screenFul">
        <svg-icon :icon="icon?'exit-fullscreen':'fullscreen'"></svg-icon>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import screenfull from 'screenfull';

const icon = ref(screenfull.isFullscreen);
function handleFullScreen(){
    if(screenfull.isEnabled){
        screenfull.toggle(); //全屏模式，详细可去看screenfull官网
    }
}
function changeIcon(){
    icon.value =screenfull.isFullscreen;
}
//不加下边两个方法会监听不到icon变量变化，导致图标不会随着全屏变化
onMounted(()=>{
    screenfull.on('change',changeIcon)
})
onBeforeMount(()=>{
    screenfull.off('change')
})
</script>

<style lang="scss" scoped>

</style>