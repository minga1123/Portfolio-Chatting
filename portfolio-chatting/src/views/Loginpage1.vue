<template>
  <div id="MainWindow1">
      <img id="loginIMG" src="../assets/pin.png"> 
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
</style>