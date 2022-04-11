<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Titlepage</router-link> |
      <router-link to="/Mainpage">Mainpage</router-link> |
      <router-link to="/Chatpage">Chatpage</router-link> |
      <router-link to="/Hello">Hello</router-link> |
    </div> -->
    <router-link to="/Loginpage">Login</router-link> |
    <router-link to="/Loginpage1">Login1</router-link>
    <router-view class="maincontainer"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin : 0 auto;
  width: auto;
  height: 100vh;
  border : 1px solid gray;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
