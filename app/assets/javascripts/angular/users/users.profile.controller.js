(function() {
  angular.module('knowYourCircle.users')
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', 'Message', 'AuthFactory', '$location', 'Message'];

function profileController($rootScope, Message, AuthFactory, $location, Message) {
    var vm = this;
    vm.user = {};

    function copyUser() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
      if ($rootScope.user.dob === 'null' || $rootScope.user.dob === null) {
        vm.user.dob = "";
      } else {
        vm.user.dob = moment($rootScope.user.dob).format("MMM Do YYYY");
      }
    }

    vm.deleteUser = function() {
      var message = "Are you sure you want to delete your account and your whole circle?";
      Message.confirmOpen(message)
        .then(function() {
          vm.busy = true;
          AuthFactory.deleteUser()
            .then(function() {
              $location.path('/');
              var message = 'Your account has been successfully deleted.';
              Message.open(message);
            })
            .catch(function() {
              var message = 'An error occured while trying to delete your account. Please try again.';
              Message.open(message);
            })
            .finally(function() {
              vm.busy = false;
            });
        });
    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    copyUser();

  }

})();