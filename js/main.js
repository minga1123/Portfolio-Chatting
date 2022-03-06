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
            // 요청 받았을 때 팝업을 출력 후 거절 버튼을 눌렀을 때 채팅 거절 이벤트를 서버에 전달 이때 자기 자신의 이름과 요청했던 사람의 이름을 다시 전달
            socket.emit('failChat', {reqestUser : this.userNickname, myName : this.reqestID});
            this.reqestID = null;
        },

        goMainPage : function() {
            //this.chatting = false;
            //this.userChatting = null;
            // 채팅 종료 후 메인페이지로 이동 시 이벤트 처리
            socket.emit('endChat', {reqestUser : this.userNickname, myName : this.reqestID});
        },

        sendChatting : function() {
            //채팅 전송
            if(this.userChatting === null) {
                return;
            }
            socket.emit('send_Message', {sendUser : this.userNickname, requestUser : this.reqestID ,sendMessage : this.userChatting});
            this.userChatting = null;

            
        },

        successChat : function() {
            // 채팅 수락
            socket.emit('success', {reqestUser : this.userNickname, myName : this.reqestID});
        },

        failChat : function() {
            this.requestChat = false;
            
            document.querySelector(".background1").className = "background1";
            // 취소가 되었을 경우 서버에 이벤트 전달 및 팝업 닫기
            socket.emit('failChat', {reqestUser : this.userNickname, myName : this.reqestID});
            // 요청 받은 아이디 초기화
            this.reqestID = null;
        },

        closepopup : function() {
            document.querySelector(".background").className = "background";
        },
        // 메인 페이지에서 접속한 유저 클릭 시 팝업 출력
        testFunction : function(event) {
            // 아래 메서드에서 추가한 div를 클릭 했을 시 이벤트 처리 
            console.log(event.target.innerText);
            // 팝업 input을 제어하는 변수 조정
            this.requestChat = true;
            // 팝업 출력
            document.querySelector(".background1").className = "background1 show1";

            document.getElementById('testDiv').removeChild(document.getElementById('testDiv').firstChild);
            var h1 = document.createElement('h1');
            var h1Text = document.createTextNode(event.target.innerText);
            h1.appendChild(h1Text);
            var h1Texts = document.createTextNode(' 님에게 채팅 요청 중');
            h1.appendChild(h1Texts);
            h1.setAttribute('style','font-family: IM_Hyemin-Regular;');
            document.getElementById('testDiv').prepend(h1);
            // 채팅 요청하는 이벤트를 서버에 전달 전달 하는 인자는 div안에 있는 텍스트와 누가 요청했는지 알아야하기에 본인 이름을 전달
            socket.emit('requset_user', {reqestUser : event.target.innerText, myName : this.userNickname});
        },

        userUpdate : function() {
            // 로그인, 로그아웃 시 서버에서 받은 배열을 활용하여 메인 페이지에서 div를 추가하는 메서드
            // 먼저 div안에 있는 모든 내용을 삭제 후 
            if(!this.chatting) {
                var count = document.getElementById('userDiv').childElementCount;
                for(var i = 0; i < count; i++) {
                    document.getElementById('userDiv').removeChild(document.getElementById('userDiv').firstChild);
                }
            }
            // 반복문을 활용해서 접속 한 유저 모두 출력
            for(var i = 0; i < this.logins; i++) {
                if(this.userNickname !== loginUsers[i]) {
                    let div = document.createElement('div');
                    div.className = 'userDiv';
                    //div.setAttribute('v-on:click', 'testFunction');
                    div.addEventListener('click', app.testFunction);
                    let text = document.createTextNode(loginUsers[i]);
                    div.setAttribute('style','font-family: IM_Hyemin-Regular;');
                    div.appendChild(text);
                    document.getElementById('userDiv').appendChild(div);
                }
            }
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

        socket.on('connect', function(){

            // 로그인 했을 때 서버에서 받은 이벤트 처리 > serverData 객체로 받은 건 3가지 (로그인한 유저 이름, 총 서버에 접속중인 수, 접속 중인 유저 배열 전체)
            socket.on('userLoginList', function(serverData) {
                console.log(serverData);
                app.logins = serverData.logincount;
                console.log(app.logins);
                // 클라이언트에서 처리하기 위해 접속중인 총 유저 배열을 복사 
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
                // 클라이언트에서 접속 중인 수 저장
                app.logins = serverData.logoutcount;
                // 클라이언트에서 처리하기 위해 접속중인 총 유저 배열을 복사 
                loginUsers = serverData.total.filter(() => true);
                //loginUsers.splice(loginUsers.indexOf(serverData.logoutID), 1);
                if(app.userLogin) {
                    app.userUpdate();
                }
            });

            socket.on('respone_user', function(serverData) {
                // 먼저 채팅을 하고 있지 않아야하고, 채팅을 요청받은 사람과 나의 닉네임이 같은지 비교 후 이벤트 처리
                if(serverData.reqestUser === app.userNickname && !app.chatting){
                    //success // fail
                    // 누가 요청 했는지 저장
                    app.reqestID = serverData.myName;
                    // 팝업 처리
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
            
            // 채팅 수락 시 이벤트 처리
            socket.on('successChatting', function(serverData) {
                // 요청 한 사람, 요청 받은 사람 둘 다 처리 해주기 위해 or 연산자를 사용해서 이벤트 처리
                if(serverData.reqestUser === app.userNickname || serverData.myName === app.userNickname) {
                    app.chatting = true;
                    //app.reqestID = serverData.myName;
                    setTimeout(function(){
                        if(app.requestChat) {
                            var h1 = document.createElement('h1');
                            var h1Text = document.createTextNode(serverData.reqestUser);
                            app.reqestID = serverData.reqestUser;
                            h1.appendChild(h1Text);
                            h1.setAttribute('style','font-family: IM_Hyemin-Regular;');
                            document.getElementById('chatUserNickname').append(h1);
                        }
                        else {
                            var h1 = document.createElement('h1');
                            var h1Text = document.createTextNode(serverData.myName);
                            app.reqestID = serverData.myName;
                            h1.appendChild(h1Text);
                            h1.setAttribute('style','font-family: IM_Hyemin-Regular;');
                            document.getElementById('chatUserNickname').append(h1);
                        }
                    },100);
                   
                    //document.getElementById('chatUserNickname').innerHTML = serverData.myName;
                }
            });

            // 채팅 거절 시 이벤트 처리
            socket.on('failChatting', function(serverData) {
                // 요청 한 사람, 요청 받은 사람 둘 다 같이 이벤트 처리 
                if(serverData.myName === app.userNickname || serverData.reqestUser === app.reqestID) {
                    console.log(serverData.reqestUser + ' 님이 거절하였습니다.');
                    // 팝업에 input을 제어하는 변수도 초기화
                    app.requestChat = false;
                    document.querySelector(".background1").className = "background1";
                }
            });

            socket.on('endChatting', function(serverData) {
                // 채팅이 끝났을 때 요청한 사람과 요청 받은 사람 둘 다 메인화면으로 이동해주고 팝업 제어하는 변수 초기화
                if(serverData.reqestUser === app.userNickname || serverData.reqestUser === app.reqestID) {
                    app.chatting = false;
                    app.userChatting = null;
                    app.requestChat = false;
                    // 화면 이동하면서 함수를 실행하면 읽어올 수가 없어서 setTimeout으로 약간의 딜레이를 줘서 화면 전환 후 새로고침
                    setTimeout(app.userUpdate ,100);
                }
            });

            socket.on('request_Message', function(serverData) {
                if(serverData.sendUser === app.userNickname || serverData.requestUser === app.userNickname) {
                    console.log(serverData.requestUser + ' 님에게 '+ serverData.sendUser + '님이 메세지를 보냈습니다.');
                    console.log(serverData.sendMessage);    
                    
                    let div1 = document.createElement('div');

                    let div = document.createElement('div');

                    if(serverData.sendUser === app.userNickname) 
                    {
                        div1.className = 'chatPos';
                    }
                    else 
                    {
                        div1.className = 'chatPos1';
                    }

                    div.className = 'chatDiv';
                    let today = new Date();   
                    
                    let hours = today.getHours(); // 시
                    let minutes = today.getMinutes();  // 분
                    let seconds = today.getSeconds();  // 초

                    //document.write(hours + ':' + minutes + ':' + seconds);
                    
                    let text = document.createTextNode(serverData.sendUser);
                    div.setAttribute('style','font-family: IM_Hyemin-Regular;');
                    // div.appendChild(text);
                    // var br = document.createElement('br');
                    // div.appendChild(br);
                    let text1 = document.createTextNode(serverData.sendMessage);
                    div.appendChild(text1);
                    div1.appendChild(div);
                    var p = document.createElement('p');
                    var timeText = document.createTextNode('\u00A0' + hours + ':' + minutes + ':' + seconds);
                    p.appendChild(timeText);
                    div1.appendChild(p);
                    p.setAttribute('style','font-family: IM_Hyemin-Regular;');

                    document.getElementById('Chatcontent').appendChild(div1);

                    document.getElementById('Chatcontent').scrollTop = document.getElementById('Chatcontent').scrollHeight;

                }
            });

        });
    }
});