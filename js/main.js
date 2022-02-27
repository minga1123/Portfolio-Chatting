
var app = new Vue({
    el : "#TotalDiv",
    data : {
        // 사용 할 변수들 
        userName : null,
        Title : true,
        Main : false,
        Chat : false
        
    },
    components : {
        //컴포넌트 추가

    },

    methods : {
        // Vue 메서드 
        userJoin: function(){
            console.log("입장하기");
            if(this.userName.legth>8){
                console.log("8글자보다 큼");
            }

            if(this.userName!=null && this.userName.legth<8){
                this.Title=false;
                this.Main=true;
            }

        },
        userBack: function(){
            console.log("뒤로가기");
            this.Main=false;
            this.Title=true;
            this.userName=null;
        }

    },
    
    created : function() {
        // 소켓 연결 할 부분

    }
});