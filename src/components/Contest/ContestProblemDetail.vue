<template>
  <el-row :gutter="20">
    <el-col :span="editorShow?8:24">
      <el-card>
        <div slot="header" align="center">
          <h1 style="margin-top: 0px;">{{problemData.title}}</h1>
          <small>Time Limit: {{problemData.time}}/{{problemData.other_time}} MS (C/Others) &emsp;</small>
          <small> Memory Limit: {{problemData.memory}}/{{problemData.other_memory}} K (C/Others)</small>
        </div>
        <div>
          <div id="pDescription" class="col">
            <div class="card-title">
              <h3>Problem Description:</h3>
            </div>
            <div v-html="problemData.describe" class="card-text bg-style">

            </div>
          </div>
          <div id="input" class="col">
            <div class="card-title">
              <h3>Input:</h3>
            </div>
            <div v-html="problemData.input" class="card-text bg-style">
            </div>
          </div>
          <div id="output" class="col">
            <div class="card-title">
              <h3>Output:</h3>
            </div>
            <div v-html="problemData.output" class="card-text bg-style">
            </div>
          </div>
          <div id="sInput" class="col">
            <div class="card-title">
              <h3>Sample Input:</h3>
            </div>
            <div class="card-text bg-style">
              <pre v-html="problemData.sampleinput"></pre>
            </div>
          </div>
          <div id="sOutput" class="col">
            <div class="card-title">
              <h3>Sample Output:</h3>
            </div>
            <div class="card-text bg-style">
              <pre v-html="problemData.sampleoutput"></pre>
            </div>
          </div>
          <div id="hint" class="col" v-show="problemData.hint!=null">
            <div class="card-title">
              <h3>Hint:</h3>
            </div>
            <div class="card-text bg-style">
              <pre v-html="problemData.hint"></pre>
            </div>
          </div>
          <div id="source" class="col" v-show="problemData.source!=null">
            <div class="card-title">
              <h3>Source:</h3>
            </div>
            <div class="card-text bg-style">
              <pre v-html="problemData.source"></pre>
            </div>
          </div>
        </div>
        <div class="card-footer" style="margin: 10px" align="center">
          <el-button type="primary" @click="show">{{pageText.btnText.editorBtn}}</el-button>
          <el-button type="success" @click="showHistory">{{pageText.btnText.historyBtn}}</el-button>
        </div>

      </el-card>
    </el-col>
    <el-col :span="editorShow?16:0">
      <!--编辑器-->
      <el-card>
        <div slot="header">
          <el-select v-model="selectData.selected" filterable placeholder="select language">
            <el-option
              v-for="(item,index) in selectData.language"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-button @click="show" style="float:right;" class="el-icon-close" circle type="info"></el-button>
        </div>
        <div style="font-size: large;border-radius:4px">
          <codemirror
            id="editor"
            class="text-left col-sm-12"
            v-model="editorCode"
            :options="cmOptions">
          </codemirror>
        </div>
        <div style="padding: 10px" align="center">
          <div class="col text-center">
            <el-button
              type="primary"
              v-on:click="submit">{{pageText.btnText.submitBtn}}</el-button>
            <el-button
              type="danger"
              v-on:click="clear">{{pageText.btnText.clearBtn}}</el-button>
          </div>
        </div>
      </el-card>
      <!--编辑器end-->
    </el-col>


    <!-- 提交记录 -->
    <el-dialog :visible.sync="historyShow"
      v-bind:title="pageText.subHistoryTitle">
      <div>
        <el-table
          :data="statusList">
          <el-table-column
            v-for="(head,index) in pageText.subTableText"
            :key='index'
            :prop=head.key
            :label=head.label
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button @click="historyShow = false" type="info">关 闭</el-button>
      </span>
    </el-dialog><!-- /.modal -->
  </el-row>
</template>

