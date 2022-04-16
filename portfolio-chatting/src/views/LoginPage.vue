<template>
    <div class="Loginpage">
        <div id="imgArea">
            <img id="loginIMG" src="../assets/pin.png" alt="">
        </div>
        <LoginComponent @open="openmodal"></LoginComponent>
        
        <div v-if="SingupArea" id="SingupArea">
          <SingupComponent></SingupComponent>
        </div>
    </div>
</template>

<script>

import LoginComponent from '../components/LoginComponent.vue';
import SingupComponent from '../components/SingupComponent.vue';

export default {
  
  data(){
    return{
      SingupArea: false,
    }
  },
  methods :{
    openmodal(){ 
      this.SingupArea=true;

    }
  },

  components: { 
      LoginComponent : LoginComponent,
      SingupComponent : SingupComponent
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