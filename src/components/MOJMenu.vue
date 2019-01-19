<template>
  <div>
    <el-menu
      default-active="this.global.currentURL"
      mode="horizontal"
      :router=true>
      <el-menu-item index="/">Home</el-menu-item>
      <el-submenu index="problem">
        <template slot="title">Problem</template>
        <el-menu-item index="/problem">全部问题</el-menu-item>
        <el-menu-item index="2-2">分类</el-menu-item>
        <el-menu-item index="2-3">未完成</el-menu-item>
        <el-menu-item index="2-3">已完成</el-menu-item>
      </el-submenu>
      <el-submenu index="2-4">
        <template slot="title">Contest</template>
        <el-menu-item index="2-4-1">All</el-menu-item>
        <el-menu-item index="2-4-1">Running</el-menu-item>
        <el-menu-item index="2-4-2">Class</el-menu-item>
        <el-menu-item index="2-4-3">Private</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>考试</el-menu-item>
      <el-menu-item index="/login" style="float: right;">Login</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: 'Menu'
}
</script>
<style scoped>

</style>
