<template>
    <h1>hello world</h1>
</template>

<script>
    export default {
        name: "ContestInformation",
        props:{
          contsetId: String
        },
        data(){
          return {
            id: this.contestId
          }
        },
        mounted(){
          console.log(this.id + "information");
        }
    }
</script>

<style scoped>

</style>
