<template>
  <div id="inputDiv">

    <input id="LoginInput" type="text" autocomplete="off" placeholder="닉네임을 입력하세요!">
    <input id="LoginButton" type="button" value="접속하기">

  </div>
</template>

<script>

export default {
  name: 'LoginComponent1',

};
</script>

<style>
#inputDiv{
  width: auto;
  height: auto;
  margin-top: 20px;
}
#LoginInput {
  margin-right: 10px;
}
</style>