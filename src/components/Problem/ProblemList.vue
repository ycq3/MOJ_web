<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-card
        shadow="hover"
        class="box-card">
        <div>
          <el-table
            @row-click="goto"
            :data="problem_list">
            <el-table-column
              v-for="(head,index) in problemHeadText"
              :key='index'
              :prop=head.key
              v-if="head.key=slove"
              :label=head.label>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </el-col>
    <el-col :span="8">
      <el-card
      shadow="hover"
      class="box-card">
        <div slot="header">Search</div>
        <div>
          <el-input
            placeholder="Search for ..."
            prefix-icon="el-icon-search"></el-input>
        </div>
      </el-card>
      <el-card
        style="margin-top: 10px"
        shadow="hover"
        class="box-card">
        <div>
          <span>ProblemType</span>
          <div style="margin-top: 15px;">
            <el-progress
              :text-inside="true"
              :stroke-width="3"
              :percentage="progress"></el-progress>
          </div>
          <el-checkbox-group
            @change="tag_autocomplete"
            v-model="checkboxData">
            <el-checkbox
              v-for="item in problemTypeName"
              :key="item.id"
              :label="item['id']"
              style="margin-top: 10px"
              border>{{item['tag_name']}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProblemList',
  data () {
    return {
      title: 'Problem List',
      searchText: '',
      checkboxData: [],
      problemTypeName: [],
      problemHeadText: [
        {key: 'solved', label: 'Solved'},
        {key: 'id', label: 'ID'},
        {key: 'title', label: 'Title'},
        {key: 'subject', label: 'Subject'}
      ],
      problem_list: [],
      currentPage: -1,
      timer: null,
      progress: 100,
      pageTotal: 0
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    // 加载数据
    load () {
      this.load_problem()
      // 获取分类标签
      this.axios.post('/problem/tags').then(response => {
        this.problemTypeName = response.data
      })
    },
    load_problem () {
      while (this.problem_list.pop()) {
      }
      // 获取问题列表
      this.axios.post('/problem', {
        'page': this.currentPage, // 当前页号
        'tag': this.checkboxData, // 选中的标签
        'keyword': this.searchText// 查询关键字
      }
      ).then(response => {
        let list = response.data['data']
        this.pageTotal = response.data.last_page
        let ProblemList = []
        list.forEach(item => {
          item['subject'] = item['accepted'] + '/' + item['submited'] + ' | '
          item['subject'] += (item['submited'] ? item['accepted'] / item['submited'] * 100 : 0).toFixed(2) + '%'
          ProblemList.push(item)
        })
        this.problem_list = ProblemList
      })
    },
    search () {
      // 清除标签选中
      while (this.checkboxData.pop()) {
      }
      this.load_problem()// 根据输入加载问题列表
    },
    tag_select () {
      this.load_problem()
    },
    tag_autocomplete () {
      this.progress = 100
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.progress > 0) {
          this.progress -= 20
        } else {
          this.tag_select()
          this.progress = 100
          clearInterval(this.timer)
        }
      }, 200)
    },
    goto () {
      this.$router.push('home')
    }
  }
}
</script>

<style scoped>

</style>
