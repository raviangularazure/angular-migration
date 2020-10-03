!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="/",__webpack_require__(__webpack_require__.s=0)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(6),__webpack_require__(8),__webpack_require__(10),__webpack_require__(12),__webpack_require__(14),__webpack_require__(15),__webpack_require__(17),__webpack_require__(18),__webpack_require__(20),__webpack_require__(21),__webpack_require__(22),__webpack_require__(23),__webpack_require__(25),__webpack_require__(27),__webpack_require__(29),__webpack_require__(30),__webpack_require__(31),__webpack_require__(33),__webpack_require__(35),__webpack_require__(37),__webpack_require__(38),__webpack_require__(39)},function(module,exports){!function(){var toastrModule=angular.module("toastr",[]);toastr.options.timeOut=1e3,toastrModule.value("toastr",toastr)}()},function(module,exports){var app=angular.module("app",["ngRoute","toastr"]);app.run(function($rootScope,$location){$rootScope.$on("$routeChangeError",function(e,next,prev,err){"AUTH_REQUIRED"===err&&$location.path("/login"),"NOT_AUTHORIZED"===err&&$location.path("/home")})}),app.config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("")}])},function(module,exports){angular.module("app").config(function($routeProvider){var routeResolvers={loggedIn:function(auth){return auth.requireLogin()},waitForAuth:function(auth){return auth.waitForAuth()},requireAdmin:function(auth){return auth.requireAdmin()},userSessions:function(sessions,currentIdentity,auth){return auth.requireLogin().then(function(){return sessions.getSessionsByUser(currentIdentity.currentUser.id)})},allSessions:function(sessions,auth){return auth.requireLogin().then(function(){return sessions.getAllSessions()})},allUsers:function(users,auth){return auth.requireLogin().then(function(){return users.getAllUsers()})}};$routeProvider.when("/admin/login",{template:"<admin-login></admin-login>",resolve:{currentAuth:routeResolvers.waitForAuth}}).when("/admin/results",{template:'<results all-sessions="$resolve.allSessions"></results>',resolve:{admin:routeResolvers.requireAdmin,allSessions:routeResolvers.allSessions}}).when("/admin/users/:id",{template:'<user-details all-users="$resolve.allUsers"></user-details>',resolve:{admin:routeResolvers.requireAdmin,allUsers:routeResolvers.allUsers}}).when("/users",{template:'<user-list all-users="$resolve.allUsers"></user-list>',resolve:{admin:routeResolvers.requireAdmin,allUsers:routeResolvers.allUsers}}).when("/admin/createusers",{template:"<create-users></create-users>",resolve:{admin:routeResolvers.requireAdmin}}).when("/home",{template:'<home user-sessions="$resolve.userSessions"></home>',resolve:{login:routeResolvers.loggedIn,userSessions:routeResolvers.userSessions}}).when("/profile",{template:"<profile></profile>",resolve:{userProfile:routeResolvers.loggedIn}}).when("/createsession",{template:'<create-new-session user-sessions="$resolve.userSessions"></create-new-user>',resolve:{userSessions:routeResolvers.userSessions}}).when("/login",{template:"<login></login>",resolve:{currentAuth:routeResolvers.waitForAuth}}).when("/logout",{template:"<logout></logout>"}).otherwise("/home")})},function(module,exports,__webpack_require__){angular.module("app").component("adminLogin",{template:__webpack_require__(5),bindings:{},controller:function($location,currentIdentity,auth,toastr){this.loggedIn=currentIdentity.authenticated(),this.loggedIn&&$location.path("/home"),this.login=function(){auth.login({username:this.email,password:this.password}).then(function(){$location.path("/home")},function(err){toastr.error(err)})}}})},function(module,exports){module.exports='<h1>Admin Login</h1>\r\n\r\n<form class="form">\r\n  <div class="row">\r\n  <div class="form-group col-sm-6">\r\n    <input type="text" autofocus placeholder="Email Address" ng-model="$ctrl.email" class="form-control">\r\n  </div>\r\n  </div>\r\n  <div class="row">\r\n  <div class="form-group col-sm-6">\r\n    <input type="password" placeholder="Password" ng-model="$ctrl.password" class="form-control">\r\n  </div>\r\n  </div>\r\n  <div class="row">\r\n    <div class="col-sm-6">\r\n    <button class="btn btn-primary" ng-click="$ctrl.login()">Login</button>\r\n    </div>\r\n  </div>\r\n</form>'},function(module,exports,__webpack_require__){angular.module("app").component("results",{template:__webpack_require__(7),bindings:{sessionsByVoteDesc:"=allSessions"},controller:function(){this.$onInit=function(){this.sessionsByVoteDesc.sort(function(session1,session2){return session2.voteCount-session1.voteCount})}}})},function(module,exports){module.exports='<nav></nav>\r\n<h1>Results</h1>\r\n\r\n<session-detail-with-votes session="session" ng-repeat="session in $ctrl.sessionsByVoteDesc"></session-detail-with-votes>\r\n\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("createUsers",{template:__webpack_require__(9),bindings:{},controller:function(nameParser,users,toastr){this.import=function(){nameParser.parse(this.namesblob).forEach(function(person){users.createNewUser({email:person.email,password:"pass",firstName:person.firstName,lastName:person.lastName}).catch(function(error){toastr.error("User already exists: "+person.email)}.bind(this))}.bind(this)),toastr.success("Users Created!")}}})},function(module,exports){module.exports='<nav></nav>\r\n\r\n<h1>Create Users</h1>\r\n<p>Enter Email Addresses here. One on each line, First and Last Name Pipe Separated</p>\r\n<textarea name="emailAddresses" id="" cols="30" rows="10" class="form-control" \r\n  placeholder="Email Addresses" ng-model="$ctrl.namesblob"></textarea>\r\n<br>\r\n<button class="btn btn-primary" ng-click="$ctrl.import()">Create Users</button>\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("userList",{template:__webpack_require__(11),bindings:{users:"=allUsers"},controller:function(){this.$onInit=function(){this.users.sort(function(user1,user2){return user1.firstName<user2.firstName?-1:user1.firstName===user2.firstName?0:user1.firstName>user2.firstName?1:void 0})}}})},function(module,exports){module.exports='<nav></nav>\r\n<h1>User List</h1>\r\n\r\n<a ng-href="#/admin/users/{{user.id}}" zoom-in \r\n  class="btn btn-primary btn-spaced" \r\n  ng-repeat="user in $ctrl.users">\r\n  {{user.firstName}}\r\n  {{user.lastName}}\r\n</a>\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("userDetails",{template:__webpack_require__(13),bindings:{allUsers:"="},controller:function($routeParams){this.$onInit=function(){this.user=this.allUsers.find(function(user){return user.id===parseInt($routeParams.id)})}}})},function(module,exports){module.exports='<nav></nav>\r\n<div class="jumbotron">\r\n  <h1>{{$ctrl.user.firstName}} {{$ctrl.user.lastName}}\r\n    <span class="badge" ng-show="$ctrl.user.isAdmin">Admin</span>\r\n  </h1>\r\n  <p>{{$ctrl.user.email}}</p>\r\n</div>'},function(module,exports){angular.module("app").service("nameParser",function(){function NameParser(){}return NameParser.prototype.parse=function(blobInput){var lines=blobInput.split(/\r?\n/);return lines.forEach(function(line,idx){var pieces=line.split("|");lines[idx]={email:pieces[0],firstName:pieces[1],lastName:pieces[2]}}),lines},NameParser}())},function(module,exports,__webpack_require__){angular.module("app").component("nav",{template:__webpack_require__(16),bindings:{},controller:function(currentIdentity,sessions,unreviewedSessionCount){this.currentUser=currentIdentity.currentUser,unreviewedSessionCount.updateUnreviewedSessionCount(),this.unreviewedSessionCount=unreviewedSessionCount}})},function(module,exports){module.exports='<div \r\n  class="navbar navbar-fixed-top navbar-inverse">\r\n  <div class="container">\r\n    <div class="navbar-header"><a href="/" class="navbar-brand">Lightning Talks</a></div>\r\n    <div class="navbar-collapse collapse">\r\n      <ul class="nav navbar-nav">\r\n        <li><a href="#/">Home <span class="badge">{{$ctrl.unreviewedSessionCount.value}}</span> </a></li>\r\n        <li><a href="#/createsession">Create Session</a></li>\r\n        <li><a href="#/profile">Profile</a></li>\r\n        <li><a href="#/admin/createusers" ng-show="$ctrl.currentUser.isAdmin">Create Users</a></li>\r\n        <li><a href="#/admin/results" ng-show="$ctrl.currentUser.isAdmin">Results</a></li>\r\n        <li><a href="#/users" ng-show="$ctrl.currentUser.isAdmin">Users</a></li>\r\n        <li><a href="#/logout">Logout</a></li>\r\n      </ul>\r\n      \r\n      <ul class="nav navbar-right navbar nav">\r\n        <li class="navbar-text">\r\n          Welcome {{$ctrl.currentUser.firstName}} {{$ctrl.currentUser.lastName}}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n'},function(module,exports){angular.module("app").component("logout",{controller:function($location,auth){auth.logout(),$location.path("/login")}})},function(module,exports,__webpack_require__){angular.module("app").component("login",{template:__webpack_require__(19),bindings:{},controller:function(){function LoginCtrl($location,currentIdentity,auth,toastr){this.$location=$location,this.auth=auth,this.toastr=toastr,currentIdentity.authenticated()&&$location.path("/home")}return LoginCtrl.prototype.login=function(){var _this=this;this.auth.login({username:this.email,password:"pass"}).then(function(){_this.$location.path("/home")},function(err){_this.toastr.error(err)})},LoginCtrl}()})},function(module,exports){module.exports='<h1>Please Login</h1>\r\n\r\n<p>Enter your attendee email address</p>\r\n<form class="form">\r\n  <div class="row">\r\n    <div class="form-group col-sm-6">\r\n      <input type="text" autofocus placeholder="Email Address" ng-model="$ctrl.email" class="form-control">\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <div class="col-sm-6">\r\n      <button class="btn btn-primary" ng-click="$ctrl.login()">Login</button>\r\n    </div>\r\n  </div>\r\n</form>'},function(module,exports){angular.module("app").service("auth",function(){function Auth($q,$http,currentIdentity){this.$q=$q,this.$http=$http,this.currentIdentity=currentIdentity}return Auth.prototype.login=function(credentials){var _this=this,dfd=this.$q.defer();return this.$http.post("/api/login",credentials).then(function(response){_this.currentIdentity.setUser(response.data.user),dfd.resolve()},function(response){dfd.reject("Invalid Credentials")}),dfd.promise},Auth.prototype.logout=function(){var _this=this,dfd=this.$q.defer();return this.$http.post("/api/logout").then(function(response){_this.currentIdentity.clearUser(),dfd.resolve()},function(response){dfd.reject("Error Logging Out")}),dfd.promise},Auth.prototype.waitForAuth=function(){var _this=this,dfd=this.$q.defer();return this.$http.get("/api/currentIdentity").then(function(response){response.data&&_this.currentIdentity.setUser(response.data),dfd.resolve(_this.currentIdentity)}),dfd.promise},Auth.prototype.requireLogin=function(){var _this=this;return this.waitForAuth().then(function(){return!!_this.currentIdentity.authenticated()||_this.$q.reject("AUTH_REQUIRED")})},Auth.prototype.requireAdmin=function(){var _this=this;return this.waitForAuth().then(function(){return!(!_this.currentIdentity.authenticated()||!_this.currentIdentity.currentUser.isAdmin)||_this.$q.reject("AUTH_REQUIRED")})},Auth}())},function(module,exports){angular.module("app").service("currentIdentity",function(){function CurrentIdentity($http,$q){this.$http=$http,this.$q=$q,this.currentUser=null}return CurrentIdentity.prototype.setUser=function(user){this.currentUser=user},CurrentIdentity.prototype.clearUser=function(){this.currentUser=null},CurrentIdentity.prototype.authenticated=function(){return!!this.currentUser},CurrentIdentity.prototype.updateUser=function(newUserObj){var _this=this,dfd=this.$q.defer();return this.$http.put("/api/users/"+this.currentUser.id,newUserObj).then(function(response){_this.currentUser.firstName=newUserObj.firstName,_this.currentUser.lastName=newUserObj.lastName,dfd.resolve()},function(response){dfd.reject("Error Logging Out")}),dfd.promise},CurrentIdentity}())},function(module,exports){angular.module("app").service("users",function(){function Users($http,$q){this.$http=$http,this.$q=$q}return Users.prototype.createNewUser=function(newUser){return this.$http.post("/api/users",newUser)},Users.prototype.getAllUsers=function(){var dfd=this.$q.defer();return this.$http.get("/api/users").then(function(response){dfd.resolve(response.data)}),dfd.promise},Users}())},function(module,exports,__webpack_require__){angular.module("app").component("home",{template:__webpack_require__(24),bindings:{userSessions:"="},controller:function(currentIdentity,sessions,toastr,unreviewedSessionCount){this.currentUser=currentIdentity.currentUser,this.setNextSessionToReview=function(){var _this=this;sessions.getNextUnreviewedSession(currentIdentity.currentUser.id).then(function(response){_this.currentSessionToReview=response.data})},this.setNextSessionToReview(),this.voteYes=function(){var _this=this;sessions.incrementVote(this.currentSessionToReview.id).then(function(){return sessions.addReviewedSession(_this.currentUser.id,_this.currentSessionToReview.id)}).then(function(){this.setNextSessionToReview(),unreviewedSessionCount.updateUnreviewedSessionCount()}.bind(this))},this.voteNo=function(){sessions.addReviewedSession(this.currentUser.id,this.currentSessionToReview.id).then(function(){this.setNextSessionToReview(),unreviewedSessionCount.updateUnreviewedSessionCount()}.bind(this))}}})},function(module,exports){module.exports='<nav></nav>\r\n\r\n<h2 style="margin-top:30px">Unreviewed Sessions</h2>\r\n<unreviewed-talk session="$ctrl.currentSessionToReview" vote-no="$ctrl.voteNo()" vote-yes="$ctrl.voteYes()"></unreviewed-talk>\r\n<hr style="margin-top:20px">\r\n<h3>Your Sessions\r\n<a zoom-in class="btn btn-primary btn-xs" href="#/createsession">Create a New Session</a>\r\n</h3>\r\n\r\n<div ng-repeat="session in $ctrl.userSessions">\r\n  <session-detail session="session" initial-collapsed="true"></session-detail>\r\n</div>\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("createNewSession",{template:__webpack_require__(26),bindings:{userSessions:"="},controller:function(toastr,currentIdentity,sessions){this.create=function(){var newUserSession={title:this.title,length:parseInt(this.length),abstract:this.abstract,userFirstName:currentIdentity.currentUser.firstName,userLastName:currentIdentity.currentUser.lastName,userId:currentIdentity.currentUser.id};sessions.createNewSession(newUserSession).then(function(response){this.userSessions.push(response.data)}.bind(this))}}})},function(module,exports){module.exports='<nav></nav>\r\n\r\n<h1>Create New Session</h1>\r\n\r\n<form class="form">\r\n  <div class="form-group">\r\n    Give your session a title\r\n    <input required type="text" placeholder="Title" ng-model="$ctrl.title" class="form-control">\r\n  </div>\r\n  <div class="form-group">\r\n    Enter a length, from 2 minutes to 30 minutes\r\n    <input required type="number" placeholder="Length in Minutes" \r\n      ng-model="$ctrl.length" class="form-control" min="2" max="30">\r\n  </div>\r\n  <div class="form-group">\r\n    Describe your session\r\n    <textarea required name="" id="" cols="30" rows="4" \r\n      ng-model="$ctrl.abstract" class="form-control"\r\n      placeholder="Abstract"></textarea>\r\n  </div>\r\n  \r\n  <div class="row">\r\n    <div class="col-sm-3">\r\n      <button class=" btn btn-primary btn-sm" ng-click="$ctrl.create()">Create</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<h2>Your Other Sessions</h2>\r\n<div ng-repeat="session in $ctrl.userSessions">\r\n  <session-detail session="session" initial-collapsed="false"></session-detail>\r\n</div>'},function(module,exports,__webpack_require__){angular.module("app").component("unreviewedTalk",{template:__webpack_require__(28),bindings:{session:"=",voteYes:"&",voteNo:"&"},controller:function(){this.yes=function(){this.voteYes()},this.no=function(){this.voteNo()}}})},function(module,exports){module.exports='<div ng-show="!!$ctrl.session">\r\n  <div  class="panel panel-default">\r\n    <div class="panel-heading">\r\n      {{$ctrl.session.title}}\r\n    </div>\r\n    <div class="panel-body">\r\n      <p><strong>{{$ctrl.session.length | talkDuration}}</strong></p>\r\n      <p>{{$ctrl.session.abstract}}</p>\r\n    </div>\r\n  </div>\r\n\r\n  <span>Are you interested in this session?</span>\r\n  <button class="btn btn-primary btn-xs" ng-click="$ctrl.yes()">Yes</button>\r\n  <button class="btn btn-warning btn-xs" ng-click="$ctrl.no()">No</button>\r\n</div>\r\n<div ng-show="!$ctrl.session" class="alert alert-success" role="alert"> \r\n  You have reviewed all the submitted sessions\r\n</div>'},function(module,exports){angular.module("app").service("sessions",function(){function Sessions($http,$q){this.$http=$http,this.$q=$q}return Sessions.prototype.getSessionsByUser=function(userId){var dfd=this.$q.defer();return this.$http.get("/api/sessions/user/"+userId).then(function(response){dfd.resolve(response.data)},function(){dfd.reject()}),dfd.promise},Sessions.prototype.getAllSessions=function(){var dfd=this.$q.defer();return this.$http.get("/api/sessions").then(function(response){dfd.resolve(response.data)},function(){dfd.reject()}),dfd.promise},Sessions.prototype.createNewSession=function(newSession){return this.$http.post("/api/sessions",newSession)},Sessions.prototype.getNextUnreviewedSession=function(userId){return this.$http.get("/api/users/"+userId+"/randomUnreviewedSession")},Sessions.prototype.addReviewedSession=function(userId,sessionId){return this.$http.post("/api/users/"+userId+"/reviewSession/"+sessionId)},Sessions.prototype.incrementVote=function(sessionId){return this.$http.put("/api/sessions/"+sessionId+"/incrementVote/")},Sessions.prototype.getUnreviewedCount=function(userId){return this.$http.get("/api/users/"+userId+"/unreviewedSessionCount")},Sessions}())},function(module,exports){angular.module("app").service("unreviewedSessionCount",function(){function UnreviewedSessionCount(sessions,currentIdentity){this.value=0,this.sessions=sessions,this.currentIdentity=currentIdentity}return UnreviewedSessionCount.prototype.updateUnreviewedSessionCount=function(){var _this=this;this.sessions.getUnreviewedCount(this.currentIdentity.currentUser.id).then(function(response){_this.value=response.data.count})},UnreviewedSessionCount}())},function(module,exports,__webpack_require__){angular.module("app").component("sessionDetail",{template:__webpack_require__(32),bindings:{session:"=",initialCollapsed:"@"},controller:function(){}})},function(module,exports){module.exports='<detail-panel collapsed="{{$ctrl.initialCollapsed}}" title="{{$ctrl.session.title}}">\r\n  <strong>{{$ctrl.session.length | talkDuration}}</strong>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("sessionDetailWithVotes",{template:__webpack_require__(34),bindings:{session:"=",initialCollapsed:"@"},controller:function(){}})},function(module,exports){module.exports='<detail-panel collapsed="{{$ctrl.initialCollapsed}}" title="{{$ctrl.session.title}}">\r\n  <strong>{{$ctrl.session.voteCount}} votes</strong>\r\n  <p>{{$ctrl.session.length | talkDuration}}</p>\r\n  <p><small>{{$ctrl.session.abstract}}</small></p>  \r\n</detail-panel>\r\n'},function(module,exports,__webpack_require__){angular.module("app").component("detailPanel",{transclude:!0,template:__webpack_require__(36),bindings:{title:"@",initialCollapsed:"@collapsed"},controller:function(){this.collapsed="true"===this.initialCollapsed,this.collapse=function(){this.collapsed=!this.collapsed}}})},function(module,exports){module.exports='<div class="panel panel-primary">\r\n  <div class="panel-heading pointable" ng-click="$ctrl.collapse()">\r\n    <span>{{$ctrl.title}}</span>\r\n  </div>\r\n  <div class="panel-body" ng-hide="$ctrl.collapsed" ng-transclude>\r\n  </div>\r\n</div>'},function(module,exports){angular.module("app").filter("talkDuration",function(){return function(duration){return"Duration: "+duration+" minutes"}})},function(module,exports){angular.module("app").directive("zoomIn",function(){return{restrict:"A",link:function(scope,el,attrs){el.on("mouseenter",function(){el[0].style.transform="scale(1.1,1.1)"}),el.on("mouseleave",function(){el[0].style.transform="scale(1,1)"})}}})},function(module,exports,__webpack_require__){angular.module("app").component("profile",{template:__webpack_require__(40),controller:function($location,toastr,currentIdentity){this.profile=angular.copy(currentIdentity.currentUser),this.save=function(){currentIdentity.updateUser(this.profile),toastr.success("Profile Saved!")},this.cancel=function(){$location.path("/home")}}})},function(module,exports){module.exports='<nav></nav>\r\n\r\n<h1>User Profile</h1>\r\n\r\n<form class="form-inline">\r\n  <label for="firstName">First Name</label>\r\n  <input type="text" id="firstName" placeholder="First Name"\r\n    class="form-control" ng-model="$ctrl.profile.firstName">\r\n    \r\n  <label for="lastName">Last Name</label>\r\n  <input type="text" id="lastName" placeholder="Last Name"\r\n    class="form-control" ng-model="$ctrl.profile.lastName">\r\n  \r\n  <br><br>\r\n  <button class="btn btn-primary btn-sm" ng-click="$ctrl.save()">Save</button>\r\n  <button class="btn btn-warning btn-sm" ng-click="$ctrl.cancel()">Cancel</button>\r\n</form>'}]);