<template>
    <el-dropdown>
    <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" :src="squareUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore();
const squareUrl = ref('https://img2.baidu.com/it/u=3062813899,1142128231&fm=253&fmt=auto&app=138&f=JPEG?w=479&h=500');

function logout(){
    store.dispatch('logout');
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item{
    white-space: nowrap;            
}
//为了让退出不换行
</style>
