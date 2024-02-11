'use strict';

app
  .controller('SportCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$ionicLoading',
    '$ionicPopup',
    'ionicDatePicker',
    '$ionicModal',
    '$sce',
    'baseURL',
    '$stateParams',
    '$translate',

  function($scope, $rootScope, $timeout, $state, $ionicLoading, $ionicPopup, ionicDatePicker, $ionicModal, $sce, Auth, Payments, Bank, baseURL, $stateParams, $translate) {

    $scope.BetslipState = {
      betslipEventsCount: 0,
      betslipIsVisible: false
    };

    $scope.listener = function (e) {
      var $iframe = $('#sportsBook');

      var betslipButton = document.querySelector('#betslipNotificationWrap');
      var betslipContent;

      if (betslipButton) {
        betslipButton.classList.add('NoSelections');
        betslipButton.addEventListener('click', function () {
          $iframe[0].contentWindow.postMessage({
            type: 'GMCMS:goToBetslip',
          }, '*');
        });

        betslipContent = betslipButton.querySelector('.BetslipIndicatorCounter');
      } else {
        console.warn('There is no betslip button available!');
      }

      var data = e.data;

      if (data) {
        var type = data.type;
        var payload = data.payload;

        switch (type) {
          case 'OMFE:setIFrameHeight': {
            if (payload > 0) {
              $iframe.height(payload);
            }
            break;
          }
          case 'OMFE:showOverlay': {
            document.body.classList.add('OMFE-showOverlay');
            break;
          }
          case 'OMFE:hideOverlay': {
            document.body.classList.remove('OMFE-showOverlay');
            break;
          }
          case 'OMFE:goToRegister': {
            //window.location.assign('/Register');
            $state.transitionTo('app.register');

            break;
          }
          case 'OMFE:goToLogin': {
            //window.location.assign('/Login');

            $state.transitionTo('app.login');
            break;
          }
          case 'OMFE:betPlaced': {
            $(document).trigger('BALANCE_UPDATED');

            $rootScope.login();

            break;
          }
          case 'OMFE:locationChanged': {
            if (!payload.basePath) {
              break;
            }

            //window.history.replaceState(payload.state, 'Sport', 'https://m.' + domain + '/#/sport/bet?path='+ decodeURIComponent(payload.pathname));

            if (payload.hash && payload.offset) {
              window.scrollTo({
                top: $iframe.offset().top + payload.offset,
              });
            }

            break;
          }
          case 'OMFE:scrollTop': {
            window.scrollTo({
              top: 0,
            });
            break;
          }
          case 'OMFE:updateBetslipSelectionsCount': {
            if (payload.count) {
              //betslipButton.classList.remove('NoSelections');
            } else {
              //betslipButton.classList.add('NoSelections');
            }

            //betslipContent.innerText = payload.count || '';

            $scope.BetslipState.betslipEventsCount = payload.count;
            $scope.redrawBetslip();

            break;
          }
          case 'OMFE:betslipInitialized': {
            betslipButton.classList.add('BetslipVisible');

            $scope.BetslipState.betslipEventsCount = payload.count;
            $scope.redrawBetslip();

            break;
          }
          case 'OMFE:betslipDestroyed': {
            betslipButton.classList.remove('BetslipVisible');

            $scope.BetslipState.betslipEventsCount = payload.count;
            $scope.redrawBetslip();


            break;
          }
          case 'OMFE:sessionTerminated': {
            window.location.reload();

            break;
          }
        }
      }
    };

    $rootScope.$on('$locationChangeSuccess', function (event, toState, toParams) {
      window.removeEventListener("message", $scope.listener);
    });

    $timeout(function() {
      (function(el) {
        /*var $iframe = $(el);
        var winUrl = window.location.toString();
        var iframeSrc = $iframe.attr('src');
        if (winUrl.indexOf('#') > -1) {
          iframeSrc += winUrl.substring(winUrl.indexOf('#'));
        }
        $iframe.attr('src', iframeSrc);*/

        window.addEventListener("message", $scope.listener);
      })('#sportsBook');
    }, 1000);

    $scope.redrawBetslip = function() {

      $('#betslipNotificationWrap .notification').text($scope.BetslipState.betslipEventsCount);

      if ($scope.BetslipState && $scope.BetslipState.betslipEventsCount > 0 && !$scope.BetslipState.betslipIsVisible) {
        $('#betslipNotificationWrap').show();
      }
      else {
        $('#betslipNotificationWrap').hide();
      }
    }

  }]);