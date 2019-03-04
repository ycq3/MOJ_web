<template>
  <div>
    <el-card shadow="hover">
      <div slot="header">
        <span>{{pageText.title}}</span>
      </div>
      <div>
        <!--@row-click="goto"-->
        <el-table

          :data="ContestProblemList">
          <el-table-column
            v-for="(head,index) in problemListHeadText"
            :key='index'
            :prop=head.key
            :label=head.label
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "ContestProblemList",
        data(){
          return {
            pageText: {
              title: '问题列表',
            },
            problemListHeadText: [
              {key: 'solved', label: 'Solved'},
              {key: 'id', label: 'ID'},
              {key: 'title', label: 'Title'},
              {key: 'ratio', label: 'submit / solved'},

            ],
            ContestProblemList:[
              {solved: 'true', id: 1, title: 'testProblem1', ratio: '0/0'}
            ]
          }
        }
    }
</script>

<style scoped>

</style>
