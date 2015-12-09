(function() {
  angular.module('memPeeps.auth')
    .controller('navController', navController);

  navController.$inject = ['$uibModal', '$auth', 'AuthFactory'];

  function navController($uibModal, $auth) {
    var vm = this;

    vm.logInOpen = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_login_modal.html',
        controller: 'loginController as auth',
        size: 'sm'
      });

    };

    vm.signUpOpen = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_signup_modal.html',
        controller: 'signupController as auth',
        size: 'sm'
      });
    };

    vm.logOut = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    AuthFactory.logInOpen = function() {
      vm.logInOpen();
    };

    AuthFactory.signUpOpen = function() {
      vm.signUpOpen();
    }

  }


})();