
var socket = io();

//접속 유저 정보
var userInfo = [];



var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 보내는사람(나)
        userName : null,
        Title : true,
        Chat : false,
        userChat : null,
        //app.loginCount=serverData.loginCount;
        loginsCount : 0,
        //채팅 요청 보내고 대기 시 닫기 버튼 v-if
        requestChat : false,
        // 받는사람
        responseName : null
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
                //입장하기 누르면 userName값 emit 로그인한 유저 확인
                socket.emit('userlogin',{userName:this.userName});
            } else if(this.userName.length>=8){
                console.log("8글자보다 큼");
                //팝업창 띄우기 
                document.querySelector(".background").className = "background show";
                this.userName=null;
                
            }
        },
        TitleBackBtn: function(){
            console.log("Main->Title 이전 버튼");
            this.Title=true;
            //타이틀화면 이동 시 userName값 emit 로그아웃한 유저 확인
            socket.emit('userlogout',{logoutName:this.userName});
            this.userName=null;
            
        },
        ChatBtn: function(){
            console.log("admin chat btn");
            setTimeout(function() {
                console.log('app.addUserDiv():');
                app.addUserDiv();
            }, 100);
        },
        MainBackBtn: function(){
            console.log("Chat->Main 이전 버튼");
            this.Chat=false;
            setTimeout(function() {
                app.addUserDiv();
            }, 100);
            socket.emit('Mainback',{closeuser:app.responseName});

            // socket.emit('userlogout',{logoutName:this.userName, 상대방 저장된 이름도 같이 app.responseName});
        },
        popupCloseBtn: function(){
            document.querySelector(".background").className = "background";
        },
        
        SendBtn: function(){
            console.log("메세지 전송 버튼");
            if(this.userChat == null) {
                return;
            }
            socket.emit('sendChat',{userName:this.userName,responseName:this.responseName,Chatmsg:this.userChat});
            this.userChat=null;
        },
        //MainPage에서 같은 서버에 접속한 수 만큼 동적 div 생성 (appendChild)
        addUserDiv : function(){
            // 채팅창으로 넘어가기 전에 자식객체 초기화
            if(!this.Chat && !this.Title) {
                var count = document.getElementById('MainContent').childElementCount;
                for(var i = 0; i < count; i++) {
                    document.getElementById('MainContent').removeChild(document.getElementById('MainContent').firstChild);
                }
            }       
            for(var i=0; i<this.loginsCount; i++){
                if(this.userName!==userInfo[i]){
                    var div = document.createElement('div');
                    div.className ='MainContent';
                    
                    var text = document.createTextNode(userInfo[i]);
                    div.appendChild(text);
                    //특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙입니다
                    document.getElementById('MainContent').appendChild(div);
                    div.addEventListener('click',app.MainContentClick);
                }    
            }
        },
        MainContentClick : function(event){
            //채팅 요청 팝업창 띄우기
            document.querySelector(".background1").className = "background1 show";
            
            //채팅대기(닫기)버튼 true
            this.requestChat=true;
            
            this.responseName = event.target.innerText;
            document.getElementById('ChatPopupDiv').removeChild(document.getElementById('ChatPopupDiv').firstChild);
            var h1 = document.createElement('h1');
            var h1_Divtext = document.createTextNode(event.target.innerText);
            h1.appendChild(h1_Divtext);
            var h1_Text = document.createTextNode(' 님에게 채팅 요청을 보냈습니다.');
            h1.appendChild(h1_Text);
            document.getElementById('ChatPopupDiv').prepend(h1);   
            
            socket.emit('requestUser',{requestName:this.userName, responseName:event.target.innerText});
            // document.getElementById('ChatPopup Div').appendChild(h1);            
        },
        
        ChatAcceptBtn: function(){
            console.log('채팅수락');
            
            socket.emit('AcceptChat',{requestName:this.userName, responseName:this.responseName});
        },

        ChatRefuseBtn: function(){
            document.querySelector(".background1").className = "background1";
            console.log('채팅거절');
            console.log('requestName : ' + this.userName);
            console.log('responseName '+ this.responseName);
            socket.emit('RefuseChat',{requestName:this.userName, responseName:this.responseName});

        },
        ChatCloseBtn: function(){
            console.log('요청 대기 중');
            document.querySelector(".background1").className = "background1";
            console.log('닫기');
            socket.emit('CloseChat',{requestName:this.userName, responseName:this.responseName});
        }
    },
    
    created : function() {
        // 소켓 연결
        socket.on('connect', function(){
            console.log('소켓 연결');  
            //로그인 유저 정보
            socket.on('loginInfo', function(serverData){
                app.loginsCount=serverData.loginCount; 
                console.log(app.loginsCount);
                userInfo = serverData.userArray.filter(() => true);
                console.log(userInfo);
                if(!app.Title){
                    app.addUserDiv();  
                }
               
            });
            //로그아웃 유저 정보
            socket.on('logoutInfo', function(serverData){
                app.loginsCount=serverData.logoutCount; 
                console.log(app.loginsCount);
                userInfo = serverData.userArray.filter(() => true);
                console.log(userInfo);
                if(!app.Title) {
                    app.addUserDiv();
                }
            });
            //요청 받은 사람에게 요청팝업 
            socket.on('responseUser', function(serverData){            
                if(serverData.responseName === app.userName){

                    //app에서 요청받은 애랑 서버에서 요청한애는 같지 
                    app.responseName = serverData.requestName;
                    console.log(app.responseName);

                    console.log('요청보내는사람 (나) : ' + serverData.requestName);
                    console.log('요청받는사람 : ' + serverData.responseName);
                    document.querySelector(".background1").className = "background1 show";

                    document.getElementById('ChatPopupDiv').removeChild(document.getElementById('ChatPopupDiv').firstChild);
                    var h1 = document.createElement('h1');
                    var h1_Divtext = document.createTextNode(serverData.requestName);
                    h1.appendChild(h1_Divtext);
                    var h1_Text = document.createTextNode(' 님에게 채팅 요청이 왔습니다.');
                    h1.appendChild(h1_Text);
                    document.getElementById('ChatPopupDiv').prepend(h1); 
                }
            });
            
            socket.on('AcceptChatting', function(serverData){
                //app.requestChat은 닫기 == 요청보낸애
                console.log('요청보낸애 ' + serverData.requestName);
                console.log('요청한애 ' + serverData.responseName);
                console.log(app.userName);
                app.Chat=true;
                    setTimeout(function(){
                        if(app.requestChat) {
                            //닫기요청
                            console.log(serverData);
                            var h1 = document.createElement('h1');
                            var h1_Text = document.createTextNode(serverData.responseName);
                            app.responseName = serverData.responseName;
                            h1.appendChild(h1_Text);
                            document.getElementById('whatthename').append(h1);
                        }
                        else {
                            console.log('받는사람'+serverData.responseName);
                            console.log('보내는'+serverData.requestName);
                            console.log(serverData);

                            var h1 = document.createElement('h1');
                            var h1_Text = document.createTextNode(serverData.requestName);
                            app.responseName = serverData.requestName;
                            h1.appendChild(h1_Text);
                            document.getElementById('whatthename').append(h1);
                        }
                    }, 100);
            });
            socket.on('RefuseChatting',function (serverData) {
                //이벤트보낸사람시점으로 
                //내가 요청을 보냈는지, 상대방도 요청을 받았는지 받았으면 
                if(app.userName === serverData.requestName || app.userName===serverData.responseName){
                    document.querySelector(".background1").className = "background1";
                    app.requestChat = false;
                }
            });
            socket.on('CloseChatting',function (serverData) {
                console.log('serverdata request : ' + serverData.requestName);
                console.log('servdat response : ' + serverData.responseName);
                if(app.userName === serverData.requestName || app.userName===serverData.responseName){
                    document.querySelector(".background1").className = "background1";
                    app.requestChat = false;
                }
            }); 
            // io.sockets.emit('GoMain', Mainback);
            socket.on('GoMain', function(serverData){
                if(app.userName===serverData.closeuser){
                    app.Chat=false;
                    setTimeout(function() {
                        app.addUserDiv();
                    }, 100);
                }
                app.requestChat=false;
            });
            socket.on('sendChatting',function(serverData){
                if(app.userName==serverData.userName || app.userName===serverData.responseName){
                    console.log(serverData.userName  + '가 '+ serverData.responseName + ' 한테 ->' + serverData.Chatmsg);
                    //말풍선
                    var ChatMsg = document.createElement('div');
                    ChatMsg.className='ChatMsg';
                    //위치조절ChatRL
                    var ChatPos = document.createElement('div');
                    if(serverData.userName === app.userName){
                        ChatPos.className = 'posR';
                    }else{
                        ChatPos.className = 'posL';
                    }
                    ChatPos.appendChild(ChatMsg);

                    var Chattext = document.createTextNode(serverData.Chatmsg);
                    ChatMsg.appendChild(Chattext);
                    var today = new Date();
                    var hours = today.getHours(); 
                    var minutes = today.getMinutes(); 
                    var p = document.createElement('p');
                    // var time = document.createTextNode('\u00A0' + hours + ':' + minutes + '\u00A0');
                    var time = document.createTextNode(hours + ':' + minutes );
                    p.appendChild(time);
                    ChatPos.appendChild(p);
                    document.getElementById('ChatBox').appendChild(ChatPos);

                    document.getElementById('ChatScroll').scrollTop = document.getElementById('ChatScroll').scrollHeight;
                }
            });
                    


        });

    }
});