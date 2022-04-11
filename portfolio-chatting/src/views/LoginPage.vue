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
}
#loginIMG{
  width: 300px;
  height: 400px;
  margin: 10px;
}
</style>