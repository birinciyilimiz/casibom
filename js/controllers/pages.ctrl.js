'use strict';

app
  .controller('PagesCtrl',
    [
      '$scope',
      '$rootScope',
      '$ionicLoading',
      'Auth',
      '$timeout',
      '$state',
      '$ionicTabsDelegate',
      'Main',
      '$translate',

  function($scope, $rootScope, $ionicLoading, Auth, $timeout, $state, $ionicTabsDelegate, Main, $translate) {

    $scope.selectTabWithIndex = function(index) {
      $ionicTabsDelegate.select(index);
    };

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    $scope.pages = {};

    $scope.getPages = function() {
      Main.getPages(function(data) {

        $ionicLoading.hide();

        $scope.pages = data;
      });
    };

    $scope.getPages();

  }]);