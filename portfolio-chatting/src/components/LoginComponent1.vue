<template>
  <div id="inputDiv">

    <div id="LoginComponent_Top1">
      <input id="LoginComponent_Input" type="text" autocomplete="off" placeholder="닉네임을 입력하세요!">
      <b-button id="LoginComponent_Button" variant="outline-primary">입장하기</b-button>
    </div>
    
    <div id="LoginComponent_Bottom1">
      <label id="LoginComponent_label"><input type="checkbox" value="자동로그인"> 자동로그인</label>
      <b-button @click="sendModal" id="LoginComponent_signup" variant="outline-primary">회원가입</b-button>
    </div>
   

  </div>
</template>

<script>

export default {
  name: 'LoginComponent1',
  data(){
    return{
      
    }
  },

  methods : {
    sendModal() {
      console.log('민주');
      //이벤트 발생 
      this.$emit('minga');
    }
  },

};
</script>

<style>
#inputDiv{
  width: auto;
  height: auto;
  margin-top: 20px;
}
#LoginComponent_Input {
  margin-left: 100px;
  margin-right: 10px;
  text-align: center;
}

#LoginComponent_Top1 {
  width: auto;
  height: auto;
}
#LoginComponent_Bottom1 {
  width: auto;
  height: auto;
  margin-top: 10px;
}
#LoginComponent_label {
  margin-left: 120px;
  margin-right: 40px;
}
</style>