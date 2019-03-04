<template>
    <div>
      <el-card shadow="hover">
        <el-menu
          default-active="this.global.currentURL"
          mode="horizontal"
          :router=true>
          <el-menu-item v-bind:index="'/ContestDetail/id/' + id +'/ContestInformation'">
            <i class="el-icon-info"></i>
            <span slot="title">{{pageText.ContestInformation}}</span>
          </el-menu-item>
          <el-menu-item v-bind:index="'/ContestDetail/id/' + id +'/ContestProblem'">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">{{pageText.ContestProblem}}</span>
          </el-menu-item>
          <el-menu-item v-bind:index="'/ContestDetail/id/' + id +'/ContestProblemStatus'">
            <i class="el-icon-document"></i>
            <span slot="title">{{pageText.ContestStatus}}</span>
          </el-menu-item>
          <el-menu-item v-bind:index="'/ContestDetail/id/' + id +'/ContestProblemRank'">
            <i class="el-icon-menu"></i>
            <span slot="title">{{pageText.ContestRank}}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "ContestMenu",
        props:{
          contestId: String,
        },
        data(){
          return {
            id: this.contestId,
            pageText:{
              ContestInformation: '比赛信息',
              ContestProblem: '比赛题目',
              ContestStatus: '提交情况',
              ContestRank: '排名信息'
            }
          }
        },
        mounted(){
          // console.log(this.id + "menu");
        }
    }
</script>

<style scoped>

</style>
