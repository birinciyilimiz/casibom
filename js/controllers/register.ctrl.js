'use strict';

app
  .controller('RegisterCtrl',
    [
      '$scope',
      '$rootScope',
      '$ionicLoading',
      'Auth',
      '$timeout',
      '$state',
      '$location',
      '$translate',

  function($scope, $rootScope, $ionicLoading, Auth, $timeout, $state, $location, $translate) {

    $scope.getQueryParams = function (qs) {
      qs = qs.split('+').join(' ');

      var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      return params;
    };

    $scope.getParams = $scope.getQueryParams(document.location.search);

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth !== null && ($state.current.name == 'app.register' || $state.current.name == 'app.forgot-password')) {
        // $state.go('app.main');
        // $rootScope.showAlert('UyarÄ±', 'GiriÅŸ yapmÄ±ÅŸ durumdasÄ±nÄ±z.', 3000);
      }
    }, 1000);


    /** --------- Register --------- */

    $scope.countries    = {};
    $scope.currency     = {};

    Auth.countries(function(data) {
      $ionicLoading.hide();
      $scope.countries = data;
    });

    Auth.currency(function(data) {
      $ionicLoading.hide();
      $scope.currency = data.data;
    });

    $scope.dates = [];

    $scope.initDates = function () {
      var i;
      var lastYear = new Date();

      for (i = lastYear.getFullYear() - 18; i >= 1920; i--) {
        $scope.dates.push(i);
      }
    };

    $scope.initDates();

    $scope.register     = {
      terms       : true,
      country     : '',
      phone1      : '+90',
      currency_id : ''
    };

    $scope.success       = false;
    $scope.currentIndex  = 0;

    var sections = $('.form-section');

    $scope.navigateTo = function(index) {
      // Show only the navigation buttons that make sense for the current section:
      $('.form-navigation .previous').toggle(index > 0);
      var atTheEnd = index >= sections.length - 1;

      $('.form-navigation .next').toggle(!atTheEnd);

      $('.form-navigation [type=submit]').toggle(atTheEnd);
      $scope.currentIndex = index;
    };

    $scope.curIndex = function() {
      return $scope.currentIndex;
    };

    $scope.previous = function() {
      var cIndex = $scope.curIndex();

      if(cIndex != 0 && cIndex > 0) {
        $scope.navigateTo(cIndex - 1);
      } else {
        $scope.navigateTo(0);
      }
    };

    $scope.next = function() {
      if ($('.register-form').parsley().validate({group: 'block-' + $scope.curIndex()})){
        $scope.navigateTo($scope.curIndex() + 1);
      }
    };

    $scope.tcKimlik = function (tcno) {
      var toplam;

      toplam = Number(tcno.substring(0, 1)) + Number(tcno.substring(1, 2)) +
        Number(tcno.substring(2, 3)) + Number(tcno.substring(3, 4)) +
        Number(tcno.substring(4, 5)) + Number(tcno.substring(5, 6)) +
        Number(tcno.substring(6, 7)) + Number(tcno.substring(7, 8)) +
        Number(tcno.substring(8, 9)) + Number(tcno.substring(9, 10));

      var strtoplam = String(toplam);
      var onunbirlerbas = strtoplam.substring(strtoplam.length, strtoplam.length - 1);

      if (onunbirlerbas == tcno.substring(10, 11)) {
        return true;
      } else {
        return false;
      }
    };

    $scope.send = function() {

      $scope.register.ref = $scope.getParams.ref;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      $scope.register._token  = $rootScope.token;
      $scope.register.phone   = $scope.register.phone1 + $scope.register.phone2;

      if (typeof $scope.register.birth_date1 == 'undefined') {
        $scope.showAlert($translate.instant('auth.register.t40'), $translate.instant('auth.register.t41'), 3000);
        $ionicLoading.hide();

        return false;

      } else if (typeof $scope.register.birth_date2 == 'undefined') {
        $scope.showAlert($translate.instant('auth.register.t40'), $translate.instant('auth.register.t41'), 3000);
        $ionicLoading.hide();

        return false;

      } else if (typeof $scope.register.birth_date3 == 'undefined') {
        $scope.showAlert($translate.instant('auth.register.t40'), $translate.instant('auth.register.t41'), 3000);
        $ionicLoading.hide();

        return false;
      }

      $scope.register.birth_date = $scope.register.birth_date1 + '/' + $scope.register.birth_date2 + '/' +
                                  $scope.register.birth_date3;


      if ($scope.register.country == 1) {

        if (typeof $scope.register.identity_number == 'undefined') {

          $scope.showAlert($translate.instant('auth.register.t40'), $translate.instant('auth.register.t42'), 3000);
          $ionicLoading.hide();
          return false;

        } else {

          if (!$scope.tcKimlik($scope.register.identity_number)) {
            $scope.showAlert($translate.instant('auth.register.t40'), $translate.instant('auth.register.t42'), 3000);
            $ionicLoading.hide();
            return false;
          } else {

            Auth.register($scope.register, function (data) {
              if (data.type === 'success') {
                $scope.success = true;

                $ionicLoading.hide();

                $scope.showAlert($translate.instant('auth.register.t40'), data.text, 3000);
                $state.go('app.main');

              } else {
                $ionicLoading.hide();

                if (data.text == 'validation.required')
                  data.text = $translate.instant('auth.register.t43');

                $scope.showAlert($translate.instant('auth.register.t40'), data.text, 3000);
              }
            });
          }
        }
      } else {

        Auth.register($scope.register, function (data) {
          if (data.type === 'success') {
            $scope.success = true;

            $ionicLoading.hide();

            $scope.showAlert($translate.instant('auth.register.t40'), data.text, 3000);
            // $state.go('app.main');

          } else {
            $ionicLoading.hide();

            if (data.text == 'validation.required')
              data.text = $translate.instant('auth.register.t43');

            $scope.showAlert($translate.instant('auth.register.t40'), data.text, 3000);
          }
        });
      }


      console.log($scope.register);
    };

    // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
    sections.each(function(index, section) {
      $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    });

    $scope.navigateTo($scope.currentIndex); // Start at the beginning



    /* ------- Forgot Password ------ */

    var params            = $location.search();
    $scope.forgotActivate = false;

    if(typeof params.code != 'undefined') {
      $scope.forgotActivate = true;
    } else {
      $scope.forgotActivate = false;
    }

    $scope.forgot = {
      type : 'username',
      code: params.code
    };

    // Change Password
    $scope.changePassword = function() {
      $scope.forgot.action = 2;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      if(typeof $scope.forgot.password1 == 'undefined' || typeof $scope.forgot.password2 == 'undefined') {
        $ionicLoading.hide();
        $scope.showAlert($translate.instant('auth.register.t44'), $translate.instant('auth.register.t43'), 3000);
        return false;
      }

      if($scope.forgot.password1 != $scope.forgot.password2) {
        $ionicLoading.hide();
        $scope.showAlert($translate.instant('auth.register.t44'), $translate.instant('auth.register.t45'), 3000);
        return false;
      }

      Auth.forgotPassword($scope.forgot, function (data) {
        $ionicLoading.hide();

        if (data.type == 'success') {
          $scope.post = false;
          $scope.showAlert($translate.instant('auth.register.t44'), data.text, 3000);
          $state.go('app.main');
        } else {
          $scope.showAlert($translate.instant('auth.register.t44'), data.text, 3000);
        }
      });

    };

    // Forgotten
    $scope.forgotten = function() {
      $scope.forgot.action = 1;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });


      Auth.forgotPassword($scope.forgot, function (data) {
        $ionicLoading.hide();

        if (data.type == 'success') {

          $scope.post = false;
          $scope.showAlert($translate.instant('auth.register.t44'), data.text, 3000);
          $state.go('app.main');

        } else {

          $scope.showAlert($translate.instant('auth.register.t44'), data.text, 3000);

        }
      });
    };

  }]);