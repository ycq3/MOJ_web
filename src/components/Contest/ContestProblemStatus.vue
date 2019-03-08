<template>
    <div>
      <el-row>
        <el-col>
          <el-card shadow="hover">
            <div slot="header">
              <span>{{pageText.title}}</span>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item v-bind:label="pageText.problemId">
                  <el-input v-model="formData.pId" clearable></el-input>
                </el-form-item>
                <el-form-item v-bind:label="pageText.userId">
                  <el-input v-model="formData.uId" clearable></el-input>
                </el-form-item>
                <el-form-item v-bind:label="pageText.result">
                  <el-select v-model="formData.resultSelect" clearable>
                    <el-option
                      v-for="(item,index) in pageText.resultSelect"
                      :key="item"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-bind:label="pageText.language">
                  <el-select v-model="formData.languageSelect" clearable>
                    <el-option
                      v-for="(item,index) in pageText.languageSelect"
                      :key="item"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" v-on:click="submit">{{pageText.submit}}</el-button>
                </el-form-item>
              </el-form>
              <div>
                <el-table
                  :data="contestStatusList">
                  <el-table-column
                    v-for="(head,index) in pageText.statusHeadText"
                    :key='index'
                    :prop=head.key
                    :label=head.label
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
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
        name: "ContestProblemStatus",
        data() {
          return {
            pageText: {
              title: '提交情况',
              problemId: 'Problem ID:',
              userId: 'User ID:',
              result: 'Result:',
              language: 'Language:',
              submit:'查询',
              statusHeadText:[
                {key: "id", label: 'ID'},
                {key: "user", label: 'User'},
                {key: "pId", label: 'Pro.ID'},
                {key: "status", label: 'Status'},
                {key: "language", label: 'Language'},
                {key: "codeLen", label: 'Code Len.'},
                {key: "time", label: 'Time'},
                {key: "mem", label: 'Mem.'},
                {key: "submitTime", label: 'Submit Time'},
              ],
              resultSelect:[
                'Waiting',
                'Rejudge',
                'Compile',
                'Judging',
                'Accepted',
                'Presentation Error',
                'Wrong Answer',
                'Time Limit Exceeded',
                'Memory Limit Exceeded',
                'Output Limit Exceeded',
                'Runtime Error',
                'Compile Error',
                'Compiled',
                'Running'
              ],
              languageSelect:[
                'C',
                'C++',
                'Pascal',
                'java',
                'Ruby',
                'Bash',
                'Python',
                'PHP',
                'Perl',
                'C#',
                'Object-C',
                'FreeBasic',
                'Schema',
                'Clang',
                'Clang++',
                'Lua',
                'JavaScript',
                'Go',
                'Other'
              ]
            },
            paginationData:{//分页组件数据
              total: 2500,//题目总数
              pageSize: 50,//每页显示题数
              currentPage: 1,//当前页
              disabled: false, //是否禁用，加载列表时修改
            },
            contestStatusList:[
              {id:1001, user:'ink', pId:'1001', status:'accept', language:'c++', codeLen:'32k', time:'12ms', mem:'12b', submitTime:'2019-3-3 21:42:30'}
            ],
            formData: {
              pId:'',
              uId:'',
              resultSelect:'',
              languageSelect:''
            }
          }
        },
        methods: {
          submit:function () {
            console.log(this.formData);
          },
          currentPageChange: function (page) { //页面切换 当前页
            console.log(page);
          },
        },
        mounted(){},
        created(){}
    }
</script>

<style scoped>

</style>
