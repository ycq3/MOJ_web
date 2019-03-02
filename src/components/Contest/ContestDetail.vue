<template>
  <div>
    <el-row  :gutter="15">
      <el-col :span="4">
        <ContestMenu v-bind:contest-id="cId"></ContestMenu>
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover">
          <router-view></router-view>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import ContestMenu from "./ContestMenu";
    export default {
        name: "ContestDetail",
      components: {ContestMenu},
      data(){
          return {
            cId: this.$route.params.id,
          }
        },
        methods:{},
        mounted(){}
    }
</script>

<style scoped>

</style>
