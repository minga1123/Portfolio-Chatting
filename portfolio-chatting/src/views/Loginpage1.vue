<template>
  <div id="mainWindow1">
    <Loginpage>
      <div id="imgArea1">
        <img id="loginIMG1" src="../assets/pin.png">
      </div>
      <LoginComponent1></LoginComponent1>
    </Loginpage>
  </div>
  
</template>

<script>
import Loginpage from '../components/MainWindow1.vue'
import LoginComponent1 from '../components/LoginComponent1.vue'
export default {

  components: {
    Loginpage : Loginpage,
    LoginComponent1 : LoginComponent1,
  },
};
</script>

<style>

</style>