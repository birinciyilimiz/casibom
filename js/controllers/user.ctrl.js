'use strict';

app
  .controller('UserCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicPopup',
    '$sce',
    'Auth',
    '$translate',
  function($scope, $rootScope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, $sce, Auth, $translate) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      if($rootScope.auth == null && ($state.current.name == 'app.change-password' || $state.current.name == 'app.user-information')) {
        $state.go('app.main');
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.login.t6'), 3000);
      }
    }, 1000);

    var element = document.createElement('div');

    $scope.decodeHTMLEntities = function (str) {
      if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }

      return str;
    };


    $scope.countries  = {};
    $scope.password   = {};
    $scope.information= {
      country : 1
    };

    Auth.login('', function(data) {
      $rootScope.auth = data.user;

      $scope.information= {
        address     : $scope.decodeHTMLEntities($rootScope.auth.detail.address),
        birth_date  : $rootScope.auth.detail.birth_date,
        country     : $rootScope.auth.detail.country_id,
        city        : $scope.decodeHTMLEntities($rootScope.auth.detail.city),
        phone       : $rootScope.auth.detail.phone,
        team        : $scope.decodeHTMLEntities($rootScope.auth.detail.team)
      };

      $('select').trigger('click');
    });

    Auth.countries(function(data) {
      $ionicLoading.hide();
      $scope.countries = data;
    });

    // Save Information
    $scope.saveInformation = function() {
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Auth.changeInformation($scope.information, function(data) {
        $ionicLoading.hide();

        $rootScope.showAlert($translate.instant('global.notice'), data.text, 3000);
      });
    };

    // Change Password
    $scope.changePassword = function() {
      if(!$scope.password.hasOwnProperty('old_password')) {
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.change-password.t9'), 3000);
        return false;
      }

      if(!$scope.password.hasOwnProperty('pass')) {
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.change-password.t10'), 3000);
        return false;
      }

      if($scope.password.pass.length < 6) {
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.change-password.t11'), 3000);
        return false;
      }

      if(!$scope.password.hasOwnProperty('pass_confirmation')) {
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.change-password.t12'), 3000);
        return false;
      }

      if($scope.password.pass != $scope.password.pass_confirmation) {
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.change-password.t13'), 3000);
        return false;
      }

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Auth.changePassword($scope.password, function(data) {
        $ionicLoading.hide();

        $rootScope.showAlert($translate.instant('global.notice'), data.text, 3000);
        if(data.type == 'success'){
          $scope.password = {};
        }
      });
    };

  }]);