<template>
  <div class="Titlepage">
    <h1>Titlepage</h1>
    <b-button>Button</b-button>
    <b-button variant="danger">Button</b-button>
    <b-button variant="success">Button</b-button>
    <b-button variant="outline-primary">Button</b-button>
    {{test}}
  </div>
</template>

<script>
export default {
  name: 'Titlepage',
  props: {
      
  },
  data() {
    return {
      test : '최민주'
    }
  },
  created :{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


