'use strict';

(function() {
  class HomeController {

    constructor($scope,$http,socket,$location,Auth) {
      this.$http = $http;
      this.myplys = [];
      this.getCurrentUser = Auth.getCurrentUser;
      this.firstTime = true;
      console.log(this.getCurrentUser().email);
      this.email = this.getCurrentUser().email;
      this.$http.get('/api/plys/mine/'+this.email).then(response => {
        this.myplys = response.data;
        socket.syncUpdates('ply', this.myplys);
        if(this.myplys.length >0){
          this.firstTime = false;
        }
      });
    }

    isFirstTime(){
      if(this.myplys.length > 0){
        return true;
      }else{
        return false;

      }
    }


  }

  angular.module('plyappApp')
    .controller('HomeContrl', HomeController);
})();
