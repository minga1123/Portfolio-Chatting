import Vue from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const SocketPlugin = {
  install(vue) {
    vue.mixin({});



    vue.prototype.$socket = socket;
  },
};

Vue.use(SocketPlugin);