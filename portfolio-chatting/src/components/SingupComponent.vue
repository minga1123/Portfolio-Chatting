<template>
    <div id="SingupComponent">

        <label id="SingupComponent_IDlabel" for="SingupComponent_ID">
            <img src="../assets/user.png" alt="" width="20px" height="20px">
            <input id="SingupComponent_ID" type="text" placeholder="아이디" >
        </label>


        <label id="SingupComponent_PWlabel" for="SingupComponent_PW">
            <img src="../assets/lock.png" alt="" width="20px" height="20px">
            <input id="SingupComponent_PW" type="text" placeholder="비밀번호" >
        </label>
        <label id="SingupComponent_PW_Checklable">
            <input id="SingupComponent_PW_Check" type="text" placeholder="비밀번호 확인">
        </label>
        <div>
            <b-button id="SingupComponent_Join" variant="outline-primary">가입하기</b-button>
        </div>
        
    </div>
     
</template>

<script>
export default {
   name : 'SingupComponent'
}
</script>

<style>

</style>