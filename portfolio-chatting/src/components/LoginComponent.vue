<template>
  <div class="LoginComponent">
    <div id="LoginComponent_top">
      <input id="LoginComponent_input" type="text" placeholder="닉네임을 입력하세요.">
      <b-button id="LoginComponent_Button" variant="outline-primary">입장하기</b-button>
    </div>
    <div id="LoginComponent_bottom">
      <label id="LoginComponent_label">
        <input type="checkbox" value="autoloign"> 자동로그인
      </label>
      <b-button id="LoginComponent_signup" variant="outline-primary">회원가입</b-button>
    </div>
  </div>
</template>

<script>
export default {
    name : 'LoginComponent'

}
</script>

<style>
#LoginComponent{
  width: auto;
  height: auto;
}
#LoginComponent_top{
  margin: 10px;
}
#LoginComponent_bottom{

}
#LoginComponent_input{
  margin-right: 10px;
  text-align: center;
}
#LoginComponent_label{
  margin-right: 10px;
}
</style>