'use strict';

app
  .controller('PaymentsCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$interval',
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
    '$window',
    '$translate',
    '$location',

  function($scope, $rootScope, $timeout, $interval, $state, $ionicLoading, $ionicPopup, ionicDatePicker, $ionicModal, $sce, Auth, Payments, Bank, baseURL, $window, $translate, $location) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Auth Control
    $timeout(function() {
      $ionicLoading.hide();
      if($rootScope.auth === null && ($state.current.name == 'app.deposit' || $state.current.name == 'app.draw' || $state.current.name == 'app.qr-payment')) {
        $state.go('app.main');
      }
    }, 1000);

    $scope.toggle1 = false;
    $scope.methods = {
      deposit       : {},
      draw          : {},
      banks         : {},
      accounts      : {},
      account_numbers : {},
      exchange      : {},
      ecoPayz       : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/ecopayz/deposit_url'),
      ecoPayzDraw   : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/ecopayz/draw_url'),
      visa          : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/card/deposit'),
      jetonDeposit  : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/jeton/deposit'),
      jetonDraw     : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/jeton/draw'),
      paPara        : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/auth/deposit/papara/popup'),
      coinnor       : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/auth/deposit/coinnor/popup'),
      creditcard    : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/auth/deposit/credit/card/popup'),
      envoyQR       : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/auth/deposit/envoy-qr'),
      payKwik       : '',
      jetCMT        : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/auth/deposit/jetcmt/popup'),
    };

    $scope.paykasaAmounts = [10, 15, 20, 25, 30, 50, 60, 70, 80, 100, 150, 200, 250, 500, 1000, 3000, 5000, 10000];

    $scope.result  = {};
    $scope.method  = 'deposit';

    if($state.current.name == 'app.deposit')
      $scope.method = 'deposit';

    if($state.current.name == 'app.draw')
      $scope.method = 'draw';

    $rootScope.forms = {
      deposit : {},
      draw : {}
    };

    $scope.coins            = {};
    $scope.qrResponse       = {};
    $scope.countDown        = '';
    $scope.qrStatus         = 0;
    $scope.qrModal          = {};
    $scope.countDownDefault = 20;

    $scope.refStatus        = 0;
    $scope.refResponse      = {};
    $scope.refForm          = {};
    $scope.envoy            = {
      'banks'     : {},
      'amounts'   : {}
    };

    $scope.envoyQr          = {
      'banks'     : {},
    };

    $scope.paygiga          = {
      'banks'     : {},
      'amounts'   : {}
    };

    $scope.rocketPay        = {
      'banks'     : {}
    };

    $scope.instantQr        = {
      status    : 0,
      button    : true,
      response  : {},
      form      : {}
    };

    $scope.anindaKrediKarti    = {
      'banks'     : {},
    };

    $scope.payMinoHavale    = {
      'banks'     : {},
    };

    $scope.expressHavale    = {
      'banks'     : {},
    };

    $scope.havalePro    = {
      'banks'     : {},
    };

    $scope.maMonPay    = {
      'banks'     : {},
    };

    $scope.finPay    = {
      'banks'     : {},
    };

    $scope.jokerPay    = {
      'banks'     : {},
    };

    $scope.youPay    = {
      'banks'     : {},
    };

    // Open Method
    $scope.openMethod = function(id, toggle) {
      $scope.result = [];

      /*if(id === 2) {
        $scope.openEcoPayz();

        return false;
      }

      if(id === 21) {
        $scope.openJetonDeposit();

        return false;
      }*/

      if(id === 23) {
        $scope.openVisa();

        return false;
      }

      if(id === 32) {
        $scope.openQR();

        return false;
      }

      if(id === 31) {
        $scope.openRef('app.ref-akbank');

        return false;
      }

      if(id === 26) {
        $scope.openRef('app.ref-ziraat');

        return false;
      }

      if(id === 33) {
        $scope.openRef('app.ref-isbank');

        return false;
      }

      if(id === 42) {
        $scope.openRef('app.instant-qr');

        return false;
      }

      if(id === 44) {
        $scope.openRef('app.envoysoft');

        return false;
      }

      if(id === 45) {
        $scope.openRef('app.paygiga');
        return false;
      }

      if(id === 52) {
        $scope.openRef('app.rocketpay');
        return false;
      }

      if(id === 68) {
        $scope.getEnvoyQrBanks();
        //return false;
      }

      if([60, 70, 77, 80, 87, 88, 96, 102, 105, 108, 114].indexOf(id) !== -1) {
        setTimeout(function() {
          $rootScope.forms.deposit.deposit_account_number = $scope.methods.account_numbers['papara'];
        }, 20);
      }

      if(id === 79) {
        $scope.getAnindaKrediKartiBanks();
        //return false;
      }

      if(id === 91) {
        $scope.getPayminoHavaleBanks();
        //return false;
      }

      if(id === 95) {
        $scope.getExpressHavaleBanks();
        //return false;
      }

      if(id === 98) {
        $scope.getHavaleProBanks();
        //return false;
      }

      if(id === 103) {
        $scope.getMaMonPayBanks();
        //return false;
      }

      if(id === 104) {
        $scope.getFinPayBanks();
        //return false;
      }

      if(id === 109) {
        $scope.getJokerPayBanks();
        //return false;
      }

      if(id === 115) {
        $scope.getYouPayBanks();
        //return false;
      }

      return !toggle;
    };

    $rootScope.setDrawAccountNumber = function(id) {
      if(id === 61) {
        setTimeout(function() {
          $rootScope.forms.draw.account_number = $scope.methods.account_numbers['papara'];
        }, 20);
      }
    }

    $rootScope.depositNumberCheck = function() {
      if($rootScope.forms.draw.hasOwnProperty('account_number')) {
        if($scope.methods.account_numbers['papara'] !== '') {
          return ($rootScope.forms.draw.account_number.length > 1);
        } else {
          return false;
        }
      }

      return false
    }

    $rootScope.depositNumberCheck2 = function() {
      if($rootScope.forms.deposit.hasOwnProperty('deposit_account_number')) {
        if($scope.methods.account_numbers['papara'] !== '') {
          return ($rootScope.forms.deposit.deposit_account_number.length > 1);
        } else {
          return false;
        }
      } else {
        return false
      }
    }

    $scope.getMethods = function(method) {
      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getMethod('banks', function(data) {
        $scope.methods.banks = data;
      });

      Payments.exchange(function(data) {
        $scope.methods.exchange = data;
      });

      Bank.list(function(data) {
        $scope.methods.accounts = data.accounts;
        $scope.methods.account_numbers = data.account_numbers;
      });

      Payments.getMethod(method, function(data) {
        $ionicLoading.hide();

        if(method == 'deposit')
          $scope.methods.deposit = data;

        if(method == 'draw')
          $scope.methods.draw = data;
      });
    };

    $scope.loading = false;

    // Deposit
    $scope.deposit = function() {
      if(!$scope.loading) {
        $scope.loading = true;
      } else {
        return false;
      }

      if($rootScope.forms.deposit.type === 100) {
        let confirm = window.confirm("Bu Ã¶deme yÃ¶ntemini kullanabilmek iÃ§in PaPara HesabÄ±nÄ±zdan Sanal Kart oluÅŸturmanÄ±z gerekmektedir, eÄŸer PaPara Sanal KartÄ±nÄ±z var ise bu uyarÄ±yÄ± onaylayarak iÅŸleme devam edebilirsiniz.");

        if(!confirm)
          return false;
      }

      if($rootScope.forms.deposit.type === 5) {
        $rootScope.forms.deposit.cardtime = $rootScope.forms.deposit.cardmonth + '/' + $rootScope.forms.deposit.cardyear;
      }

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      $rootScope.forms.deposit.mobile = true;

      Payments.deposit($rootScope.forms.deposit, function(data) {
        $scope.loading = false;
        $scope.result = data;

        var type = $rootScope.forms.deposit.type;

        $ionicLoading.hide();

        // PayKwik
        if($rootScope.forms.deposit.type === 4) {

          if(data.type === 'error') {
            $rootScope.showAlert('UyarÄ±', data.text, 3000);
          } else {
            data.payment_url = $sce.trustAsResourceUrl(data.payment_url);
            $scope.methods.payKwik = data.payment_url;
            $scope.openPayKwikModal();
            $scope.toggle1 = false;
          }

        } else {

          // Other
          if(data.type === 'error') {

            if(!data.hasOwnProperty('start'))
              $rootScope.showAlert('UyarÄ±', data.text, 3000);

            $rootScope.forms.deposit.mobile = true;
            setTimeout(function() {
              $rootScope.forms.deposit.deposit_account_number = $scope.methods.account_numbers['papara'];
            }, 20);

          } else {

            $rootScope.forms.deposit.account_number = $scope.methods.account_numbers.papara;

            if([26, 31, 32, 33, 42].indexOf(type) === -1) {
              $rootScope.forms.deposit = {};
              $rootScope.showAlert('UyarÄ±', data.text, 3000);
              $scope.toggle1 = false;
              $rootScope.login();
            }

          }
        }

        if(type === 32) {

          var loading = 1;
          var t       = 0;

          if(data.hasOwnProperty('start')) {

            $scope.qrStatus = 3;

            $ionicLoading.show({
              template: '<ion-spinner></ion-spinner> <br /><br /> ' +
              'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
            });

            $scope.interval = $interval(function(){
              Payments.qrCheck(function(d) {

                if(d.hasOwnProperty('data')) {
                  if(d.data.hasOwnProperty('qrURL')) {
                    d.data.qrURL = $sce.trustAsResourceUrl(d.data.qrURL);
                  }
                }

                if((d.status - 1) === 1 && $scope.qrStatus !== d.status)
                {
                  $scope.setTimer($scope.countDownDefault);
                  var audio = document.getElementById('myaudio');
                  audio.play();
                }

                if($scope.qrStatus !== d.status) {
                  loading = 0;

                  if(t === 0)
                    $ionicLoading.hide();
                }

                $scope.qrStatus     = d.status;
                $scope.qrResponse   = d;

                if($scope.qrStatus === 1) {
                  if(loading === 0) {
                    $ionicLoading.show({
                      template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                      'LÃ¼tfen karÅŸÄ±nÄ±za Ã§Ä±kacak olan QR resmini bekleyiniz ve Ã§Ä±ktÄ±ÄŸÄ±nda okutunuz.'
                    });

                    loading = 1;
                  }
                }

                if($scope.qrStatus === 3) {
                  $scope.qrStatus = 2;
                  t = 1;

                  if(loading === 0) {
                    $ionicLoading.show({
                      template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                      'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
                    });

                    loading = 1;
                  }
                }

                if($scope.qrStatus === 4) {
                  if($scope.qrResponse.status === 'error') {
                    var audio2 = document.getElementById('myaudio2');
                    audio2.play();
                  }

                  $ionicLoading.hide();
                  $interval.cancel($scope.interval);

                }
              });
            }, 2000);
          }
        }

        // Ref
        var ref = [26, 31, 33];

        if(ref.indexOf(type) !== -1) {

          if(data.hasOwnProperty('start')) {

            $scope.refStatus = 0;

            $ionicLoading.show({
              template: '<ion-spinner></ion-spinner> <br /><br /> ' +
              'LÃ¼tfen bekleyiniz, iÅŸlem sÄ±raya alÄ±nÄ±yor..'
            });

            $scope.interval = $interval(function(){
              Payments.refCheck(function(d) {

                $scope.refButton = false;

                if(d.status === 1 && $scope.refStatus !== d.status)
                {
                  $scope.setTimer($scope.countDownDefault * 2);
                  var audio = document.getElementById('myaudio');
                  audio.play();
                }

                $scope.refStatus     = d.status;
                $scope.refResponse   = d;

                if(d.active === 1) {
                  $ionicLoading.hide();

                  $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                    'LÃ¼tfen bekleyiniz, bilgi talep edilmesi bekleniyor..'
                  });

                }

                if($scope.refStatus === 1)
                  $ionicLoading.hide();

                if($scope.refStatus === 2) {
                  $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                    'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
                  });
                }

                if($scope.refStatus === 3) {
                  if($scope.refResponse.status === 'error') {
                    var audio2 = document.getElementById('myaudio2');
                    audio2.play();
                  }

                  $ionicLoading.hide();
                  $interval.cancel($scope.interval);

                }
              });
            }, 2000);
          }
        }

        // Instant Qr
        if(type === 42) {

          if(data.hasOwnProperty('start')) {

            $scope.instantQr        = {
              status    : 0,
              button    : true,
              response  : {},
              form      : {}
            };

            $ionicLoading.show({
              template: '<ion-spinner></ion-spinner> <br /><br /> ' +
              'LÃ¼tfen bekleyiniz, iÅŸlem sÄ±raya alÄ±nÄ±yor..'
            });

            $scope.interval = $interval(function(){
              Payments.instantQrCheck(function(d) {

                $scope.instantQr.button = false;

                if((d.status === 1 || d.status === 3) && $scope.instantQr.status !== d.status)
                {
                  $scope.setTimer($scope.countDownDefault * 4);

                  var audio = document.getElementById('myaudio');
                  audio.play();
                }

                $scope.instantQr.status     = d.status;
                $scope.instantQr.response   = d;

                if(d.active === 1 && ($scope.instantQr.status === 1 || $scope.instantQr.status === 3)) {
                  $ionicLoading.hide();

                  $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                    'LÃ¼tfen bekleyiniz, bilgi talep edilmesi bekleniyor..'
                  });

                }

                if($scope.instantQr.status === 1 || $scope.instantQr.status === 3)
                  $ionicLoading.hide();

                if($scope.instantQr.status === 2) {
                  $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner> <br /><br /> ' +
                    'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
                  });
                }

                if($scope.instantQr.status === 5) {
                  if($scope.refResponse.status === 'error') {
                    var audio2 = document.getElementById('myaudio2');
                    audio2.play();
                  }

                  $ionicLoading.hide();
                  $interval.cancel($scope.interval);

                }
              });
            }, 2000);
          }
        }

        if (type === 2) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
          }
        }

        if (type === 21) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
          }
        }

        if(type === 43) {
          if(data.type === 'success') {
            //data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = $scope.methods.creditcard;
          }
        }

        if(type === 44) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
          }
        }

        if(type === 68) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
          } else {
            if(data.hasOwnProperty('start'))
              $rootScope.showAlert('UyarÄ±', data.text, 3000);
          }
        }

        if(type === 45) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 52) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 53) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 60) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 63) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 64) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 66) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 67) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 74) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 75) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 76) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 78) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 81) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 83) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 85) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 86) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 87) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 89) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 92) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 93) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 94) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 97) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 99) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 100) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 110) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

        if(type === 116) {
          if(data.type === 'success') {
            data.payment_url = $sce.trustAsResourceUrl(data.url);
            $window.location.href = data.payment_url;
            return false;
          }
        }

      });
    };

    // Draw
    $scope.draw = function() {
      if(!$scope.loading) {
        $scope.loading = true;
      } else {
        return false;
      }

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.draw($rootScope.forms.draw, function(data) {
        $scope.loading = false;

        var type = $rootScope.forms.draw.type;

        $ionicLoading.hide();

        if(data.type === 'error') {
          $rootScope.showAlert('UyarÄ±', data.text, 3000);
          $rootScope.toggle1 = true;
        } else {

          $rootScope.forms.draw = {};
          $rootScope.forms.draw.account_number = $scope.methods.account_numbers.papara;
          $rootScope.showAlert('UyarÄ±', data.text, 3000);
          $scope.toggle1 = false;
          $rootScope.login();

          if (type === 14) {
            if(data.type === 'success') {
              data.payment_url = $sce.trustAsResourceUrl(data.url);
              $window.location.href = data.payment_url;
            }
          }

          if (type === 22) {
            if(data.type === 'success') {
              data.payment_url = $sce.trustAsResourceUrl(data.url);
              $window.location.href = data.payment_url;
            }
          }

        }
      });
    };

    // Get Payment Method
    $scope.getMethods($scope.method);

    $scope.changeAccount = function() {
      var id      = $rootScope.forms.draw.bank_account_id;
      var account = $scope.methods.accounts[id];

      if(id !== '') {
        if(account.bank_id !== '9') {
          $rootScope.forms.draw.bank          = account.bank_id;
          $rootScope.forms.draw.iban          = account.iban;
          $rootScope.forms.draw.branch_code   = account.branch_code;
          $rootScope.forms.draw.bank_account  = account.account_number;
        } else {
          $rootScope.forms.draw.bank          = '';
          $rootScope.forms.draw.iban          = '';
          $rootScope.forms.draw.branch_code   = '';
          $rootScope.forms.draw.bank_account  = account.account_number;
        }
      } else {
        $rootScope.forms.draw.bank          = '';
        $rootScope.forms.draw.iban          = '';
        $rootScope.forms.draw.branch_code   = '';
        $rootScope.forms.draw.bank_account  = '';
      }
    };

    $scope.getEnvoyBanks = function() {
      $scope.envoy.amounts              = {};
      $scope.envoy.banks                = {};
      $rootScope.forms.deposit.ref      = '';
      $rootScope.forms.deposit.amount   = 0;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getEnvoyBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.envoy.banks = data.banks;
      });
    };

    $scope.getEnvoyQrBanks = function() {
      $scope.envoyQr.banks                = {};
      $rootScope.forms.deposit.ref      = '';
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getEnvoyQrBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.envoyQr.banks = data.banks;
      });
    };

    $scope.getEnvoyAmounts = function() {
      $scope.envoy.amounts              = {};
      $rootScope.forms.deposit.ref      = '';
      $rootScope.forms.deposit.amount   = 0;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getEnvoyAmounts({'bank' : $rootScope.forms.deposit.bank}, function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.envoy.amounts = data.amounts;
      });
    };

    $scope.getPayGigaBanks = function() {
      $scope.paygiga.amounts            = {};
      $scope.paygiga.banks              = {};
      $rootScope.forms.deposit.ref      = '';
      $rootScope.forms.deposit.amount   = 0;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getPayGigaBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.paygiga.banks = data.banks;
      });
    };

    $scope.getPayGigaAmounts = function() {
      $scope.paygiga.amounts              = {};
      $rootScope.forms.deposit.ref      = '';
      $rootScope.forms.deposit.amount   = 0;

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getPayGigaAmounts({'bank' : $rootScope.forms.deposit.bank}, function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.paygiga.amounts = data.amounts;
      });
    };

    $scope.getRocketPayBanks = function() {
      $scope.rocketPay.banks              = {};

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getRocketPayBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.rocketPay.banks = data.banks;
      });
    };

    $scope.getAnindaKrediKartiBanks = function() {
      $scope.anindaKrediKarti.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getAnindaKrediKartiBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.anindaKrediKarti.banks = data.banks;
      });
    };

    $scope.getPayminoHavaleBanks = function() {
      $scope.payMinoHavale.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getPayminoHavaleBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.payMinoHavale.banks = data.banks;
      });
    };

    $scope.getExpressHavaleBanks = function() {
      $scope.expressHavale.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getExpressHavaleBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.expressHavale.banks = data.banks;
      });
    };

    $scope.getHavaleProBanks = function() {
      $scope.havalePro.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getHavaleProBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.havalePro.banks = data.banks;
      });
    };

    $scope.getFinPayBanks = function() {
      $scope.finPay.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getFinPayBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.finPay.banks = data.banks;
      });
    };

    $scope.getJokerPayBanks = function() {
      $scope.jokerPay.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getJokerPayBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.jokerPay.banks = data.banks;
      });
    };

    $scope.getYouPayBanks = function() {
      $scope.youPay.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getYouPayBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.youPay.banks = data.banks;
      });
    };

    $scope.getMaMonPayBanks = function() {
      $scope.maMonPay.banks        = {};
      $rootScope.forms.deposit.amount   = '';

      $ionicLoading.show({
        template: $translate.instant('global.loading')
      });

      Payments.getMaMonPayBanks(function(data) {

        $ionicLoading.hide();

        if(data.type === 'error')
          $rootScope.showAlert('UyarÄ±', data.text, 3000);

        $scope.maMonPay.banks = data.banks;
      });
    };



    // Get Coins
    Payments.getCoins(function(data) {
      $scope.coins = data.data;
    });

    $scope.coinExchange = function(symbol, usd, type) {
      $scope.coin     = $scope.coins[symbol];
      var total       = 0;

      if(type === 1) {
        $scope.coinAmount = $rootScope.forms.deposit.coin;
        $scope.coinAmount = $scope.coinAmount.toString();
        $scope.coinAmount = $scope.coinAmount.replace(',', '.');
        total             = ($scope.coinAmount * $scope.coin) * usd;

        $rootScope.forms.deposit.coin   = $scope.coinAmount.toString();
        $rootScope.forms.deposit.amount = parseFloat(total).toFixed(3).toString();
      } else {

        $scope.amount = $rootScope.forms.deposit.amount;
        $scope.amount = $scope.amount.toString();
        $scope.amount = $scope.amount.replace(',', '.');
        total         = ($scope.amount / usd) / $scope.coin;

        $rootScope.forms.deposit.amount = $scope.amount.toString();
        $rootScope.forms.deposit.coin   = parseFloat(total).toFixed(5).toString();
      }
    };

    // QR Timer
    $scope.setTimer = function(countDown) {
      $scope.countDown = countDown;

      $interval.cancel($scope.timer);

      $scope.timer = $interval(function(){
        $scope.countDown--;

        if($scope.countDown <= 0)
          $interval.cancel($scope.timer);

      }, 1000)
    };

    // QR Set Status
    $scope.setStatus = function(status) {
      $scope.qrStatus = 2;

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> <br /><br /> ' +
        'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
      });

      if(status === 3) {
        $scope.qrResponse.data.photo = '';
        $scope.qrResponse.data.qrURL = '';
        $scope.countDown = 0;
      }

      Payments.qrSetStatus({'status' : status}, function(data) {
        if($scope.qrStatus !== data.status) {
          $ionicLoading.hide();
        }

        $scope.qrStatus = data.status;
      });
    };

    // Ref Set Info
    $scope.setRefInfo = function() {
      $scope.refStatus = 2;
      $scope.refButton = true;

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> <br /><br /> ' +
        'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
      });

      Payments.refSetInfo($scope.refForm, function(data) {
        if($scope.refStatus !== data.status) {
          $ionicLoading.hide();
        }

        $scope.refStatus = data.status;
        $scope.refButton = false;
      });
    };

    // Instant Qr Set Info
    $scope.instantQrSetInfo = function(type) {

      if(type === 1) {
        $scope.instantQr.status = 0;

        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner> <br /><br /> ' +
          'LÃ¼tfen karÅŸÄ±nÄ±za Ã§Ä±kacak olan sizden talep edilen ÅŸifre alanÄ±nÄ± doldurunuz.'
        });

      }
      else {
        $scope.instantQr.status = 2;

        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner> <br /><br /> ' +
          'LÃ¼tfen bekleyiniz, iÅŸlem sonucu bekleniyor..'
        });
      }

      $scope.instantQr.button     = true;
      $scope.instantQr.form.type  = type;

      Payments.instantQRSetInfo($scope.instantQr.form, function(data) {
        if($scope.instantQr.status !== data.status) {
          $ionicLoading.hide();
        }
        $scope.instantQr.form   = {};
        $scope.instantQr.status = data.status;
        $scope.instantQr.button = false;
      });
    };

    // QR State
    $scope.openQR = function() {
      $state.go('app.qr-payment');
      return true;
    };

    // Open Ref
    $scope.openRef = function(state) {
      $state.go(state);
      return true;
    };

    // QR Expression Modal
    $ionicModal.fromTemplateUrl('qr-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.qrModal = modal;
    });

    // EcoPayz Modal
    $ionicModal.fromTemplateUrl('ecopayz.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.ecoPayzModal = modal;
    });

    $scope.openEcoPayzModal = function() {
      $scope.ecoPayzModal.show();
    };

    $scope.closeEcoPayzModal = function() {
      $scope.ecoPayzModal.hide();
      $rootScope.login();
    };

    $scope.openEcoPayz = function() {
      $window.open($scope.methods.ecoPayz, '_blank');
      return false;
    };

    $scope.openEcoPayzDraw = function() {
      $window.open($scope.methods.ecoPayzDraw, '_blank');
      return false;
    };

    $scope.openVisa = function() {
      $window.open($scope.methods.visa, '_blank');
      return false;
    };

    $scope.openJetonDeposit = function() {
      $window.open($scope.methods.jetonDeposit, '_blank');
      return false;
    };

    $scope.openJetonDraw = function() {
      $window.open($scope.methods.jetonDraw, '_blank');
      return false;
    };

    $scope.openPaPara = function() {
      $window.open($scope.methods.paPara, '_blank');
      return false;
    };

    $scope.openJetCMT = function() {
      $window.open($scope.methods.jetCMT, '_blank');
      return false;
    };

    $scope.openCoinnor = function() {
      $window.open($scope.methods.coinnor, '_blank');
      return false;
    };

    $scope.openEnvoyQR = function() {
      $window.open($scope.methods.envoyQR, '_blank');
      return false;
    };

    $scope.openCreditCard = function() {
      $rootScope.showAlert('UyarÄ±', 'LÃ¼tfen bekleyiniz, kredi kartÄ± ekranÄ± aÃ§Ä±lacak', 1000);

      $timeout(function() {
          $window.open($scope.methods.creditcard, '_blank');
      }, 1000);
      return false;
    };

    // PayKwik Modal
    $ionicModal.fromTemplateUrl('paykwik.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.payKwikModal = modal;
    });

    $scope.openPayKwikModal = function() {
      $scope.payKwikModal.show();
    };

    $scope.closePayKwikModal = function() {
      $scope.payKwikModal.hide();
      $rootScope.login();
    };

    // Date Picker
    $scope.selectedDate1 = '';

    $scope.dateChange = function(dateIn) {
      var yyyy = dateIn.getFullYear();
      var mm = dateIn.getMonth()+1; // getMonth() is zero-based
      var dd  = dateIn.getDate();
      var yy = yyyy;
      var m = (mm <= 10) ? '0' + mm : mm;
      var d = (dd <= 10) ? '0' + dd : dd; // Leading zeros for mm and dd

      return d + '/' + m + '/' + yy;
    };

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          var date = new Date(val);
          $scope.selectedDate1 = $scope.dateChange(date);
          $rootScope.forms.deposit.transaction_date = $scope.dateChange(date);
          $rootScope.forms.deposit.birth_date = $scope.dateChange(date);
        },
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.copyTextToClipboard= function(text) {
      var textArea = document.createElement("textarea");

      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if the element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //

      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;

      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';

      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = 'transparent';


      textArea.value = text;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        if(successful) {
          $rootScope.showAlert('Bilgi', 'KopyalandÄ±', 1000);
        }

        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(textArea);
    }

  }]);