<script>
    import {codemirror} from 'vue-codemirror'//必需
    import 'codemirror/lib/codemirror.css'//必需
    import 'codemirror/theme/material.css'//主题样式
    import 'codemirror/mode/clike/clike.js'//导入类c,关键字高亮
    import 'codemirror/mode/ruby/ruby.js' //导入ruby
    import 'codemirror/mode/python/python.js'

    export default {
        name: "ContestProblemDetail",
        components: {
          codemirror
        },
        data() {
          return {
            cmOptions: {//codemirror配置项
              mode: 'text/x-c++src',//C++模式 关键字见： https://codemirror.net/mode/index.html
              theme: 'material',//主题
              lineNumbers: true,//行号
              indentUnit: 4,//缩进4个空格
              showCursorWhenSelecting: true,//选择时是否显示光标
              autofocus: true,//获得焦点
            },
            problemData: {//题目信息
              title: '计算两点间的距离',
              describe: '输入两点坐标（X1,Y1）,（X2,Y2）,计算并输出两点间的距离。',
              input: '输入数据有多组，每组占一行，由4个实数组成，分别表示x1,y1,x2,y2,数据之间用空格隔开。',
              output: '对于每组输入数据，输出一行，结果保留两位小数。',
              sampleinput: '0 0 0 1\n' +
              '0 1 1 0',
              sampleoutput: '1.00\n' +
              '1.41',
              hint: '',
              source: '',
              time: '1000',
              memory: '32768',
              other_time: '2000',
              other_memory: '65536',
            },
            selectData: {//语言选择
              language: {},
              selected: '',
            },
            editorShow: false,
            historyShow: false,
            pageText:{
              subHistoryTitle: '历史提交',
              subTableText: [
                {key: 'status', label: 'Status'},
                {key: 'language', label: 'Language'},
                {key: 'submitTime', label: 'Submit Time'},
                {key: 'time', label: 'Time'},
                {key: 'mem', label: 'Mem.'},
              ],
              btnText: {
                submitBtn: '提交',
                clearBtn: '清空',
                editorBtn: '编辑',
                historyBtn: '历史',
                subCloseBtn: '关闭'
              },
            },
            editorCode: '',
            statusList: [
              {status: 'accept', language: 'C++', submitTime: '2019-03-08 20:21:33', time: '20ms', mem: '600b'},
              {status: 'error', language: 'C++', submitTime: '2019-03-08 20:21:33', time: '20ms', mem: '600b'},
            ],
            resultSelect: [
              'Waiting',
              'Rejudge',
              'Compile',
              'judging',
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
            languageSelect: [
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
            ],
            cId: this.$route.params.id,
            pId: this.$route.params.pId,
          }
        },
        methods:{
          show () {//编辑器显示关闭
            this.editorShow = !this.editorShow;
            if (this.editorShow == true) {
              // $("#pro").addClass("float-left").addClass("col-sm-4");
              this.pageText.btnText.editorBtn = '关闭';
            } else {
              // $("#pro").removeClass("float-left").removeClass("col-sm-4");
              this.pageText.btnText.editorBtn = '编辑';
            }
          },
          clear () {//编辑器内容清除
            this.editorCode = '';
          },
          submit () {//提交代码
            console.log("submit");
            // if (this.global.isLogin == false) {//提交前登陆检查
            //   $("#login").modal("show");
            // } else if (this.editorCode != '') {
            //   axios.post('/problem/submit/' + this.pId, {
            //     'language': this.selectData.selected,
            //     'code': this.editorCode
            //   }).then(response => {
            //     this.$toastr.s("代码提交成功！提交编号" + response.data);
            //     $("#historyBtn").click();
            //   });
            // }
          },
          showHistory () {//查看历史记录前检查登陆
            console.log("history");
            this.historyShow = !this.historyShow;
            // if (!this.global.isLogin) {
            //   console.log('login');
            // } else {
            //
            //   axios.post('/problem/status/' + this.pId).then(response => {
            //     let list = response.data.data;
            //     this.status_list = list;
            //   });
            // }
          },
        },
        mounted() {
          console.log(this.cId);
          console.log(this.pId);
        }
    }
</script>

<style>
  .CodeMirror {
    height: 550px;
  }
</style>
