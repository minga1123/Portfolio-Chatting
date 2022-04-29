<template>

  <div @closemodals1="closemodal" class="Loginpage"  >
      <div   id="imgArea1">
        <img id="loginIMG1" src="../assets/pin.png">
      </div>
      <!-- ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄹㅇㅁㄴㅇㄹㅁㄴㅇㄹ -->

      <LoginComponent1   @minga="SingupComponentModalOpen"></LoginComponent1>

      <div  v-if="SingupArea" id="SingupArea">
        <SingupComponent1 @closemodals="closemodal"></SingupComponent1>
      </div>

      <!-- <input type="button" @click="SingupComponentOpen"> -->
      <!-- 팝업 컴포넌트를 넣고 v-if로 해야하나 -->

      
  </div>
  
</template>

<script>
import LoginComponent1 from '../components/LoginComponent1.vue'
import SingupComponent1 from '../components/SingupComponent1.vue'
export default {

  props : {
    
  },

  data(){
    return{
      SingupArea: false,
    }
  },
 // 이벤트를 기다리고 있다가 이벤트가 생기면 돌릴 메서드를 추가
  methods : {
    SingupComponentModalOpen() {
      console.log('test');
      this.SingupArea = true;
      
    },
    closemodal() {
      console.log("제일 상단");
      this.SingupArea = false;
    }
  },

  components: {
    LoginComponent1 : LoginComponent1,
    SingupComponent1 : SingupComponent1,
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
#SingupArea {
  position: absolute;
  left: 0%;
  top: 0%;
  margin : 10px;
  width: 98.5%;
  height: 98vh;
  background-color: rgb(111, 111, 111);

}
</style>