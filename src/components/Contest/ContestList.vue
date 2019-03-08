<template>
  <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-row>
            <el-col :span="4">
              <h2 style="margin: 0px"><i class="el-icon-edit">{{pageText.title}}</i></h2>
            </el-col>
            <el-col :span="8" :offset="12">
              <div>
                <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" clearable>
                  <span slot="prepend">{{pageText.search}}</span>
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
              @cell-click="goto"
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
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-pagination
            align="center"
            :disabled="paginationData.disabled"
            @current-change="currentPageChange"
            :background=true
            :current-page.sync="paginationData.currentPage"
            :page-size="paginationData.pageSize"
            layout="prev, pager, next, jumper"
            :total="paginationData.total">
          </el-pagination>
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
            pageText: {
              title: '比赛',
              search: 'search'
            },
            searchText:'',
            paginationData:{//分页组件数据
              total: 2500,//题目总数
              pageSize: 50,//每页显示题数
              currentPage: 1,//当前页
              disabled: false, //是否禁用，加载列表时修改
            },
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
          },
          currentPageChange: function (page) { //页面切换 当前页
            console.log(page);
          },
          search: function () {
            console.log(this.searchText);
          }
        },
    }
</script>

<style scoped>

</style>
