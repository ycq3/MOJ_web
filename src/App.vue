<template>
  <div id="app">
    <el-header>
      <MOJMenu></MOJMenu>
    </el-header>
    <el-main>
      <transition name="el-zoom-in-center">
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <a href="https://gitee.com/yanchenqiang/MnnuacmOnlineJudgeSystem">power by MOJ project</a>
    </el-footer>
  </div>
</template>

<script>

import MOJMenu from './components/MOJMenu'
import ElHeader from 'element-ui/packages/header/src/main'
import ElFooter from 'element-ui/packages/footer/src/main'

export default {
  name: 'App',
  components: {ElFooter, ElHeader, MOJMenu}
}
</script>

<style>

</style>
