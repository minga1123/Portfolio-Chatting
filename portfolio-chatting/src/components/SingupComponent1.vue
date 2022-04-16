<template>
  <div id="SingupComponent">
      <div>
          <img id="mainIMG" src="../assets/pin.png" alt="">
      </div>
      <div>
        <label id="SingupComponent_IDlabel" for="SingupComponent_ID">
            <img src="../assets/user.png" class="SingupComponent_IMG">
            <input id="SingupComponent_ID" type="text">
        </label>
      </div>
      
     <div>
        <label id="SingupComponent_PWlabel" for="SingupComponent_PW">
            <img src="../assets/user.png" class="SingupComponent_IMG">
            <input id="SingupComponent_PW" type="text">
        </label>
     </div>
     
    <div>
        <label id="SingupComponent_PW_Check_label" for="SingupComponent_PW_Check">
            <img src="../assets/user.png" class="SingupComponent_IMG">
            <input id="SingupComponent_PW_Check" type="text">
        </label>
    </div>
      

    <div>
        <b-button id="SingupComponent_Join" variant="outline-primary">가입하기</b-button>  
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'SingupComponent1',

};
</script>

<style>

#SingupComponent {
    position: absolute;
    text-align: center;
    left: 30%;
    top: 10%;
    width: 500px;
    height: 700px;
    background-color: white;
    opacity: 1;
}
.SingupComponent_IMG {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
#mainIMG {
    width: 200px;
    height: 200px;
}
</style>