<template>
  <div class="container">
    <el-table
      :data="form.list"
      stripe
      borde
      max-width="100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="form.list[scope.$index].name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(col,index) in contents"
        :label="col.name" :key="col.prop">
        <!--<span>{{row.index}}</span>-->
        <template slot-scope="scope">
          <!--<span>{{scope.$index}}</span>-->
          <el-select v-model="form.list[scope.$index].results[index].state">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="form.list[scope.$index].description"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="addRow">添加行</el-button>
    <el-button type="primary" @click="addColoum">添加列</el-button>
  </div>

</template>

<script>
export default {
  name: 'mytable',
  data () {
    return {
      count: '2',
      contents: [
        {
          name: '英语',
          value: '01'
        },
        {
          name: '数学',
          value: '02'
        }
      ],
      form: {
        list: [
          {
            name: '',
            description: '',
            results: [
              {
                id: '01',
                state: '1'
              },
              {
                id: '02',
                state: '1'
              }
            ]
          },
          {
            name: '',
            description: '',
            results: [
              {
                id: '01',
                state: '1'
              },
              {
                id: '02',
                state: '1'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
