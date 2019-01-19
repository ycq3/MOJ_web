<template>
  <el-row :gutter="20">
    <el-col :span="editorShow?8:24">
      <el-card>
        <div slot="header">
          <h1>{{problemData.title}}</h1>
          <small>Time Limit: {{problemData.time}}/{{problemData.other_time}} MS (C/Others) &emsp;</small>
          <small> Memory Limit: {{problemData.memory}}/{{problemData.other_memory}} K (C/Others)</small>
        </div>
        <div>
          <div id="pDescription" class="col">
            <div class="card-title">
              <span class="h3">Problem Description:</span>
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
        <div class="card-footer" style="margin: 10px">
          <el-button type="primary" @click="show">{{btnText.editorBtn}}</el-button>
          <el-button type="success" @click="showHistory">{{btnText.historyBtn}}</el-button>
        </div>

      </el-card>
    </el-col>
    <el-col :span="editorShow?16:0">
      <!--编辑器-->
      <el-card style="margin-bottom: 10px">
        <div id="edit">
          <div style="margin: 10px;">
            <el-select v-model="selectData.selected" filterable placeholder="select language">
              <el-option
                v-for="(item,index) in selectData.language"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
            <el-button @click="show" style="float:right;">
              <span class="sr-only">Close</span>
              <span aria-hidden="true">&times;</span>
            </el-button>
          </div>
          <div class="row" style="font-size: large;border-radius:4px">
            <codemirror
              id="editor"
              class="text-left col-sm-12"
              v-model="editorCode"
              :options="cmOptions">
            </codemirror>
          </div>
          <div class="row" style="padding: 5px">
            <div class="col text-center">
              <el-button
                type="primary"
                v-on:click="submit">{{btnText.submitBtn}}</el-button>
              <el-button
                type="danger"
                v-on:click="clear">{{btnText.clearBtn}}</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <!--编辑器end-->
    </el-col>


    <!-- 提交记录 -->
    <el-dialog :visible.sync="historyShow">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{subHistoryTitle}}
            </h4>
            <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×
            </button>
          </div>
          <div class="modal-body overflow">
            <table class="table text-center">
              <thead>
              <tr>
                <th v-for="value in subTableText">{{value}}</th>
              </tr>
              </thead>
              <transition-group name="list" tag="tbody">
                <tr v-for="item in status_list" v-bind:key="item['runid']" id="status_list"
                    v-bind:class="item['result']==6?'table-danger':item['result']==4?'table-success':'table-info'+' list-item'">
                  <td v-bind:class="item['result']==6?'text-danger':item['result']==4?'text-success':'text-info'">
                    {{resultSelect[item['result']]}}
                  </td>
                  <td>
                    <router-link v-bind:to="'/viewCode/'+item['runid']" tag="a" target="_blank">
                      {{languageSelect[item['language']]}}
                    </router-link>
                  </td>
                  <td>{{item['submit_time']}}</td>
                  <td>{{item['time']}}</td>
                  <td>{{item['mem']}}</td>
                </tr>
              </transition-group>
            </table>
          </div>
          <div class="modal-footer">
            <!--<router-link v-bind:to="'/problemStatus/'+this.p_id" class="mx-auto btn btn-primary" tag="a" target="_blank">{{viewAllSubmit}}</router-link>-->
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
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
  import ElCard from 'element-ui/packages/card/src/main' //导入python
  export default {
    name: "ProblemDetail",
    components: {
      ElCard,
      codemirror
    },
    data () {
      return {
        cmOptions: {//codemirror配置项
          mode: 'text/x-c++src',//C++模式 关键字见： https://codemirror.net/mode/index.html
          theme: 'material',//主题
          lineNumbers: true,//行号
          indentUnit: 4,//缩进4个空格
          showCursorWhenSelecting: true,//选择时是否显示光标
          autofocus: true,//获得焦点
        },
        selectData: {//语言选择
          language: {},
          selected: '',
        },
        editorShow: false,
        historyShow: false,
        viewAllSubmit: 'View All Submit',
        editorCode: '',
        subHistoryTitle: 'Submit History',
        subTableText: {
          status: 'Status',
          language: 'Language',
          submitTime: 'Submit Time',
          time: 'Time',
          mem: 'Mem.',
        },
        problemData: {//题目信息
          title: '',
          describe: '',
          input: '',
          output: '',
          sampleinput: '',
          sampleoutput: '',
          hint: '',
          source: '',
          time: '',
          memory: '',
          other_time: '',
          other_memory: '',
        },
        btnText: {
          submitBtn: 'Submit',
          clearBtn: 'Clear',
          editorBtn: 'Editor',
          historyBtn: 'History',
        },
        status_list: [],
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
        p_id: this.$route.params.id,
      }
    },
    methods: {
      show () {//编辑器显示关闭
        this.editorShow = !this.editorShow;
        // if (this.editorShow == true) {
        //   $("#pro").addClass("float-left").addClass("col-sm-4");
        //   this.editorBtn = 'Close';
        // } else {
        //   $("#pro").removeClass("float-left").removeClass("col-sm-4");
        //   this.editorBtn = 'Editor';
        // }
      },
      clear () {//编辑器内容清除
        this.editorCode = '';
      },
      //加载数据
      load () {
        //获取问题详情
        this.axios.post('/problem/id/' + this.p_id).then(response => {
          let data = response.data;
          this.problemData = data;
          this.selectData.language = data['language'];//语言下拉框
          this.selectData.selected = Object.keys(this.selectData.language)[0];//获得第一种语言键值
        });
      },
      submit () {//提交代码
        if (this.global.isLogin == false) {//提交前登陆检查
          $("#login").modal("show");
        } else if (this.editorCode != '') {
          axios.post('/problem/submit/' + this.p_id, {
            'language': this.selectData.selected,
            'code': this.editorCode
          }).then(response => {
            this.$toastr.s("代码提交成功！提交编号" + response.data);
            $("#historyBtn").click();
          });
        }
      },
      showHistory () {//查看历史记录前检查登陆
        this.historyShow = !this.historyShow;
        if (!this.global.isLogin) {
          console.log('login');
        } else {

          axios.post('/problem/status/' + this.p_id).then(response => {
            let list = response.data.data;
            this.status_list = list;
          });
        }
      },
      move (e) {
        let odiv = e.target;        //获取目标元素
        console.log(odiv)
        //算出鼠标相对元素的位置
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        document.onmousemove = (e) => {       //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          let top = e.clientY - disY;

          //绑定元素位置到positionX和positionY上面
          this.positionX = top;
          this.positionY = left;

          //移动当前元素
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
          console.log(left + '---' + top)
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },
    created () {
      this.load();
    },

  }
</script>

<style scoped>
  .modal-dialog {
    margin: 80px auto;
  }

  .overflow {
    overflow: auto;
  }

  #pro {
    height: 610px;
  }

  .bg-style {
    border-color: #c9e2f3;
    border-style: dashed;
    border-width: 1px;
    background-color: #F0F8FF;
  }
</style>
<style>
  .CodeMirror {
    height: 524px;
  }
</style>
