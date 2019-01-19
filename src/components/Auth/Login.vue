<template>
  <el-form ref="form" :model="form" label-width="80px" style="width: 300px">
    <el-form-item label="邮箱">
      <el-input type="email" v-model="form.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.passWord"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Login",
    data () {
      return {
        form: {
          userName: '',
          passWord: '',
        }
      }
    }
  }
</script>

<style scoped>

</style>
