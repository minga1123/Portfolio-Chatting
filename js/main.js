
var socket = io();

//접속 유저 정보
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
        loginCount : 0,
        //채팅 요청 보내고 대기 시 닫기 버튼 v-if
        requsetChat : false
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
            // 자식객체 초기화
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
        MainContentClick : function(event){
            document.querySelector(".background1").className = "background1 show";
            console.log(event.target.innerText);
            
            //채팅대기(닫기)버튼 true
            this.requsetChat=true;

            document.getElementById('ChatPopupDiv').removeChild(document.getElementById('ChatPopupDiv').firstChild);
            var h1 = document.createElement('h1');
            var h1_Divtext = document.createTextNode(event.target.innerText);
            h1.appendChild(h1_Divtext);
            var h1_Text = document.createTextNode(' 님에게 요청을 보냈습니다.');
            h1.appendChild(h1_Text);
            document.getElementById('ChatPopupDiv').prepend(h1);   
            
            socket.emit('requestUser',{requestName:this.userName, responseName:event.target.innerText});
            // document.getElementById('ChatPopup Div').appendChild(h1);            
        },
        
        ChatAcceptBtn: function(){
            console.log('채팅수락');
        },

        ChatRefuseCloseBtn: function(){
            document.querySelector(".background1").className = "background1";
            console.log('채팅거절');
            // ChatAcceptBtn,ChatRefuseCloseBtn
        },
        ChatCloseBtn: function(){
            console.log('채팅대기');
            document.querySelector(".background1").className = "background1";
            console.log('채팅거절');
        }
    },
    
    created : function() {
        // 소켓 연결
        socket.on('connect', function(){
            console.log('소켓 연결');  
            //로그인 유저 정보
            socket.on('loginInfo', function(serverData){
                console.log(serverData);
                app.loginCount=serverData.loginCount; 
                // app.js => userIDArray:userId[]; === main.js => userInfo[];
                userInfo = serverData.userArray.filter(() => true);
                console.log(userInfo);
                // settimeout값 주기
               app.addUserDiv();  
            });
            //로그아웃 유저 정보
            socket.on('loginoutInfo', function(serverData){
                console.log(serverData);
                userInfo = serverData.userArray.filter(() => true);
                console.log(userInfo);
                app.addUserDiv();
            });
            //채팅요청 받은 사람에게도 ㅇㅇ님이 요청하였습니다. 를 뿌려줘야 
            // 서버에서 이벤트를 받게 되면 다시 클라이언트 쪽으로 전달 하고 클라이언트에서 if문을 통해 자신에게 온 이벤트만 받도록 설정requestUser
            socket.on('responseUser', function(serverData){
                console.log('요청보내는사람 (나) : ' + serverData.requestName);
                console.log('요청받는사람 : ' + serverData.responseName);
                if(serverData.requestName === app.userName ){

                    app.requestID = serverData.requestName;

                    document.getElementById('ChatPopupDiv').removeChild(document.getElementById('ChatPopupDiv').firstChild);
                    console.log('실행이 되ㅏㄴ요?');
                    
                    var h1 = document.createElement('h1');
                    var h1_Divtext = document.createTextNode(serverData.requestName);
                    h1.appendChild(h1_Divtext);
                    var h1_Text = document.createTextNode(' 님에게 요청이 왔습니다.');
                    h1.appendChild(h1_Text);
                    document.getElementById('ChatPopupDiv').prepend(h1); 
                }
                
            });
        });

    }
});