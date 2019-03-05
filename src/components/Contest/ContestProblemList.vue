<template>
  <div>
    <el-card shadow="hover">
      <div slot="header">
        <span>{{pageText.title}}</span>
      </div>
      <div>
        <!--@row-click="goto"-->
        <el-table
          @cell-click="loadProblem"
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
            cId: this.$route.params.id,
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
        },
        methods: {
          loadProblem(row, column, cell, event) {
            this.$router.push('/ContestDetail/id/' + this.cId + '/ContestProblemDetail/pId/' + row.id);
          }
        },
        mounted() {
          // console.log(this.cId);
        }
    }
</script>

<style scoped>

</style>
