'use strict';

app
  .controller('BankCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$ionicLoading',
    '$ionicPopup',
    'ionicDatePicker',
    '$ionicModal',
    '$sce',
    'Auth',
    'Payments',
    'Bank',
    'baseURL',
    '$stateParams',
    '$translate',

  function($scope, $rootScope, $timeout, $state, $ionicLoading, $ionicPopup, ionicDatePicker, $ionicModal, $sce, Auth, Payments, Bank, baseURL, $stateParams, $translate) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth === null && ($state.current.name == 'app.bank' || $state.current.name == 'app.bank-create' || $state.current.name == 'app.bank-update')) {
        $state.go('app.main');
      }
    }, 1000);

    $rootScope.methods = {
      accounts      : {},
      exchange      : {},
      banks         : {}
    };

    $rootScope.form   = {
      id      : 0,
      bank_id : ''
    };

    $scope.getList = function() {
      Payments.exchange(function(data) {
        $rootScope.methods.exchange = data;
      });

      Bank.list(function(data) {
        $rootScope.methods.accounts = data.accounts;
        $rootScope.methods.banks = data.banks;
      });
    };

    if($state.current.name == 'app.bank') {
      $scope.getList();
    }

    if($state.current.name == 'app.bank-create') {
      $scope.getList();

      $rootScope.form.bank_id = '';

      $scope.create = function() {
        $ionicLoading.show();
        Bank.create($rootScope.form, function(data) {

          $ionicLoading.hide();

          if(data.type != 'success')
            $ionicPopup.alert({
              title : 'Durum',
              template : data.text
            });
          else
            $state.go('app.bank');
        });
      }
    }

    if($state.current.name == 'app.bank-update') {
      $scope.getList();

      $rootScope.form.id = $stateParams.id;

      Bank.get($rootScope.form, function(data) {
        $ionicLoading.hide();
        $rootScope.form = data.data;
        $rootScope.form.id = $stateParams.id;
        $timeout(function(){

        }, 200);
      });

      $scope.update = function() {
        $ionicLoading.show();

        Bank.update($rootScope.form, function(data) {

          $ionicLoading.hide();

          if(data.type != 'success')
            $ionicPopup.alert({
              title : 'Durum',
              template : data.text
            });
          else
            $state.go('app.bank');
        });
      }
    }

    // Bank Delete
    $scope.bankDelete = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'UyarÄ±',
        template: 'Banka hesabÄ±nÄ± silmek istediÄŸinize emin misiniz?',
        buttons: [
          {
            text: '<b>HayÄ±r</b>',
            type: 'button-balanced',
            onTap: function(e) {
              return false;
            }
          },
          {
            text: '<b>Evet</b>',
            type: 'button-assertive',
            onTap: function(e) {
              return true;
            }
          }
        ]
      });

      confirmPopup.then(function(res) {
        if(res) {

          $ionicLoading.show({
            template: $translate.instant('global.loading')
          });

          Bank.delete(id, function(data) {
            $ionicLoading.hide();
            $scope.getList();
            $rootScope.showAlert('Bilgi', data.text, 3000);
          });
        }
      });

    };

  }]);