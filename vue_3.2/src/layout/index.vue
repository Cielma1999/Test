<template>
    <div class="app-wrapper">
      <el-container>
        <el-aside :width="asideWidth" class="sidebar-container" >
            <Menu></Menu>
        </el-aside>
        <el-container class="container" :class="{hidderContainer:!$store.getters.siderType}">
          <el-header>
            <Headers></Headers>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script setup>
import Menu from './menu/index.vue'
import Headers from './headers/index.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
//import { ref } from 'vue';
import variables from '@/styles/variablesForJS.module.scss'
//const asideWidth = ref(variables.sideBarWidth);
const store = useStore();
const asideWidth = computed(()=>{
    return store.getters.siderType? variables.sideBarWidth: variables.hideSideBarWidth;
})
</script>

<style lang="scss" scoped>
.app-container {
      position: relative;
      width: 100%;
      height: 100%;
}
.container {
      width: calc(100% - $sideBarWidth);
      height: 100%;
    
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      transition: all 0.28s;
      &.hidderContainer {
        width: calc(100% - $hideSideBarWidth);
      }
}
::v-deep .el-header {
      padding: 0;
}
</style>
  