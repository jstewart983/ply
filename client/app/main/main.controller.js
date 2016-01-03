'use strict';

(function() {

class MainController {

  constructor($interval) {
    this.$interval = $interval;

    this.nums = [{num:12},{num:85},{num:34},{num:1},{num:49},{num:75}];

    this.number = 12;
    this.numer = 74;
  }

  go() {
    this.numer = parseInt(34);
    this.$interval(function (numer) {

      //numer = parseInt(Math.floor((Math.random()*100)+1));
      //this.number = parseInt(Math.floor((Math.random()*6)+1));
      //this.numer = numer;
    }, 1000);

  }




}

angular.module('plyappApp')
  .controller('MainController', MainController);

})();
