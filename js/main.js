//여긴 main.js 입니다.
var socket = io();
var loginUsers = [];

// ----------------------
var userLists = {
    template : '<div class="userDiv" v-on:click="chattings"></div>',
    // 서버에 접속 중인 userNickName 
    methods : {
        // onclick < 메서드 >
        // 이 사람한테 채팅을 보내기 위한 요청
        getuserID : function() {
            // if(loginUsers[app.logins - 1] === app.userNickname) {
            //     return false;
            // }
            // else {
            //     return true;
            // }
        },
        chattings : function() {   
            // console.log(loginUsers[app.logins - 1]);
        }
    }
}



// ---------------------
var app = new Vue({
    el : '#totalDiv',
    data : {
        // 사용 할 변수들 
        userNickname : null,
        userLogin : false,
        chatting : false,
        userChatting : null,
        logins : 0,  
        testName : null,
        requestChat : false,
        reqestID : null,
    },

    components : {
        //컴포넌트 추가
        'loginuser' : userLists,
    },

    computed: {
        seconds: function() {
            return loginUsers.length;
        }
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
            //app.userUpdate();
        },

        goChattingPage : function() {
            //his.chatting = true;
            this.userUpdate();
        },

        closepopup1 : function() {
            console.log("종료시켜줘");
            // document.querySelector(".background1").className = "background1 show1";
            document.querySelector(".background1").className = "background1";
            socket.emit('failChat', {reqestUser : this.userNickname, myName : this.reqestID});
            this.reqestID = null;
        },

        goMainPage : function() {
            //this.chatting = false;
            //this.userChatting = null;
            socket.emit('endChat', {reqestUser : this.userNickname, myName : this.reqestID});
        },

        sendChatting : function() {
            //채팅 전송
            this.userChatting = null;
        },

        successChat : function() {
            socket.emit('success', {reqestUser : this.userNickname, myName : this.reqestID});
        },

        failChat : function() {
            this.requestChat = false;
            
            document.querySelector(".background1").className = "background1";
            socket.emit('failChat', {reqestUser : this.userNickname, myName : this.reqestID});
            this.reqestID = null;
        },

        closepopup : function() {
            document.querySelector(".background").className = "background";
        },

        testFunction : function(event) {
            console.log(event.target.innerText);
            this.requestChat = true;
            document.querySelector(".background1").className = "background1 show1";

            document.getElementById('testDiv').removeChild(document.getElementById('testDiv').firstChild);
            var h1 = document.createElement('h1');
            var h1Text = document.createTextNode(event.target.innerText);
            h1.appendChild(h1Text);
            var h1Texts = document.createTextNode(' 님에게 채팅 요청 중');
            h1.appendChild(h1Texts);
            h1.setAttribute('style','font-family: IM_Hyemin-Regular;');
            document.getElementById('testDiv').prepend(h1);
            socket.emit('requset_user', {reqestUser : event.target.innerText, myName : this.userNickname});
        },
        
        userUpdate : function() {
            if(!this.chatting) {
                var count = document.getElementById('userDiv').childElementCount;
                for(var i = 0; i < count; i++) {
                    document.getElementById('userDiv').removeChild(document.getElementById('userDiv').firstChild);
                }
            }

            for(var i = 0; i < this.logins; i++) {
                if(this.userNickname !== loginUsers[i]) {
                    let div = document.createElement('div');
                    div.className = 'userDiv';
                    //div.setAttribute('v-on:click', 'testFunction');
                    div.addEventListener('click', app.testFunction);
                    let text = document.createTextNode(loginUsers[i]);
                    div.appendChild(text);
                    document.getElementById('userDiv').appendChild(div);
                }
            }
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

        socket.on('connect', function(){
            socket.on('userLoginList', function(serverData) {
                console.log(serverData);
                app.logins = serverData.logincount;
                console.log(app.logins);
                loginUsers = serverData.total.filter(() => true);
                //loginUsers.push(serverData.userName);
                console.log(loginUsers);
                console.log(loginUsers.length);
                //app.update(serverData.userName);
                if(app.userLogin) {
                    app.userUpdate();
                }
                
            });

            socket.on('userLogoutList', function(serverData) {
                app.logins = serverData.logoutcount;
                loginUsers = serverData.total.filter(() => true);
                //loginUsers.splice(loginUsers.indexOf(serverData.logoutID), 1);
                app.userUpdate();
            });

            socket.on('respone_user', function(serverData) {
                if(serverData.reqestUser === app.userNickname && !app.chatting){
                    //success // fail
                    app.reqestID = serverData.myName;

                    document.getElementById('testDiv').removeChild(document.getElementById('testDiv').firstChild);

                    console.log(serverData.myName + ' 님이 채팅을 요청 하였습니다.');
                    var h1 = document.createElement('h1');
                    var h1Text = document.createTextNode(serverData.myName);
                    h1.appendChild(h1Text);
                    var h1Texts = document.createTextNode(' 님에게 채팅 요청이 왔습니다.');
                    h1.appendChild(h1Texts);
                    h1.setAttribute('style','font-family: IM_Hyemin-Regular;');
                    document.getElementById('testDiv').prepend(h1);
                    document.querySelector(".background1").className = "background1 show1";
                }
            });

            socket.on('successChatting', function(serverData) {
                if(serverData.reqestUser === app.userNickname || serverData.myName === app.userNickname) {
                    app.chatting = true;
                    app.reqestID = serverData.myName;
                    //document.getElementById('chatUserNickname').innerHTML = serverData.myName;
                }
            });

            socket.on('failChatting', function(serverData) {
                if(serverData.myName === app.userNickname || serverData.reqestUser === app.reqestID) {
                    console.log(serverData.reqestUser + ' 님이 거절하였습니다.');
                    app.requestChat = false;
                    document.querySelector(".background1").className = "background1";
                }
            });

            socket.on('endChatting', function(serverData) {
                if(serverData.reqestUser === app.userNickname || serverData.myName === app.reqestID) {
                    app.chatting = false;
                    app.userChatting = null;
                    app.requestChat = false;
                    setTimeout(app.userUpdate ,100);
                }
            });

        });
    }
});