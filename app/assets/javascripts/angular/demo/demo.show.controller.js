(function() {
  angular.module('knowYourCircle.demo')
    .controller('demoShowController', demoShowController);

  demoShowController.$inject = ['$routeParams', 'DemoFactory', 'Message'];

  function demoShowController($routeParams, DemoFactory, Message) {
    var vm = this;
    vm.demoMode = true;
    vm.busy = true;

    DemoFactory.getGuestUserPerson($routeParams.id)
      .then(function(person) {
        vm.person = person;
        if (vm.person.dob === 'null' || vm.person.dob === null) {
          vm.person.dob = "";
        } else {
          vm.person.dob = moment(vm.person.dob).format("MMM Do YYYY");
        }
      })
      .catch(function(error) {
        var message = 'An error occured while loading your person. Please refresh the page to try again.';
        Message.open(message);
      })
      .finally(function() {
        vm.busy = false;
      });
  }
})();