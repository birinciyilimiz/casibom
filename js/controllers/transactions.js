'use strict';

app
  .controller('TransactionsCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$ionicLoading',
    '$ionicPopup',
    'ionicDatePicker',
    'Auth',
    'Transactions',
    '$translate',
    '$ionicModal',

  function($scope, $rootScope, $timeout, $state, $ionicLoading, $ionicPopup, ionicDatePicker, Auth, Transactions, $translate, $ionicModal) {

    $scope.dateChange = function(dateIn) {
      var yyyy = dateIn.getFullYear();
      var mm = dateIn.getMonth()+1; // getMonth() is zero-based
      var dd  = dateIn.getDate();
      var yy = yyyy;
      var m = (mm <= 10) ? '0' + mm : mm;
      var d = (dd <= 10) ? '0' + dd : dd; // Leading zeros for mm and dd

      return d + '/' + m + '/' + yy;
    };

    //var d = new Date();
    //var ts = d.getTime();
    //var twelveDays = ts - (7 * 24 * 60 * 60 * 1000);

    $scope.selectedDate1 = $scope.dateChange(new Date());
    $scope.selectedDate2 = $scope.dateChange(new Date());

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          var date = new Date(val);
          $scope.selectedDate1 = $scope.dateChange(date);
          $rootScope.filter.date1 = date;
        },
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.openDatePickerTwo = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          var date = new Date(val);
          $scope.selectedDate2 = $scope.dateChange(date);
          $rootScope.filter.date2 = date;
        },
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth === null && $state.current.name == 'app.transactions') {
        $state.go('app.main');
      }
    }, 1000);

    $rootScope.filter = {
      service : 'all',
      page    : 1,
      date1   : new Date(),
      date2   : new Date()
    };

    $scope.transactions = {
      all : {},
      bingo : {},
      bet : {},
      casino : {},
      transaction : {}
    };

    // Promotion Modal
    $ionicModal.fromTemplateUrl('transaction-detail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.detailModal = modal;
    });

    $scope.openDetailModal = function(transaction) {
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      $scope.activeTransaction = transaction;

      Transactions.getById({'id' : transaction.id}, function(data) {
        $ionicLoading.hide();

        $scope.activeTransaction.detail = data.data;
      });

      $scope.detailModal.show();
    };


    $scope.getTransactions = function() {
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Transactions.get($rootScope.filter, function(data) {
        $ionicLoading.hide();

        if($scope.filter.service == 'all')
          $scope.transactions.all = data;


        if($scope.filter.service == 'tombala')
          $scope.transactions.bingo = data;


        if($scope.filter.service == 'coupon')
          $scope.transactions.bet = data;


        if($scope.filter.service == 'casino')
          $scope.transactions.casino = data;


        if($scope.filter.service == 'transaction')
          $scope.transactions.transaction = data;

      });
    };

    $scope.filterDate = function() {
      //$rootScope.filter.date1 = $scope.selectedDate1;
      //$rootScope.filter.date2 = $scope.selectedDate2;

      return $scope.getTransactions();
    };


    $scope.filterReset = function() {
      $scope.selectedDate1 = '';
      $scope.selectedDate2 = '';
    };

    $scope.getTransactions();

  }]);