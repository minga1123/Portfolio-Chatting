//여긴 main.js 입니다.
var socket = io();
var app = new Vue({
    el : '#totalDiv',
    data : {
        // 사용 할 변수들 
        userNickname : null,
        userLogin : false,
        chatting : false,
        userChatting : null,
    },

    components : {
        //컴포넌트 추가

    },

    methods : {
        // Vue 메서드 
        getUserNickName : function() {
            if(this.userNickname === null) {
                return;
            } 
            else if(this.userNickname.length < 8){
                //console.log("8글자 미만");
                this.userLogin = true;
                socket.emit('userLogin', {userName : this.userNickname});
            } 
            else if(this.userNickname.length > 8) {
                //console.log("9글자 이상");
                document.querySelector(".background").className = "background show";
                //alert("닉네임은 8글자 이하만 사용 가능합니다.");
                this.userNickname = null;
            }
        },
        goLoginPage : function() {
            this.userLogin = false;
            socket.emit('userLogOut', {userName : this.userNickname});
            this.userNickname = null;
        },

        goChattingPage : function() {
            this.chatting = true;
        },

        goMainPage : function() {
            this.chatting = false;
            this.userChatting = null;
        },

        sendChatting : function() {
            //채팅 전송
            this.userChatting = null;
        },

        closepopup : function() {
            document.querySelector(".background").className = "background";
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

        socket.on('connect', function(){

        });
    }
});