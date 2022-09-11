<template>
    <div class="hamburger-container" @click="toggleClick">
        <svg-icon :icon="icon"></svg-icon>
    </div>
</template>
<script setup>
import {useStore }from 'vuex'
import { computed } from 'vue';
const store = useStore();
function toggleClick(){
    store.commit('changeSiderType')
}
const icon = computed(()=>{
    return store.getters.siderType ? 'hamburger-opened' :'hamburger-closed';
})
</script>
<style lang="scss" scoped>
.hamburger-container{
    margin-right: 16px;
    box-sizing: border-box;
    cursor:pointer;
}
</style>