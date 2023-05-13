<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsers">{{$t('table.search')}}</el-button>
      <el-button type="primary" @click ="handleDialogValue()">{{$t('table.adduser')}}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column 
        :width="item.width"
        :prop="item.prop" 
        :label="$t(`table.${item.label}`)" 
        v-for='(item,index) in options' 
        :key="index">
        <template v-slot="{row}" v-if="item.prop ==='mg_state'" >
          <el-switch v-model="row.mg_state" @change='changeState(row)'/>
        </template>
        <template v-slot="{row}" v-else-if="item.prop ==='create_time'" >
          {{$filters.filterTimes(row.create_time)}}
        </template>
        <template v-slot="{row}" v-else-if="item.prop ==='action'">

          <el-button type="primary" size="small" :icon="Edit" @click="handleDialogValue(row)"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog v-model="dialogVisible" :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValue" v-if="dialogVisible" @initUserList="initGetUsers"></Dialog>
</template>

<script setup>
import {Search ,Edit, Setting, Delete} from '@element-plus/icons-vue'
import { ref } from 'vue';
import { getUser,changeUserState ,deleteUser} from '@/api/users'
import { options } from './options'
import { useI18n } from 'vue-i18n';
import Dialog from './components/dialog.vue'
import {isNull }from '@/utils/filters'
import { ElMessage, ElMessageBox } from 'element-plus'

const i18n = useI18n();
const total = ref(0);
const queryForm = ref({
  query:'',
  pagenum:1,
  pagesize:2
});
const dialogVisible = ref(false);
const dialogTitle = ref('');
const dialogTableValue = ref({});
const tableData = ref([]);

function handleCurrentChange(pageNum){
  queryForm.value.pagenum = pageNum;
  initGetUsers();
}

function handleSizeChange(pageSize){
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetUsers();
}
async function initGetUsers(){
  const res = await getUser(queryForm.value);
  tableData.value = res.users;
  total.value =res.total;
}

initGetUsers();

async function changeState(info){
  
  await changeUserState(info.id,info.mg_state);
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success',
  })
}

function handleDialogValue(row){
  if(isNull(row)){
    dialogTitle.value = '添加用户';
    dialogTableValue.value ={} ;
  
  }else{
    dialogTitle.value = '编辑用户';
    dialogTableValue.value =JSON.parse(JSON.stringify(row)) ;
    
  }
  dialogVisible.value = true;
}

function delUser(row){
  ElMessageBox.confirm(
    i18n.t('dialog.deleteTitle'),
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async() => {
      await deleteUser(row.id);
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
      initGetUsers();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<style lang="scss" scoped>
  .header{
    padding-bottom: 16px;
    box-sizing: border-box;
  }

  ::v-deep .el-pagination{
    padding-top: 16px;
    box-sizing: border-box;
    text-align: right;
  }
</style>
