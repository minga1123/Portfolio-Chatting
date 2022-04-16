<template>
    <div class="SingupComponent">
        <div class="SingupComponent_Modal">
            <div>
                <label id="SingupComponent_IDlabel" for="SingupComponent_ID">
                    <img src="../assets/user.png" alt="" width="20px" height="20px">
                    <input id="SingupComponent_ID" type="text" placeholder="아이디" >
                </label>
            </div>
            <div>
                <label id="SingupComponent_PWlabel" for="SingupComponent_PW">
                    <img src="../assets/lock.png" alt="" width="20px" height="20px">
                    <input id="SingupComponent_PW" type="text" placeholder="비밀번호" >
                </label>
            </div>
            <div>
                <label id="SingupComponent_PW_Checklable" for="SingupComponent_PW_Check">
                    <img src="../assets/lock.png" alt="" width="20px" height="20px">
                    <input id="SingupComponent_PW_Check" type="text" placeholder="비밀번호 확인">
                </label> 
            </div>
            <div>
                <b-button id="SingupComponent_Join" variant="outline-primary">가입하기</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   name : 'SingupComponent'
  

}
</script>

<style>
label{
    display: block;
}
.SingupComponent{
    position: absolute;
    text-align: center;
    left: 30%;
    top: 10%;
    width: 500px;
    height: 700px;
    background-color: white;
    opacity: 1;
}
.SingupComponent input{
    text-align: center;
    margin-top: 20px;
}
.SingupComponent_Modal{

}
</style>