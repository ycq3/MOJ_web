<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row>
            <el-col :span="4">
              <h2 style="margin: 0px"><i class="el-icon-edit">比赛</i></h2>
            </el-col>
            <el-col :span="8" :offset="12">
              <div>
                <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
                  <span slot="prepend">Search</span>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px">
      <el-col>
        <el-card
          shadow="hover"
          class="box-card">
          <div>
            <el-table
              @row-click="goto"
              :data="contestList">
              <el-table-column
                v-for="(head,index) in contestHeadText"
                :key='index'
                :prop=head.key
                :label=head.label
              >
              </el-table-column>
            </el-table>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "ContestList",
        data(){
          return {
            searchText:'',
            contestHeadText: [
              // {key: 'solve', label: 'Solved'},
              {key: 'id', label: 'ID'},
              {key: 'title', label: 'Title'},
              {key: 'begin', label: 'Begin Time'},
              {key: 'end', label: 'End Time'},
              {key: 'type', label: 'Type'},
              {key: 'status', label : 'Status'}

            ],
            contestList:[
              {id:1,title:'test',begin:'2019-1-1',end:'2019-4-5',type:'pulic',status:'running'},
              {id:2,title:'test',begin:'2019-1-1',end:'2019-4-5',type:'pulic',status:'running'},
              {id:3,title:'test',begin:'2019-1-1',end:'2019-4-5',type:'pulic',status:'running'},
              {id:4,title:'test',begin:'2019-1-1',end:'2019-4-5',type:'pulic',status:'running'}
            ],

          }
        },
        mounted(){},
        methods:{
          goto: function (row, event, column) {
            this.$router.push('ContestDetail/id/' + row.id)
          }
        },
    }
</script>

<style scoped>

</style>
