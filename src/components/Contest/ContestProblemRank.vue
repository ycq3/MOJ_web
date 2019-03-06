<template>
    <div>
      <el-card shadow="hover">
        <div slot="header">
          <span>{{pageText.title}}</span>
        </div>
        <div>
          <el-table
            border
            :data="tableData"
            :cell-class-name="columnCellClass">
            <el-table-column
              v-for="(head,index) in columns"
              :key='index'
              :prop=head.key
              :label=head.label
              align="center"
              :resizable="false"
            >
            </el-table-column>
          </el-table>
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
            },
            columns: [
              {key: 'rank', label: 'rank'},
              {key: 'nickname', label: 'nickname'},
              {key: 'solved', label: 'solved'},
              {key: 'penalty', label: 'penalty'},
              {key: '1', label: 'problemA'},
              {key: '2', label: 'problemB'},
              {key: '3', label: 'problemC'},
            ],//表头
            tableData: [//数据
              {rank:'1',nickname:'aa',solved:'3',penalty:'200',1:'201:43:19 (-1)',2:'270:18:50',3:'201:43:19 (-1)'},
              {rank:'2',nickname:'bb',solved:'2',penalty:'200',2:'260:18:50',3:'202:43:19 (-1)'},
            ],
            submitData: [
              {1:'2',2:'1',3:'2'},
              {1:'0',2:'2',3:'1'}
            ],//提交情况 2首A  1Ac 0无提交 -1错误  按照rank排名向下排   key为第几道题目
            cId: this.$route.params.id,
          }
        },
        methods: {
          columnCellClass({row, column, rowIndex, columnIndex}) {// 设置单元格样式函数
            if (columnIndex>=4) {
              if (this.submitData[rowIndex][columnIndex-3] == 2) { //首A
                //console.log(this.submitData[rowIndex][columnIndex-3]);
                return 'column-cell-class-name-firstAccept';
              }
              if (this.submitData[rowIndex][columnIndex-3] == 1) { //AC
                return 'column-cell-class-name-accept';
              }
              if (this.submitData[rowIndex][columnIndex-3] == -1) { //error
                return 'column-cell-class-name-error';
              }
            }
          }
        },
        mounted() {
          // console.log(this.cId);
        }
    }
</script>

<style>
  .column-cell-class-name-firstAccept {
    background-color: #00ff99;
    color: white;
  }

  .column-cell-class-name-accept {
    background-color: green;
    color: white;
  }

  .column-cell-class-name-error {
    background-color: red;
    color: white;
  }
</style>
