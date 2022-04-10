<template>
    <div class="Loginpage">
        <div id="imgArea">
            <img id="loginIMG" src="../assets/pin.png" alt="">
        </div>
        <LoginComponent></LoginComponent>
    </div>
</template>

<script>

import LoginComponent from '../components/LoginComponent.vue';

export default {
  components: { 
      LoginComponent : LoginComponent
      },

}
</script>

<style>
#imgArea{
  width: auto;
  height: auto;
  margin-top: 10px;
}
#loginIMG{
  width: 500px;
  height: 700px;
}
</style>