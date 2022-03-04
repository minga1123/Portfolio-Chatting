
var socket = io();

var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 사용 할 변수들 
        userName : null,
        Title : true,
        Chat : false,
        userChat : null
        
    },
    components : {
        //컴포넌트 추가

    },

    methods : {
        // Vue 메서드 
        JoinBtn: function(){
            if(this.userName!=null && this.userName.length<=8){
                console.log("입장하기");
                this.Title=false;
                socket.emit('userlogin',{userName:this.userName});
            } else if(this.userName.length>=8){
                console.log("8글자보다 큼");
                //팝업
                document.querySelector(".background").className = "background show";
                this.userName=null;
                
            }

        },
        TitleBackBtn: function(){
            console.log("Main->Title 이전 버튼");
            this.Title=true;
            socket.emit('userlogout',{userName:this.userName});
            this.userName=null;
            
        },

        ChatBtn: function(){
            console.log("admin chat btn");
            this.Chat=true;
        },
        MainBackBtn: function(){
            console.log("Chat->Main 이전 버튼");
            this.Chat=false;
        },
        popupCloseBtn: function(){
            document.querySelector(".background").className = "background";
        },
        SendBtn: function(){
            console.log("메세지 전송 버튼");
        }
    },
    
    created : function() {
        // 소켓 연결 할 부분
        socket.on('connect', function(){
            console.log('소켓 연결');

        });

    }
});