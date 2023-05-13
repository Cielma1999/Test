<template>
    <el-dropdown @command="handleCommand">
        <svg-icon icon="language"></svg-icon>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item command="zh" :disabled="currentLanguage==='zh'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="currentLanguage==='en'">English</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup>
import { computed } from 'vue';
import {useI18n} from 'vue-i18n';
import { useStore } from 'vuex';
const store = useStore();
const i18n = useI18n();
const currentLanguage = computed(()=>{
    return i18n.locale.value;
})
function handleCommand(value){
    i18n.locale.value = value;
    store.commit('changeLang',value);
    localStorage.setItem('lang',value);
}
</script>

<style lang="scss" scoped>

</style>