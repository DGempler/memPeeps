(function() {
  angular.module('knowYourCircle.share')
    .controller('shareSelectedController', shareSelectedController);

    shareSelectedController.$inject = ['$uibModalInstance', 'people', 'size', 'Share', 'Message', '$rootScope'];

    function shareSelectedController($uibModalInstance, people, size, Share, Message, $rootScope) {
      var vm = this;
      vm.people = people;

      if (size !== 'sm') {
        vm.mediumSize = true;
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.send = function() {
        if (vm.email.toLowerCase() === $rootScope.user.email) {
          vm.emailsMatch = true;
          return;
        } else {
          vm.emailsMatch = false;
        }

        vm.busy = true;
        var payload = {};
        payload.people_ids = [];
        vm.people.forEach(function(person) {
          payload.people_ids.push(person.id);
        });

        payload.email = vm.email;

        Share.share(payload)
          .then(function(success) {
            var message = 'Your selected people have been sent to ' + vm.email;
            Message.open(message);
            vm.email = "";
          })
          .catch(function(error) {
            var message;
            if (error.data.error) {
              message = error.data.error;
            } else {
              message = 'There was an error while sharing your people. Please try again.';
            }
            Message.open(message);
          })
          .finally(function() {
            vm.busy = false;
          });
      };

    }

})();