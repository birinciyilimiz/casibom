'use strict';

app
  .controller('VirtualBettingCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$sce',
    'Auth',
    'Casino',
    '$window',
    '$translate',

  function($scope, $rootScope, $timeout, $state, $stateParams, $ionicLoading, $sce, Auth, Casino, $window, $translate) {

    $scope.height = $window.innerHeight + 100;

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    $scope.games              = {};
    $scope.search             = '';
    $scope.order              = true;
    $scope.game               = {};

    $scope.getVirtualBetting  = function() {
      Casino.getVirtualBetting(function(data) {
        $scope.games = data.list;

        $ionicLoading.hide();
      })
    };


    if($state.current.name === 'app.virtual-betting') {
      $scope.getVirtualBetting();
    }

    if($state.current.name === 'app.join-virtual-betting') {
      $scope.status = false;

      Casino.joinVirtualBetting($state.params.id, function(data) {

        $ionicLoading.hide();

        if(data.type === 'fail') {
          $rootScope.showAlert($translate.instant('global.notice'), data.message, 3000);
          $state.go('app.virtual-betting');
        } else {
          $scope.status = true;

          $scope.game = $sce.trustAsResourceUrl(data.game);

          if($scope.game !== '') {
            $window.location.replace($scope.game);
          }
        }
      })
    }

  }]);