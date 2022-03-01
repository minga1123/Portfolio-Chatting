
var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 사용 할 변수들 
        userName : null,
        Title : true,
        Chat : false
        
    },
    components : {
        //컴포넌트 추가

    },

    methods : {
        // Vue 메서드 
        JoinBtn: function(){
            if(this.userName!=null && this.userName.length<8){
                console.log("입장하기");
                this.Title=false;
            } else if(this.userName.length>8){
                console.log("8글자보다 큼");
                this.userName=null;
                //팝업
            }

        },
        TitleBackBtn: function(){
            console.log("Main->Title 이전 버튼");
            this.Title=true;
            this.userName=null;
        },

        ChatBtn: function(){
            console.log("admin chat btn");
            this.Chat=true;
        },
        MainBackBtn: function(){
            console.log("Chat->Main 이전 버튼");
            this.Chat=false;
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

    }
});