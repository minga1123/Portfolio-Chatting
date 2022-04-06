<template>
    <div id="MainWindow">
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
.MainWindow{
    width: 1440px;
    height: 2560px;
}
</style>