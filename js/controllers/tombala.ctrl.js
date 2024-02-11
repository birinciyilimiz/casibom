'use strict';

app
  .controller('TombalaCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    '$stateParams',
    '$ionicLoading',
    '$ionicPopup',
    '$ionicModal',
    '$sce',
    '$window',
    'Auth',
    'Casino',
    '$translate',

  function($scope, $rootScope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, $ionicModal, $sce, $window, Auth, Casino, $translate) {

    $scope.height = $window.innerHeight + 100;

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    $scope.game     = {};
    $scope.loading  = 1;
    $scope.error    = false;

    Casino.getTombala(function(data) {
      $ionicLoading.hide();

      $scope.loading = 0;

      if(data.type != 'success') {
        $rootScope.showAlert($translate.instant('global.notice'), data.text, 2000);
        $scope.error = true;
      } else {
        data.url = $sce.trustAsResourceUrl(data.url);
        $scope.game = data;

        (function(l,i,v,e,t,c,h){
          l['LGFrameObject']=t;l[t]=l[t]||function(){(l[t].q=l[t].q||[]).push(arguments)},
            l[t].l=1*new Date();c=i.createElement(v),h=i.getElementsByTagName(v)[0];
          c.async=1;c.src=e;h.parentNode.insertBefore(c,h)
        })(window,document,'script',('//static.lgio.net/lg-f.js?v='+(Date.now())),'lgf');
        lgf('config', {
          container: 'lgf-container', //id of html frame container element #:required
          origin: '', //frame top parent site origin url (default: document.referrer) (required for fullscreen)
          params: { // for all additional parameters
            sign:  $scope.game.token, // #:required
            homepage: window.location.hostname, //
            //cashierUrl: '', //
            //room: '' //
          }
        });

        /*
        (function(l,i,v,e,t,c,h){
          l['LiveGamesObject']=t;l[t]=l[t]||function(){(l[t].q=l[t].q||[]).push(arguments)},
            l[t].l=1*new Date();c=i.createElement(v),h=i.getElementsByTagName(v)[0];
          c.async=1;c.src=e;h.parentNode.insertBefore(c,h)
        })(window,document,'script','//embed.livegames.io/e-if.js','lg');
        if(lg){
          lg('sign', $scope.game.token);
        }*/

        /*(function(l,i,v,e,t,c,h){
          l['LiveGamesObject']=t;l[t]=l[t]||function(){(l[t].q=l[t].q||[]).push(arguments)},
            l[t].l=1*new Date();c=i.createElement(v),h=i.getElementsByTagName(v)[0];
          c.async=1;c.src=e;h.parentNode.insertBefore(c,h)
        })(window,document,'script','//embed.livegames.io/e-if.js','lg');
        if(lg){
          lg('sign', $scope.game.token); //apiKey ve apiSecret ile oluÅŸturulan jwt (token)
          lg('currency', 'â‚º'); // gÃ¶rÃ¼ntÃ¼lenecek para birimi
          lg('bgColor', 'transparent'); // arkaplan rengi (hex 3 hane veya 'transparent')
          //v1.1.0
          lg('frames', [ // aÃ§Ä±lacak iframe'ler
            {
              container:'lgGameContainer', //iframe'in atÄ±lacaÄŸÄ± container
              windowName :'liveGamesFrame', //iframe id
              service : 'game' // kullanÄ±lacak servis (game||video||newyear||null)
            }
          ]);
        }*/


      }


    });

  }]);