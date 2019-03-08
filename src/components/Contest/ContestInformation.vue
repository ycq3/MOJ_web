<template>
    <div>
      <el-card shadow="hover">
        <el-row slot="header">
          <span>{{pageText.title}}</span>
        </el-row>
        <el-row>
          <h1 align="center">{{contestInformation.title}}</h1>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="3">
            <label>{{pageText.beginTime}}:&nbsp;<span>{{contestInformation.beginTime}}</span>&emsp;</label>
          </el-col>
          <el-col :span="6" :offset="6">
            <div align="right">{{pageText.endTime}}:&nbsp;<span>{{contestInformation.endTime}}</span> </div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-progress :percentage="percentage"  :stroke-width="15" :show-text="false"></el-progress>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="6" :offset="9">
            <div align="center">{{pageText.currentTime}}:&nbsp;<span>{{contestInformation.currentTime}}</span> </div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="6" :offset="3">
            <div>{{pageText.status}}:&nbsp;
              <span>
                {{contestInformation.status}}
              </span>
            </div>
          </el-col>

          <el-col :span="6" :offset="6">
            <div align="right">{{pageText.type}}:&nbsp;<span >{{contestInformation.type}} &emsp;</span></div>
          </el-col>
        </el-row>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "ContestInformation",
        data(){
          return {
            id: this.$route.params.id,
            pageText:{
              beginTime: '开始时间',
              endTime: '结束时间',
              currentTime: '当前时间',
              type: '比赛类型',
              status: '比赛状态',
              title: '比赛信息'
            },
            percentage: 0,
            contestInformation: {
              title: '比赛标题',
              beginTime: '2019-03-08 21:00:00',
              endTime: '2019-03-08 22:00:00',
              status: 'running',
              type: 'Private',
              currentTime:'',
            },
            thisTime: 1,
            thisTimeFlag:false
          }
        },
        mounted(){
          this.thisTime = new Date('2019-03-08 21:30:00').getTime();
          this.setCurrentTime();//计时器启动
          console.log(this.id + "information");
        },
        watch:{
          thisTime:function () {//根据计时器计算当前时间
            this.contestInformation.currentTime=this.getTime();
            let bTime = new Date(this.contestInformation.beginTime).getTime();
            let eTime = new Date(this.contestInformation.endTime).getTime();console.log(eTime);
            if (this.thisTime <= bTime){
              this.percentage = 0;
            } else if (this.thisTime >= eTime){
              this.percentage = 100;
            } else {
              this.percentage = ((this.thisTime - bTime)/(eTime - bTime))*100;
            }
            if (this.contestInformation.currentTime < this.contestInformation.beginTime) {
              this.contestInformation.status = 'Pending';
            } else if (this.contestInformation.currentTime > this.contestInformation.endTime) {
              this.contestInformation.status = 'End';
            } else {
              this.contestInformation.status = 'Running';
            }
          }
        },
        created() {
          // this.thisTime=new Date();console.log(this.thisTime);
          // this.thisTimeFlag=true;//允许计时器计时
        },
        methods: {
          setCurrentTime(){//计时器走时，计算当前时间
            this.thisTime+=1000;
            setTimeout(()=>{console.log(this.contestInformation.currentTime);
              if (this.thisTimeFlag)
                this.setCurrentTime();
            },1000);
          },
          getTime(){
            let date=new Date(this.thisTime);
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            let hours=date.getHours();
            let min=date.getMinutes();
            let sec=date.getSeconds();
            if (month<10) month='0'+month;
            if (day<10) day='0'+day;
            if (hours<10) hours='0'+hours;
            if (min<10) min='0'+min;
            if (sec<10) sec='0'+sec;
            return year+'-'+month+'-'+day+' '+hours+':'+min+':'+sec;
          }
        },
        beforeRouteLeave(to, from, next) {//离开页面时检查比赛时间
          this.thisTimeFlag=false;//离开页面计时器停止，防止多个计时器创建
          next();
        }
    }
</script>

<style scoped>

</style>
