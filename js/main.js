//여긴 main.js 입니다.

var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 사용 할 변수들 
        userName : null,
        Title : true
    },
    components : {
        //컴포넌트 추가

    },

    methods : {
        // Vue 메서드 
        userJoin: function(){
            console.log("입장하기");
            if(this.userName!=null){
                this.Title=false;
            }
        },
        userBack: function(){
            console.log("뒤로가기");
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

    }
});