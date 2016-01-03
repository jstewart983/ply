"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}angular.module("plyappApp",["plyappApp.auth","plyappApp.admin","plyappApp.constants","ngCookies","ngResource","ngSanitize","ngRoute","btford.socket-io","validation.match"]).config(["$routeProvider","$locationProvider",function(a,b){a.otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("plyappApp.admin",["plyappApp.auth","ngRoute"]),angular.module("plyappApp.auth",["plyappApp.constants","plyappApp.util","ngCookies","ngRoute"]).config(["$httpProvider",function(a){a.interceptors.push("authInterceptor")}]),angular.module("plyappApp.util",[]),angular.module("plyappApp").config(["$routeProvider",function(a){a.when("/ply",{templateUrl:"app/ply/ply.html",controller:"PlyCtrl"})}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b){_classCallCheck(this,a),this.users=b.query()}return a.$inject=["User"],_createClass(a,[{key:"delete",value:function(a){a.$remove(),this.users.splice(this.users.indexOf(a),1)}}]),a}();angular.module("plyappApp.admin").controller("AdminController",a)}(),angular.module("plyappApp").config(["$routeProvider",function(a){a.when("/login",{templateUrl:"app/account/login/login.html",controller:"LoginController",controllerAs:"vm"}).when("/logout",{name:"logout",referrer:"/",template:"app/account/login/login.html",controller:["$location","$route","Auth",function(a,b,c){var d=b.current.params.referrer||b.current.referrer||"/login";c.logout(),a.path(d)}]}).when("/signup",{templateUrl:"app/account/signup/signup.html",controller:"SignupController",controllerAs:"vm"}).when("/settings",{templateUrl:"app/account/settings/settings.html",controller:"SettingsController",controllerAs:"vm",authenticate:"user"})}]).run(["$rootScope",function(a){a.$on("$routeChangeStart",function(a,b,c){"logout"===b.name&&c&&c.originalPath&&!c.authenticate&&(b.referrer=c.originalPath)})}]),angular.module("plyappApp.admin").config(["$routeProvider",function(a){a.when("/admin",{templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"admin",authenticate:"admin"})}]),function(a,b){a.module("plyappApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d,e,f){var g=this;_classCallCheck(this,a),this.$http=c,this.myplys=[],this.getCurrentUser=f.getCurrentUser,this.firstTime=!0,console.log(this.getCurrentUser().email),this.email=this.getCurrentUser().email,this.$http.get("/api/plys/mine/"+this.email).then(function(a){g.myplys=a.data,d.syncUpdates("ply",g.myplys),g.myplys.length>0&&(g.firstTime=!1)})}return a.$inject=["$scope","$http","socket","$location","Auth"],_createClass(a,[{key:"isFirstTime",value:function(){return this.myplys.length>0?!0:!1}}]),a}();angular.module("plyappApp").controller("HomeContrl",a)}(),angular.module("plyappApp").config(["$routeProvider",function(a){a.when("/home",{templateUrl:"app/home/home.html",controller:"HomeContrl",controllerAs:"home",authenticate:"user"})}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d,e,f,g){var h=this;_classCallCheck(this,a),this.plyr={},this.errors={},this.submitted=!1,this.plyAttendee={username:"",code:""},this.error={msg:""},this.$location=b,this.awesomeThings=[],this.$http=c,this.$cookies=f,this.socket=e,this.isLoggedIn=g.isLoggedIn,this.getCurrentUser=g.getCurrentUser,this.isLoggedIn()&&(this.plyAttendee={username:this.getCurrentUser().email,code:""}),c.get("/api/plys/join").then(function(a){h.awesomeThings=a.data,e.syncUpdates("ply",h.awesomeThings)}),d.$on("$destroy",function(){e.unsyncUpdates("ply")})}return a.$inject=["$location","$http","$scope","socket","$cookies","Auth"],_createClass(a,[{key:"editUsername",value:function(){console.log(this.$cookies.plyuser),this.plyAttendee.username="",this.$cookies.plyuser=""}},{key:"setUsername",value:function(a){this.plyAttendee.username?(this.$cookies.plyuser=a,this.error.msg=""):this.error.msg="You gotta pick a username"}},{key:"usernameSet",value:function(){return this.$cookies.plyuser?!0:!1}},{key:"isPlyr",value:function(a){if(this.isLoggedIn()){for(var b=0;b<this.awesomeThings[a].plyrs.length;b++)if(console.log("compare "+this.awesomeThings[a].plyrs[b].username+" with "+this.getCurrentUser().email),this.awesomeThings[a].plyrs[b].username==this.getCurrentUser().email)return!0;return!1}for(var b=0;b<this.awesomeThings[a].plyrs.length;b++)if(console.log("compare "+this.awesomeThings[a].plyrs[b].username+" with "+this.$cookies.plyuser),this.awesomeThings[a].plyrs[b].username==this.$cookies.plyuser)return!0;return!1}},{key:"addPlyr",value:function(a){var b,c,d=this;if(this.plyAttendee.username){for(var e=0;e<this.awesomeThings.length;e++)this.awesomeThings[e]._id==a&&(b=this.awesomeThings[e],c=e);this.isPlyr(c)?this.error.msg="That username is already taken":(this.$http.put("/api/plys/join/"+a,{username:this.plyAttendee.username}).then(function(a){d.socket.syncUpdates("ply",d.awesomeThings)}),this.clearError(),this.setUsername(this.plyAttendee.username))}else this.error.msg="You gotta pick a username"}},{key:"clearError",value:function(){this.error.msg=""}},{key:"setCode",value:function(a){console.log("here is the code: "+a),a&&(this.plyAttendee.code=a)}},{key:"register",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){b.$location.path("/")})["catch"](function(c){c=c.data,b.errors={},angular.forEach(c.errors,function(c,d){a[d].$setValidity("mongoose",!1),b.errors[d]=c.message})})}}]),a}();angular.module("plyappApp").controller("JoinCtrl",a)}(),angular.module("plyappApp").config(["$routeProvider",function(a){a.when("/join",{templateUrl:"app/join/join.html",controller:"JoinCtrl",controllerAs:"join"})}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b){_classCallCheck(this,a),this.$interval=b,this.nums=[{num:12},{num:85},{num:34},{num:1},{num:49},{num:75}],this.number=12,this.numer=74}return a.$inject=["$interval"],_createClass(a,[{key:"go",value:function(){this.numer=parseInt(34),this.$interval(function(a){},1e3)}}]),a}();angular.module("plyappApp").controller("MainController",a)}(),angular.module("plyappApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"})}]),angular.module("plyappApp").controller("PlyCtrl",["$scope",function(a){a.message="Hello"}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),LoginController=function(){function a(b,c){_classCallCheck(this,a),this.user={},this.errors={},this.submitted=!1,this.Auth=b,this.$location=c}return a.$inject=["Auth","$location"],_createClass(a,[{key:"login",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){b.$location.path("/home")})["catch"](function(a){b.errors.other=a.message})}}]),a}();angular.module("plyappApp").controller("LoginController",LoginController);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SettingsController=function(){function a(b){_classCallCheck(this,a),this.errors={},this.submitted=!1,this.Auth=b}return a.$inject=["Auth"],_createClass(a,[{key:"changePassword",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.changePassword(this.user.oldPassword,this.user.newPassword).then(function(){b.message="Password successfully changed."})["catch"](function(){a.password.$setValidity("mongoose",!1),b.errors.other="Incorrect password",b.message=""})}}]),a}();angular.module("plyappApp").controller("SettingsController",SettingsController),function(){function a(a,b,c,d,e,f,g){var h=f.safeCb,i={},j=e.userRoles||[];c.get("token")&&"/logout"!==a.path()&&(i=g.get());var k={login:function(a,e){return b.post("/auth/local",{email:a.email,password:a.password}).then(function(a){return c.put("token",a.data.token),i=g.get(),i.$promise}).then(function(a){return h(e)(null,a),a})["catch"](function(a){return k.logout(),h(e)(a.data),d.reject(a.data)})},logout:function(){c.remove("token"),i={}},createUser:function(a,b){return g.save(a,function(d){return c.put("token",d.token),i=g.get(),h(b)(null,a)},function(a){return k.logout(),h(b)(a)}).$promise},changePassword:function(a,b,c){return g.changePassword({id:i._id},{oldPassword:a,newPassword:b},function(){return h(c)(null)},function(a){return h(c)(a)}).$promise},getCurrentUser:function(a){if(0===arguments.length)return i;var b=i.hasOwnProperty("$promise")?i.$promise:i;return d.when(b).then(function(b){return h(a)(b),b},function(){return h(a)({}),{}})},isLoggedIn:function(a){return 0===arguments.length?i.hasOwnProperty("role"):k.getCurrentUser(null).then(function(b){var c=b.hasOwnProperty("role");return h(a)(c),c})},hasRole:function l(a,b){var l=function(a,b){return j.indexOf(a)>=j.indexOf(b)};return arguments.length<2?l(i.role,a):k.getCurrentUser(null).then(function(c){var d=c.hasOwnProperty("role")?l(c.role,a):!1;return h(b)(d),d})},isAdmin:function(){return k.hasRole.apply(k,[].concat.apply(["admin"],arguments))},getToken:function(){return c.get("token")}};return k}a.$inject=["$location","$http","$cookies","$q","appConfig","Util","User"],angular.module("plyappApp.auth").factory("Auth",a)}(),function(){function a(a,b,c,d,e){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&e.isSameOrigin(a.url)&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status&&(d.path("/login"),c.remove("token")),b.reject(a)}}}a.$inject=["$rootScope","$q","$cookies","$location","Util"],angular.module("plyappApp.auth").factory("authInterceptor",a)}(),function(){angular.module("plyappApp.auth").run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){if(d.authenticate){var e="string"==typeof d.authenticate?c.hasRole:c.isLoggedIn;e(1,2).then(function(d){d||(a.preventDefault(),c.isLoggedIn().then(function(a){b.path(a?"/":"/login")}))})}})}])}(),function(){function a(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}a.$inject=["$resource"],angular.module("plyappApp.auth").factory("User",a)}(),angular.module("plyappApp").directive("countUp",function(){return{restrict:"A",require:"ngModel",scope:!0,link:function(a,b,c){var d,e;return e=0,d=4,null!=c.numDecimals&&c.numDecimals>=0&&(e=c.numDecimals),null!=c.animationLength&&c.animationLength>0&&(d=c.animationLength),a.$watch(c.ngModel,function(a,b){return null==b&&(b=0),null!=a&&a!==b?new countUp(c.id,b,a,e,d).start():void 0})}}}),angular.module("plyappApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(a,b){b.addClass("footer")}}}),angular.module("plyappApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}});var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),NavbarController=function(){function a(b,c){_classCallCheck(this,a),this.menu=[{title:"Home",link:"/home"}],this.isCollapsed=!0,this.$location=b,this.isLoggedIn=c.isLoggedIn,this.isAdmin=c.isAdmin,this.getCurrentUser=c.getCurrentUser}return a.$inject=["$location","Auth"],_createClass(a,[{key:"isActive",value:function(a){return a===this.$location.path()}}]),a}();angular.module("plyappApp").controller("NavbarController",NavbarController),angular.module("plyappApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),angular.module("plyappApp").controller("OauthButtonsCtrl",["$window",function(a){this.loginOauth=function(b){a.location.href="/auth/"+b}}]),angular.module("plyappApp").directive("oauthButtons",function(){return{templateUrl:"components/oauth-buttons/oauth-buttons.html",restrict:"EA",controller:"OauthButtonsCtrl",controllerAs:"OauthButtons",scope:{classes:"@"}}}),angular.module("plyappApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SignupController=function(){function a(b,c){_classCallCheck(this,a),this.user={},this.errors={},this.submitted=!1,this.Auth=b,this.$location=c}return a.$inject=["Auth","$location"],_createClass(a,[{key:"register",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){b.$location.path("/")})["catch"](function(c){c=c.data,b.errors={},angular.forEach(c.errors,function(c,d){a[d].$setValidity("mongoose",!1),b.errors[d]=c.message})})}}]),a}();angular.module("plyappApp").controller("SignupController",SignupController),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){return c.hostname===a.hostname&&c.port===a.port&&c.protocol===a.protocol}),d.length>=1}};return b}a.$inject=["$window"],angular.module("plyappApp.util").factory("Util",a)}(),angular.module("plyappApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<header style=background-color:#e74c3c class=hero-unit id=banner><div class=container><img style=width:150px;height:82px src=assets/images/ply4.954388f7.png alt=ply></div></header><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@example.com</code> / <code>test</code></p><p>Admin account is <code>admin@example.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=vm.login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && vm.submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && vm.submitted">Please enter a valid email.</p><p class=help-block>{{ vm.errors.other }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Login</button> <a class="btn btn-default btn-lg btn-register" href=/signup>Sign Up</a></div><hr></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<navbar></navbar><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=vm.user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=vm.user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)">Password must be at least 3 characters.</p></div><div class=form-group><label>Confirm New Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.newPassword ng-minlength=3 required><p class=help-block ng-show="form.confirmPassword.$error.match && vm.submitted">Passwords must match.</p></div><p class=help-block>{{ vm.message }}</p><button class="btn btn-lg btn-primary" type=submit>Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<header style=background-color:#e74c3c class=hero-unit id=banner><div class=container><img style=width:150px;height:82px src=assets/images/ply4.954388f7.png alt=ply></div></header><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.register(form) novalidate><div class=form-group ng-class="{ \'has-success\': form.name.$valid && vm.submitted,\n                                            \'has-error\': form.name.$invalid && vm.submitted }"><label>Name</label><input name=name class=join-input ng-model=vm.user.name required><p class=help-block ng-show="form.name.$error.required && vm.submitted">A name is required</p></div><div class=form-group ng-class="{ \'has-success\': form.email.$valid && vm.submitted,\n                                            \'has-error\': form.email.$invalid && vm.submitted }"><label>Email</label><input type=email name=email class=join-input ng-model=vm.user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && vm.submitted">Doesn\'t look like a valid email.</p><p class=help-block ng-show="form.email.$error.required && vm.submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ vm.errors.email }}</p></div><div class=form-group ng-class="{ \'has-success\': form.password.$valid && vm.submitted,\n                                            \'has-error\': form.password.$invalid && vm.submitted }"><label>Password</label><input type=password name=password class=join-input ng-model=vm.user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && vm.submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.password }}</p></div><div class=form-group ng-class="{ \'has-success\': form.confirmPassword.$valid && vm.submitted,\n                                            \'has-error\': form.confirmPassword.$invalid && vm.submitted }"><label>Confirm Password</label><input type=password name=confirmPassword class=join-input ng-model=vm.user.confirmPassword match=vm.user.password ng-minlength=3 required><p class=help-block ng-show="form.confirmPassword.$error.match && vm.submitted">Passwords must match.</p></div><div><button class="landing-button-sm btn" type=submit>Sign Up <span class=fui-check></span></button> <a class="btn btn-default btn-lg btn-login" href=/login>Login</a></div><hr></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<navbar></navbar><div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=list-group><li class=list-group-item ng-repeat="user in admin.users"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=admin.delete(user) class=trash><span class="glyphicon glyphicon-trash pull-right"></span></a></li></ul></div>'),a.put("app/home/home.html",'<navbar></navbar><div ng-hide=home.isFirstTime() class=container><div class="hero-unit row" id=banner><h2 class=landing-text>Looks like you haven\'t created any Ply\'s yet</h2></div><div class="hero-unit row" id=banner><div class=col-xs-12><button type=button name=button class="landing-button btn">Let\'s get started!</button></div></div></div><div ng-show=home.isFirstTime() class=container><div class="hero-unit row" id=banner><div class=col-xs-6><table class=table><thead><th>name</th><th>Plyrs</th><th>Active?</th><th></th></thead><tbody><tr ng-repeat="ply in home.myplys"><td>{{ply.name}}</td><td>{{ply.plyrs.length}}</td><td>{{ply.activeFlag}}</td><td><button type=button name=button class="landing-button-sm btn">Configure</button></td></tr></tbody></table></div><div class=col-xs-6><div style=margin-top: class=row></div></div></div></div>'),a.put("app/join/join.html",'<navbar ng-show=join.isLoggedIn()></navbar><div class="hero-unit container" id=banner><div ng-hide=join.isLoggedIn() class=row><img style=width:55px;height:27px src=assets/images/ply4.954388f7.png alt=ply></div></div><div class=row><p class=landing-text>Choose a username and then join an active Ply</p></div><div><div class=row><!--<div class="hero-unit row" id="banner">\r\n      <div class="col-xs-12">\r\n        <h6 class="landing-text">You don\'t need to create an account to join a Ply.</h6>\r\n\r\n      </div>\r\n\r\n    </div>\r\n    <div class="landing-text row">\r\n      <div class="col-lg-4 col-lg-offset-4 clearfix">\r\n        <ol>\r\n          <li style="text-align:left;">Choose a username</li>\r\n          <li style="text-align:left;">Enter Ply code</li>\r\n          <li style="text-align:left;">That\'s it!</li>\r\n        </ol>\r\n      </div>\r\n    </div>--><div style=margin-top:1% class="hero-unit row" id=banner><form name=form><button style=margin-bottom:10px class="error btn btn-sm" ng-if=join.error.msg type=button name=button>{{join.error.msg}} <a ng-click=join.clearError()><span class=fui-cross></span></a></button><div ng-hide=join.isLoggedIn() class=col-xs-12><h7 class=landing-text>Your username:</h7><h5 ng-hide=join.usernameSet() class=landing-text><input placeholder=belieber9 ng-model=join.plyAttendee.username class=join-input name=name></h5><button class="error btn btn-lg" ng-show=join.usernameSet() type=button name=button>{{join.$cookies.plyuser}} <a ng-click=join.editUsername()><span class=fui-cross></span></a></button></div><div ng-show=join.isLoggedIn() class=col-xs-12><h7 class=landing-text>Your username:</h7><button class="error btn btn-lg" type=button name=button>{{join.getCurrentUser().email}} <a ng-click=join.editUsername()></a></button></div><div ng-hide=join.isLoggedIn() class=row><div ng-hide=join.usernameSet() class="col-xs-8 col-xs-offset-2"><button ng-click=join.setUsername(join.plyAttendee.username) class="landing-button btn btn-sm" type=button name=button>Set Username</button></div></div></form></div><div class="hero-unit row" id=bannerjoin><div class=col-xs-12><table class=table><header>Active Ply\'s</header><thead><th>Name</th><th>Host</th><th>Plyr\'s</th><th></th></thead><tbody ng-repeat="ply in join.awesomeThings"><tr><td>{{ply.name}}</td><td>{{ply.admin}}</td><td>{{ply.plyrs.length}}</td><td><button ng-hide=join.isPlyr($index) type=submit ng-click=join.addPlyr(ply._id) class="landing-button-sm btn">Join <span class=fui-check></span></button> <button ng-show=join.isPlyr($index) type=submit class="landing-button-join btn">Joined <span style=color:#2ecc71 class=fui-check></span></button></td></tr></tbody></table></div></div></div></div>'),a.put("app/main/main.html",'<div id=container><header style=background-color:#e74c3c class=hero-unit id=banner><div class=container><img style=width:150px;height:82px src=assets/images/ply4.954388f7.png alt=ply><hr></div></header><div class=container><div class="hero-unit row" id=banner><div class="col-xs-8 col-xs-offset-2"><a href=/join style=text-align:center type=button name=button class="landing-button btn btn-lg btn-default">Join a Live Ply</a></div></div><div id=banner><div class=col-xs-12><p class=landing-text>Want to create and manage your own live Ply\'s? Create an account <b><a href=/signup style=text-align:center class=landing-link>here</a></b></p></div><div class=row><div class=col-xs-12><p class=landing-text>Have an account? Welcome back :) <b><a href=/login class=landing-link>Log In</a></b></p></div></div></div></div><div style=height:400px id=infoi class=row><div class=col-xs-12><h3 class="building1 landing-text"><i class="fa fa-anchor"></i></h3></div></div></div>'),a.put("app/ply/ply.html","<div>This is the ply view.</div>"),a.put("components/footer/footer.html",'<div class=container><p>Angular Fullstack v3.0.2 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div>'),a.put("components/navbar/navbar.html",'<div style=background-color:#e74c3c class="navbar navbar-default navbar-static-top" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="nav.isCollapsed = !nav.isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand><img style=width:55px;height:27px src=assets/images/ply4.954388f7.png alt=ply></a></div><div collapse=nav.isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in nav.menu" ng-class="{active: nav.isActive(item.link)}"><a style=color:#fff style=color:#fff ng-href={{item.link}}>{{item.title}}</a></li><li ng-show=nav.isAdmin() ng-class="{active: nav.isActive(\'/admin\')}"><a style=color:#fff href=/admin>Admin</a></li><li ng-class="{active: nav.isActive(\'/join\')}"><a style=color:#fff href=/join>Join a <b>Ply</b></a></li></ul><ul class="nav navbar-nav navbar-right"><li ng-hide=nav.isLoggedIn() ng-class="{active: nav.isActive(\'/signup\')}"><a style=color:#fff href=/signup>Sign up</a></li><li ng-hide=nav.isLoggedIn() ng-class="{active: nav.isActive(\'/login\')}"><a style=color:#fff href=/login>Login</a></li><li ng-show=nav.isLoggedIn()><p style=color:#fff class=navbar-text>Hello {{ nav.getCurrentUser().name }}</p></li><li ng-show=nav.isLoggedIn() ng-class="{active: nav.isActive(\'/settings\')}"><a style=color:#fff href=/settings><span class="glyphicon glyphicon-cog"></span></a></li><li ng-show=nav.isLoggedIn()><a style=color:#fff href=/logout>Logout</a></li></ul></div></div></div>'),a.put("components/oauth-buttons/oauth-buttons.html",'<a ng-class=classes ng-click="OauthButtons.loginOauth(\'google\')" class="btn btn-social btn-google"><i class="fa fa-google-plus"></i> Connect with Google+</a>')}]);