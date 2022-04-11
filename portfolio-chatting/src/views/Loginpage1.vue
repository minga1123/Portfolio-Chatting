<template>

  <div class="Loginpage" >
      <div id="imgArea1">
        <img id="loginIMG1" src="../assets/pin.png">
      </div>
      <!-- ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄹㅇㅁㄴㅇㄹㅁㄴㅇㄹ -->

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
#imgArea1 {
  width: auto;
  height: auto;
  margin-top: 10px;
}
#loginIMG1 {
  width: 300px;
  height: 400px;
}
</style>