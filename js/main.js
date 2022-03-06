
var socket = io();

//socket.emit('loginInfo',{userName:userName.userName, loginCount:userId.length, userIDArray:userId});
var userInfo = [];



var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 사용 할 변수들 
        userName : null,
        Title : true,
        Chat : false,
        userChat : null,
        //app.loginCount=serverData.loginCount;
        loginCount : 0
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
        },
        //MainPage에서 같은 서버에 접속한 severData 수 만큼 동적 div 생성 (appendChild)
        addUserDiv : function(){
            //자식객체 초기화
            if(this.Chat) {
                var count = document.getElementById('MainContent').childElementCount;
                for(var i = 0; i < count; i++) {
                    document.getElementById('MainContent').removeChild(document.getElementById('MainContent').firstChild);
                }
            }       
            for(var i=0; i<this.loginCount; i++){
                if(this.userName!==userInfo[i]){
                    let div = document.createElement('div');
                    div.className ='MainContent';
                    
                    let text = document.createTextNode(userInfo[i]);
                    div.appendChild(text);
                    //특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙입니다
                    document.getElementById('MainContent').appendChild(div);
                    div.addEventListener('click',app.MainContentClick);
                    
                }    
            }
        },
        MainContentClick : function(){
            console.log('채팅방 들어가기 clcik');
            document.querySelector(".background1").className = "background1 show";

            document.getElementById('ChatPopup').removeChild(document.getElementById('ChatPopup').firstChild);
            var h1 = document.createElement('h1');

            var h1Text = document.createTextNode(event.target.innerText);
            h1.appendChild(h1Text);
            var h1Texts = document.createTextNode(' 님에게 채팅 요청 중');
            h1.appendChild(h1Texts);
            

        },
        ChatRefuseCloseBtn: function(){
            document.querySelector(".background1").className = "background1";
            console.log('응 안해~');
            // ChatAcceptBtn,ChatRefuseCloseBtn
        },
        ChatAcceptBtn: function(){
            console.log('채팅해드림');
        }
    },
    
    created : function() {
        // 소켓 연결 할 부분
        socket.on('connect', function(){
            console.log('소켓 연결');
            //로그인 
            socket.on('loginInfo', function(serverData){
                console.log(serverData);
                app.loginCount=serverData.loginCount; 
                // app.js => userIDArray:userId[]; === main.js => userInfo[];
                userInfo = serverData.userArray.filter(() => true);
                console.log(userInfo);
                // settimeout값 주기
                app.addUserDiv();
               
               
            });
            //로그아웃 
            socket.on('loginoutInfo', function(serverData){
                console.log(serverData);
                userInfo = serverData.userArray.filter(() => true);
                app.addUserDiv();
                
            });
            
        });

    }
});