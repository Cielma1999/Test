<template>
    <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogTitle==='添加用户'">
        <el-input v-model="form.password"  type="password"/>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
        </el-form-item>
        
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits ,defineProps, ref ,watch } from 'vue';
import { addUser , editUser} from '@/api/users'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

const formRef = ref(null);
const form = ref({
  username: '',
  email: '',
  password: '',
  mobile: '',
})
const rules = ref({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change']
    },
  ],
  mobile: [
    {
      required: true,
      message: 'Please pick a date',
      trigger: 'blur'
    },
   ]
})

const props = defineProps({
    dialogTitle:{
        type:String,
        default:'',
        required:true
    },
    dialogTableValue:{
        type:Object,
        default:()=>{}
    }
})

watch(
    ()=>props.dialogTableValue,
    ()=>{
        console.log(props.dialogTableValue);
        form.value = props.dialogTableValue;
    },
    {deep:true,immediate:true}
);



const emits = defineEmits(['update:modelValue','initUserList'])

function handleClose(){
 emits('update:modelValue',false);
}

function handleConfirm(){
    formRef.value.validate(async (valid) => {
        if (valid) {
            props.dialogTitle==='添加用户'? await addUser(form.value):await editUser(form.value);
            ElMessage({
                message: i18n.global.t('message.updeteSuccess'),
                type: 'success',
            })
            emits('initUserList');
            handleClose();
        } else {
            console.log('error submit!');
            return false;
        }
    })
    
}
</script>
<style scoped>

</style>