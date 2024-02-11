'use strict';

app
  .controller('AuthCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicPopup',
    '$sce',
    'Auth',
    'baseURL',
    'apiURL',
    '$translate',
    '$cookies',

  function($scope, $rootScope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, $sce, Auth, baseURL, apiURL, $translate, $cookies) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth !== null && $state.current.name === 'app.login') {
        $state.go('app.main');
        $rootScope.showAlert($translate.instant('global.notice'), $translate.instant('auth.login.t6'), 3000);
      }
    }, 1000);


    $scope.form = {
      _token    : $rootScope.token,
      username  : '',
      password  : '',
      phone     : ''
    };

    $rootScope.getPhone   =  false;
    $rootScope.result     = {};

    // Auth Login
    $scope.sendForm = function() {
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      $scope.form._token  = $rootScope.token;

      Auth.login($scope.form, function(data) {
        $ionicLoading.hide();

        $rootScope.currentLang = $translate.use();

        if($rootScope.currentLang === 'undefined' || typeof $rootScope.currentLang == 'undefined') {
          $rootScope.currentLang = $cookies.get('NG_TRANSLATE_LANG_KEY');
          if($rootScope.currentLang === 'undefined' || typeof $rootScope.currentLang == 'undefined') {
            $rootScope.currentLang = 'tr';
          }
        }

        if(data.type === 'success') {
          $rootScope.auth = data.user;

          $state.go('app.main');

        } else {
          if(data.check === true) {
            $rootScope.getPhone = true;
            $rootScope.result   = data;

            $rootScope.showAlert($translate.instant('global.info'), data.text, 3000);
          } else {
            $rootScope.showAlert($translate.instant('global.info'), data.text, 3000)
          }

        }
      });
    };


    // Auth Logout
    $rootScope.logout = function() {

      var confirmPopup = $ionicPopup.confirm({
        title: $translate.instant('global.notice'),
        template: $translate.instant('auth.login.t7'),
        buttons: [
          {
            text: '<b>'+ $translate.instant('auth.login.t8') +'</b>',
            type: 'button-balanced',
            onTap: function(e) {
             return false;
            }
          },
          {
            text: '<b>'+ $translate.instant('auth.login.t9') +'</b>',
            type: 'button-assertive',
            onTap: function(e) {
              return true;
            }
          }
        ]
      });

      confirmPopup.then(function(res) {
        console.log(res);

        if(res) {

          $ionicLoading.show({
            template: $translate.instant('global.loading')
          });

          Auth.logout(function(data) {

            $ionicLoading.hide();

            if(data.type == 'success') {

              $rootScope.auth = null;

              $state.go('app.main');

              $rootScope.showAlert('Bilgi', data.text, 3000);

            } else {
              $rootScope.showAlert('Bilgi', data.text, 3000);
            }

          });
        }
      });
    };

  }]);