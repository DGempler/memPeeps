(function() {
  angular.module('knowYourCircle.groups')
    .controller('shareGroupsController', shareGroupsController);

    shareGroupsController.$inject = ['$uibModalInstance', 'groups', 'size', 'ShareFactory', 'AuthFactory'];

    function shareGroupsController($uibModalInstance, groups, size, ShareFactory, AuthFactory) {
      var vm = this;
      vm.groups = groups;
      vm.selected = {};

      if (size !== 'sm') {
        vm.mediumSize = true;
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.selectGroup = function(id) {
        if (vm.selected[id]) {
          delete vm.selected[id];
        } else {
          vm.selected[id] = true;
        }
      };

      vm.send = function() {
        var payload = {};
        // payload.user = {};
        var selected = Object.keys(vm.selected);

        if (selected.length === 0) {
          // DO SOMETHING!!!!
        }

        payload.email = vm.email;
        payload.group_ids = selected;

        ShareFactory.share(payload)
          .then(function(success) {
            var message = 'The people in your selected groups have been sent to ' + vm.email;
            AuthFactory.messageModalOpen(message);
          })
          .catch(function(error) {
            var message = 'There was an error while sharing the people in your selected groups. Please try again.';
            AuthFactory.messageModalOpen(message);
          });
      };

    }

})();