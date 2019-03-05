<template>
    <div>
      <el-card shadow="hover">
        <div slot="header">
          <span>{{pageText.title}}</span>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "ContestProblemRank",
        data() {
          return {
            pageText: {
              title: '排名信息',
            }
          }
        }
    }
</script>

<style scoped>

</style>
