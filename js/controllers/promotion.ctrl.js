'use strict';

app
  .controller('PromotionCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicPopup',
    '$ionicModal',
    '$sce',
    'Auth',
    'Promotion',
    '$translate',

  function($scope, $rootScope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, $ionicModal, $sce, Auth, Promotion, $translate) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    $scope.promotions   = {};
    $scope.activePromo  = {};
    $scope.joinButton   = false;
    $rootScope.bonus_code   = '';

    Promotion.get(function(data) {
      $ionicLoading.hide();
      $scope.promotions = data;
    });

    // Join Promotion
    $scope.join = function(id, bonus_code) {
      $rootScope.joinButton = true;
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Promotion.join({ id : id, bonus_code : bonus_code }, function (data) {
        $scope.showAlert('Bonus', data.text, 3000);
        $rootScope.joinButton = false;
        $ionicLoading.hide();
      });
    };

    // Promotion Modal
    $ionicModal.fromTemplateUrl('promotion.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(promo) {
      $scope.activePromo = promo;
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $rootScope.login();
    };

  }]);