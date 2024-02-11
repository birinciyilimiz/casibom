'use strict';

app
  .controller('BonusCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$ionicLoading',
    '$ionicPopup',
    'ionicDatePicker',
    'Auth',
    'Transactions',

    function($scope, $rootScope, $timeout, $state, $ionicLoading, $ionicPopup, ionicDatePicker, Auth, Transactions) {

      // Auth Control
      $timeout(function() {
        $ionicLoading.hide();
        if($rootScope.auth === null && $state.current.name === 'app.discount') {
          $state.go('app.main');
        }
      }, 1000);

      $scope.data         = [];
      $rootScope.discountType = '';

      if($rootScope.auth !== null) {
        $rootScope.discountType = $rootScope.auth.hasOwnProperty('wallet') ? $rootScope.auth.wallet.discount_period.toString() : '';
      }

      $scope.getBonus = function() {
        $ionicLoading.show();

        Transactions.getBonus(function(result) {
          $ionicLoading.hide();
          $scope.data = result;
        });
      };

      $scope.getBonus();

      $scope.setDiscountType = function() {
        $ionicLoading.show();

        Transactions.setDiscountType({"type" : $rootScope.discountType},function(data) {
          $ionicLoading.hide();
          $rootScope.showAlert('UyarÄ±', data.text, 3000);
        });
      }
    }]);