<template>
  <div id="MainWindow1">
      <div id="imgDiv">
        <img id="loginIMG" src="../assets/pin.png"> 
      </div>
      <LoginComponent1></LoginComponent1>
  </div>
</template>

<script>

import LoginComponent1 from '../components/LoginComponent1.vue'
export default {

  components: {
    LoginComponent1 : LoginComponent1,
  },
};
</script>

<style>
#MainWindow1 {
  width: 2560px;
  height: 1440px;
}
#imgDiv{
  width: 100%;
  height: 100%;
}
</style>