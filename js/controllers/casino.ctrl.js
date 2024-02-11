'use strict';

app
  .controller('CasinoCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$sce',
    'Auth',
    'Casino',
    '$window',
    '$translate',
    '$cookies',

  function($scope, $rootScope, $location, $timeout, $state, $stateParams, $ionicLoading, $sce, Auth, Casino, $window, $translate, $cookies) {

    $scope.height = $window.innerHeight + 100;

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    $scope.games              = {};
    $scope.search             = '';
    $scope.order              = true;
    $scope.game               = {};
    $rootScope.liveProvider   = 'em';
    $rootScope.slotProvider   = 'pragmaticplay';

    if(typeof $location.search().provider !== "undefined") {
      $rootScope.liveProvider   = $location.search().provider;
      $rootScope.slotProvider   = $location.search().provider;

      $cookies.put('slotProvider', $rootScope.slotProvider);
      $cookies.put('liveProvider', $rootScope.liveProvider);
    }

    var liveProvider          = $cookies.get('liveProvider');
    var slotProvider          = $cookies.get('slotProvider');

    if(typeof liveProvider !== 'undefined')
      $rootScope.liveProvider = liveProvider;

    if(typeof slotProvider !== 'undefined')
      $rootScope.slotProvider = slotProvider;

    $scope.changeProvider     = function(type) {
      $scope.games = {};

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      if(type === 'live') {
        if($rootScope.liveProvider !== 'xpro') {
          $cookies.put('liveProvider', $rootScope.liveProvider);
        }

        $scope.getLiveGames();
      }

      if(type === 'slot') {


        $cookies.put('slotProvider', $rootScope.slotProvider);
        $scope.getSlotGames();
      }
    };

    $scope.getLiveGames       = function() {
      if(
        $rootScope.liveProvider === 'em'
      ) {

        Casino.getLive(function (data) {
          $ionicLoading.hide();
          $scope.games = data;
        });

      }
      else if($rootScope.liveProvider === 'ezugi') {
        Casino.getEzugiLive(function (data) {
          $ionicLoading.hide();
          $scope.games = data.tables;
        });
      }

      else if($rootScope.liveProvider === 'xpro') {
        $ionicLoading.hide();
        $state.go('app.xpro');
      }

      else {

        Casino.getLuckyStreakLive(function (data) {
          $ionicLoading.hide();
          $scope.games = data;
        });

      }
    };

    $scope.getSlotGames       = function() {
      var slotProvider = $rootScope.slotProvider;
      if(slotProvider.indexOf(':') !== -1) {

        Casino.getSlot({vendor : slotProvider.replace('em:', '')}, function (data) {
          $ionicLoading.hide();
          $scope.games = data;
        });

      } else {

        if (slotProvider === 'pragmaticplay') {
          Casino.getPragmaticPlaySlot(function (data) {
            $ionicLoading.hide();
            $scope.games = data;
          });
        } else {
          Casino.getLuckyStreakSlot($rootScope.slotProvider, function (data) {
            $ionicLoading.hide();
            $scope.games = data;
          });
        } 
      }
    };


    if($state.current.name === 'app.casino') {
      $scope.getLiveGames();
    }

    if($state.current.name === 'app.slot') {
      $scope.getSlotGames();
    }

    if($state.current.name === 'app.join-live-casino') {

      $scope.status = false;
      $scope.data   = {};

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      if($rootScope.liveProvider === 'em')
        Casino.joinLive($stateParams.id, function (data) {
          $scope.data = data;
          $ionicLoading.hide();
          $scope.goLive();
        });

      else if($rootScope.liveProvider === 'ezugi')
        Casino.joinEzugiLive($stateParams.id, function(data) {
          $scope.data = data;
          $ionicLoading.hide();
          $scope.goLive();
        });

      else
        Casino.joinLuckyStreakLive($stateParams.id, function(data) {
          $scope.data = data;
          $ionicLoading.hide();
          $scope.goLive();
        });

      $scope.goLive = function() {
        if($scope.data.hasOwnProperty('type')) {
          $rootScope.showAlert($translate.instant('global.notice'), $scope.data.text, 3000);
          $state.go('app.casino');
        }

        if($scope.data.game === '') {
          $rootScope.showAlert($translate.instant('global.notice'), $scope.data.text, 3000);
          $state.go('app.casino');
        }

        if($rootScope.liveProvider === 'ezugi') {
          if($scope.data.url !== '') {
            $window.location.replace($scope.data.url + '&language='+ $translate.use());
          }
        } else {
          if($scope.data.game !== '') {
            $window.location.replace($scope.data.game);
          }
        }
      }
    }

    if($state.current.name === 'app.join-slot') {

      $scope.status = false;
      $scope.data   = {};

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      var slotProvider1 = $rootScope.slotProvider;
      console.log(slotProvider1);

      if(slotProvider1.indexOf(':') !== -1)
        Casino.joinSlot($stateParams.id, function(data) {
          $scope.data = data;
          $ionicLoading.hide();
          $scope.goSlot();
        });

      else {
        if (slotProvider1 === 'pragmaticplay') {
          Casino.joinPragmaticPlaySlot($stateParams.id, function(data) {
            $scope.data = data;
            $ionicLoading.hide();
            $scope.goSlot();
          });
        } else {
          Casino.joinLuckyStreakSlot($stateParams.id, function(data) {
            $scope.data = data;
            $ionicLoading.hide();
            $scope.goSlot();
          });
        } 
      }  

      $scope.goSlot = function() {
        if($scope.data.hasOwnProperty('type')) {
          $rootScope.showAlert($translate.instant('global.notice'), $scope.data.text, 3000);
          $state.go('app.slot');
        }

        if($scope.data.game === '') {
          $rootScope.showAlert($translate.instant('global.notice'), $scope.data.text, 3000);
          $state.go('app.slot');
        } else {
          $window.location.replace($scope.data.game);
        }
      };
    }

    if($state.current.name === 'app.xpro') {
      Casino.getXProLive(function (data) {

        $ionicLoading.hide();

        if(data.text == 'refresh') {
          $window.location.reload();
          return false;
        }

        if(data.type != 'success') {
          $rootScope.showAlert($translate.instant('global.notice'), data.text, 3000);
          $state.go('app.main');
          return false;
        }

        $window.location.replace(data.url);
      });
    }

  }]);