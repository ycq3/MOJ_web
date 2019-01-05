<template>
    <div v-html="content" align="center">

    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      content: 'Loading....'
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
      this.axios.get('/home').then(response => {
        this.content = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
