<template>
    <div>
      <el-card shadow="hover">
        <div slot="header">
          <span>{{contestInformation.title}}</span>
        </div>
        <div>
          <div>
            <label>{{pageText.beginTime}}&nbsp;<span>{{contestInformation.beginTime}}</span>&emsp;</label>
            <label>{{pageText.endTime}}:&nbsp;<span>{{contestInformation.endTime}}</span> </label>
          </div>
          <div>
            <label>{{pageText.currentTime}}:&nbsp;<span>{{contestInformation.currentTime}}</span> </label>
          </div>

          <div>
            <label>{{pageText.type}}:&nbsp;<span >{{contestInformation.type}} &emsp;</span></label>
            <label>{{pageText.status}}:&nbsp;
              <span>
                {{contestInformation.status}}
              </span>
            </label>
          </div>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "ContestInformation",
        props:{
          contsetId: String
        },
        data(){
          return {
            id: this.contestId,
            pageText:{
              beginTime: '开始时间：',
              endTime: '结束时间：',
              currentTime: '当前时间：',
              type: '比赛类型：',
              status: '比赛状态：'
            },
            contestInformation: {
              title: 'problem title',
              beginTime: '2019-1-1',
              endTime: '2019-4-4',
              status: 'running',
              type: 'Private',
              currentTime:'',
            },
            thisTime: 1,
            thisTimeFlag:false
          }
        },
        mounted(){
          this.setCurrentTime();//计时器启动
          // console.log(this.id + "information");
        },
        watch:{
          thisTime:function () {//根据计时器计算当前时间
            this.contestInformation.currentTime=this.getTime();
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
            this.thisTime+=1;
            setTimeout(()=>{console.log(this.contestInformation.currentTime);
              if (this.thisTimeFlag)
                this.setCurrentTime();
            },1000);
          },
          getTime(){
            let date=new Date(this.thisTime*1000);
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
