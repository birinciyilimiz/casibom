'use strict';

app
  .controller('SuggestionCtrl',
    [
      '$scope',
      '$rootScope',
      '$ionicLoading',
      '$ionicPopup',
      'Auth',
      '$timeout',
      '$state',
      '$stateParams',
      'Suggestion',

  function($scope, $rootScope, $ionicLoading, $ionicPopup, Auth, $timeout, $state, $stateParams, Suggestion) {

    String.prototype.capitalize = function(){
      return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    };

    $scope.type       = {};
    $scope.department = {};

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth === null &&
        ($state.current.name == 'app.suggestion' ||
          $state.current.name == 'app.suggestion-show' ||
          $state.current.name == 'app.suggestion-new'))
      {
        $state.go('app.main');
      }
    }, 1000);

    if($state.current.name == 'app.suggestion') {
      $scope.list = {};

      $scope.getList = function() {
        $ionicLoading.show();

        Suggestion.get(function(data) {

          $ionicLoading.hide();

          $scope.list       = data.suggestion;
          $scope.type       = data.types;
          $scope.department = data.department;
        });
      };

      $scope.getList();
    }

    if($state.current.name == 'app.suggestion-create') {
      $scope.suggestion = {};

      $scope.create = function() {
        $ionicLoading.show();
        Suggestion.create($scope.suggestion, function(data) {

          $ionicLoading.hide();

          if(data.type != 'success')
            $ionicPopup.alert({
              title : 'Durum',
              template : data.text
            });
          else
            $state.go('app.suggestion');
        });
      }
    }

    if($state.current.name == 'app.suggestion-show') {

      $scope.suggestion = {};
      $scope.answers    = {};
      $scope.answer     = {};

      $scope.getSuggestion = function(suggestion) {
        $ionicLoading.show();
        Suggestion.show(suggestion, function(data) {

          $ionicLoading.hide();

          $scope.suggestion = data.suggestion;
          $scope.answers    = data.answer;
          $scope.type       = data.types;
          $scope.department = data.department;
        });
      };

      $scope.send   = function() {
        $ionicLoading.show();

        Suggestion.answer({'id' : $scope.suggestion.id, 'message' : $scope.answer.message}, function(data) {

          $ionicLoading.hide();

          if(data.type != 'success')
            $ionicPopup.alert({
              title : 'Durum',
              template : data.text
            });
          else {
            $scope.answer.message = '';
            $scope.getSuggestion({'id': $stateParams.id});
          }

        });
      };

      $scope.getSuggestion({'id' : $stateParams.id});
    }



  }]);