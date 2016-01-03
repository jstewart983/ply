'use strict';

(function() {

class JoinController {
  //start-non-standard
  plyr = {};
  errors = {};
  submitted = false;
  //end-non-standard


  constructor($location,$http,$scope,socket,$cookies,Auth) {

    this.plyAttendee = {username:'',code:''};
    this.error = {msg:''};
    this.$location = $location;
    this.awesomeThings = [];
    this.$http = $http;
    this.$cookies = $cookies;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
    if(this.isLoggedIn()){
      this.plyAttendee = {username:this.getCurrentUser().email,code:''};
    }

    $http.get('/api/plys/join').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('ply', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('ply');
    });
  }

  editUsername(){
    console.log(this.$cookies.plyuser);
    this.plyAttendee.username = '';
    this.$cookies.plyuser = '';
  }

  setUsername(name){
    if(this.plyAttendee.username){
      // Setting a cookie
      this.$cookies.plyuser = name;
      this.error.msg = '';

    }else{
      this.error.msg = 'You gotta pick a username';
    }

  }

  usernameSet(){
    if(this.$cookies.plyuser){
      return true;
    }else{
      return false;
    }
  }

  isPlyr(index){
    if (this.isLoggedIn()) {
      for (var i = 0; i < this.awesomeThings[index].plyrs.length; i++) {
        console.log('compare '+this.awesomeThings[index].plyrs[i].username+' with '+this.getCurrentUser().email)
        if(this.awesomeThings[index].plyrs[i].username == this.getCurrentUser().email){
          return true;
        }
      }
      return false;
    }else{
      for (var i = 0; i < this.awesomeThings[index].plyrs.length; i++) {
        console.log('compare '+this.awesomeThings[index].plyrs[i].username+' with '+this.$cookies.plyuser)
        if(this.awesomeThings[index].plyrs[i].username == this.$cookies.plyuser){
          return true;
        }
      }
      return false;
    }
  }

    addPlyr(id) {
      var plyToUpdate;
      var index;
          if(this.plyAttendee.username){
            //loop through the plys to choose the right one to push the plyr to
            for (var i = 0; i < this.awesomeThings.length; i++) {
              if(this.awesomeThings[i]._id == id){
                plyToUpdate = this.awesomeThings[i];
                index = i;
              }
            }
            if(this.isPlyr(index)){
              this.error.msg = 'That username is already taken';

            }else{
              //save the changes to the db
              this.$http.put('/api/plys/join/'+id, {username:this.plyAttendee.username}).then(response =>{
                this.socket.syncUpdates('ply',this.awesomeThings);
              });

              //clear error message if there is one
              this.clearError();
              //save the username for usage in the ply they joined
              this.setUsername(this.plyAttendee.username);
            }

          }else{
            this.error.msg = 'You gotta pick a username';
          }
    }

    clearError(){
      this.error.msg = '';
    }

    setCode(code) {
      console.log('here is the code: '+code);
      if (code) {
        this.plyAttendee.code = code;
      }
    }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$location.path('/');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('plyappApp')
  .controller('JoinCtrl', JoinController);
})();
