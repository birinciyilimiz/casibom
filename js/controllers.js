angular.module('dinamo.controllers', [])

.controller('MainCtrl', [
  '$scope',
  '$rootScope',
  '$ionicLoading',
  '$timeout',
  '$state',
  '$window',
  'Main',
  '$ionicSlideBoxDelegate',
  '$sce',
  'baseURL',
  '$translate',

  function($scope, $rootScope, $ionicLoading, $timeout, $state, $window, Main, $ionicSlideBoxDelegate, $sce, baseURL, $translate) {

    $ionicLoading.show({
      template: $translate.instant('global.loading')
    });

    // Sports Book Default
    $rootScope.links = {
      betgame             : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/mobil/betgametv/5'),
      freebet             : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/freebet/frame'),
      competition         : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/competition/frame?mobile=true'),
      euro2020competition : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/euro2020/competition/frame?mobile=true'),
      dinamoSlot          : $sce.trustAsResourceUrl('https://www.'+  baseURL +'/daily-slot/frame')
    };

    $rootScope.socials = {
      facebook   : '',
      twitter    : '',
      instagram : ''
    };

    // $rootScope.sliders  = {};
    $rootScope.zopim      = 0;
    $rootScope.nextDomain = '';
    $rootScope.tvDomain   = 'https://bit.ly/3m3VSjf';

    $rootScope.zopimShow = function () {
      if ($rootScope.zopim) {
        $zopim.livechat.button.hide();
        $rootScope.zopim = 0;
      } else {
        $zopim.livechat.button.show();
        $rootScope.zopim = 1;
      }
    };

    $timeout(function() {
      Main.getSliders(function(data) {
        $rootScope.sliders    = data.sliders;
        $rootScope.nextDomain = data.nextDomain;
        $rootScope.tvDomain   = data.tvDomain;

        $ionicLoading.hide();
        $ionicSlideBoxDelegate.update();

        $rootScope.socials.facebook = $sce.trustAsResourceUrl(data.socials.facebook.object_val);
        $rootScope.socials.twitter = $sce.trustAsResourceUrl(data.socials.twitter.object_val);
        $rootScope.socials.instagram = $sce.trustAsResourceUrl(data.socials.instagram.object_val);
      });
    }, 1250);

    $timeout(function() {
      $ionicLoading.hide();
    }, 1000);

}])

// Splash CTRL
.controller('SplashCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
  $timeout(function() {
    $state.transitionTo('app.main');
  }, 2000);
}])

// Splash CTRL
.controller('VideoCtrl', ['$scope', '$state', '$timeout', 'Payments', '$ionicLoading', '$sce', function($scope, $state, $timeout, Payments, $ionicLoading, $sce) {
  $scope.list = [];
  $ionicLoading.show();

  Payments.getVideos(function(data) {
    $ionicLoading.hide();

    angular.forEach(data.videos, function(val, key) {
      val.video = $sce.trustAsResourceUrl(val.video);

      $scope.list.push(val);
    })
  })

}])

// Support Page
  .controller('SupportCtrl', ['$scope', '$rootScope', '$stateParams', '$timeout', '$sce', function($scope, $rootScope, $stateParams, $timeout, $sce) {

    $scope.user = 'Merhaba, yardÄ±mcÄ± olabilir misiniz?';

    $scope.licenseURL = $sce.trustAsResourceUrl('https://www.' + domain + '/assets/license.html?domain=' + domain);

    $timeout(function() {

      if(typeof $rootScope.auth !== 'undefined' || typeof $rootScope.auth !== null &&  $rootScope.auth !== null) {
        if($rootScope.auth !== null)
          $scope.user = $rootScope.auth.first_name + ' ' + $rootScope.auth.last_name + ' ( '+ $rootScope.auth.username +' ), yardÄ±mcÄ± olabilir misiniz?';
      }

      $zopim.livechat.button.show();

      //Tawk_API.showWidget();
    }, 500);
  }]);























































































































































































































































































 

















var app = angular.module("dinamo", ["ionic", "dinamo.controllers", "dinamo.directives", "dinamo.filters", "dinamo.services", "tabSlideBox", "ionic-datepicker", "pascalprecht.translate", "ngCookies"]).run(["$ionicPlatform", "$ionicScrollDelegate", "$rootScope", "$interval", "$sce", "$state", "$ionicPopup", "$timeout", "$cookies", "Auth", "$translate", "baseURL", "apiURL", function(t, e, n, a, o, i, r, s, l, u, c, p, d) {
    n.footerlink = !1,
    t.ready(function() {
        window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard && (cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),
        cordova.plugins.Keyboard.disableScroll(!0)),
        window.StatusBar && StatusBar.styleDefault()
    }),
    n.auth = null,
    n.token = null,
    n.sportsURL = {
        tr: {
            main: "https://sports2.sportbdb.com/tr/?currentSession=",
            live: "https://sports2.sportbdb.com/tr/canli-spor/?currentSession=",
            history: "https://sports2.sportbdb.com/tr/bahis-gecmisi/?currentSession="
        },
        en: {
            main: "https://sports2.sportbdb.com/en/?currentSession=",
            live: "https://sports2.sportbdb.com/en/live-sports/?currentSession=",
            history: "https://sports2.sportbdb.com/en/betting-history/?currentSession="
        },
        ru: {
            main: "https://sports2.sportbdb.com/ru/?currentSession=",
            live: "https://sports2.sportbdb.com/ru/лайв-спорт/?currentSession=",
            history: "https://sports2.sportbdb.com/ru/%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8F-%D1%81%D1%82%D0%B0%D0%B2%D0%BE%D0%BA/open/?currentSession="
        },
        ro: {
            main: "https://sports2.sportbdb.com/en/?currentSession=",
            live: "https://sports2.sportbdb.com/en/live-sports/?currentSession=",
            history: "https://sports2.sportbdb.com/en/betting-history/?currentSession="
        }
    },
    n.currentLang = c.use(),
    "undefined" !== n.currentLang && void 0 !== n.currentLang || (n.currentLang = l.get("NG_TRANSLATE_LANG_KEY"),
    "undefined" !== n.currentLang && void 0 !== n.currentLang || (n.currentLang = "tr")),
    n.getQueryParams = function(t) {
        t = t.split("+").join(" ");
        for (var e, n = {}, a = /[?&]?([^=]+)=([^&]*)/g; e = a.exec(t); )
            n[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
        return n
    }
    ,
    n.sports = {},
    n.getSportLinks = function() {
        return n.getParams = n.getQueryParams(window.location.href.replace("https://m." + domain + "/#/sport/bet", "")),
        n.sports = {
            main: o.trustAsResourceUrl(d + "/mobile/sport/redirect?type=main&lang=" + c.use() + "&t=" + Date.now() + "&path=" + n.getParams.path + "&basePath=https://m." + domain + "/#/sport/bet?path="),
            live: o.trustAsResourceUrl(d + "/mobile/sport/redirect?type=live&lang=" + c.use() + "&t=" + Date.now() + "&path=" + n.getParams.path + "&basePath=https://m." + domain + "/#/sport/bet?path="),
            eSport: o.trustAsResourceUrl(d + "/mobile/sport/redirect?type=esport&lang=" + c.use() + "&t=" + Date.now() + "&path=" + n.getParams.path + "&basePath=https://m." + domain + "/#/sport/bet?path="),
            virtual: o.trustAsResourceUrl(d + "/mobile/sport/redirect?type=virtual&lang=" + c.use() + "&t=" + Date.now() + "&path=" + n.getParams.path + "&basePath=https://m." + domain + "/#/sport/bet?path="),
            history: o.trustAsResourceUrl(d + "/mobile/sport/redirect?type=history&lang=" + c.use() + "&t=" + Date.now() + "&path=" + n.getParams.path + "&basePath=https://m." + domain + "/#/sport/bet?path=")
        },
        n.sports
    }
    ,
    n.login = function() {
        u.login(null, function(t) {
            "error" !== t.type ? (n.auth = t.user,
            $zopim.hasOwnProperty("livechat") && (void 0 !== n.auth && ($zopim.livechat.setName(n.auth.username + "- (" + n.auth.first_name + " " + n.auth.last_name + ") Mobil Üye"),
            $zopim.livechat.setEmail(n.auth.email),
            $zopim.livechat.addTags(n.auth.id),
            1 === n.auth.user_type_id && $zopim.livechat.addTags("VIP"),
            0 === n.auth.status && $zopim.livechat.addTags("Hesap:Onaylanmamış"),
            1 === n.auth.status && $zopim.livechat.addTags("Hesap:Aktif"),
            2 === n.auth.status && $zopim.livechat.addTags("Hesap:Banlı")),
            $zopim.livechat.setLanguage(n.language))) : n.auth = null
        })
    }
    ,
    n.getToken = function() {
        u.token(function(t) {
            n.token = t.token
        })
    }
    ,
    n.getToken(),
    n.$on("$stateChangeStart", function() {
        n.getSportLinks(),
        s(function() {
            n.login(),
            "app.live-support" !== i.current.name && $zopim.hasOwnProperty("livechat") && $zopim.livechat.hasOwnProperty("button") && $zopim.livechat.button.hide(),
            n.language = c.use()
        }, 1e3)
    }),
    n.showAlert = function(t, e, n) {
        var a = r.alert({
            title: t,
            template: e,
            okText: "Tamam"
        });
        s(function() {
            a.close()
        }, n)
    }
    ,
    a(function() {
        e.resize()
    }, 1e3),
    n.changeLanguage = function() {
        c.use(n.language),
        s(function() {
            location.reload()
        }, 300)
    }
}
]).config(["$stateProvider", "$locationProvider", "$urlRouterProvider", "ionicDatePickerProvider", "$ionicConfigProvider", "$httpProvider", "$sceProvider", "$translateProvider", "baseURL", "apiURL", "appVersion", function(t, e, n, a, o, i, r, s, l, u, c) {
    s.useStaticFilesLoader({
        prefix: "i18n/locale-",
        suffix: ".json"
    }).registerAvailableLanguageKeys(["tr", "ro", "ru", "en"], {
        "tr*": "tr",
        "ro*": "ro",
        "ru*": "ru",
        "en*": "en"
    }).determinePreferredLanguage().useCookieStorage().forceAsyncReload(!0),
    "dinamobet.md" === l ? s.preferredLanguage("ro") : s.preferredLanguage("tr"),
    angular.injector(["ngCookies"]).invoke(["$cookies", function(t) {
        p = t
    }
    ]);
    var p, s = p.get("NG_TRANSLATE_LANG_KEY"), d = (i.defaults.headers.common["User-Language"] = void 0 === s ? "dinamobet.md" === l ? "ro" : "tr" : p.get("NG_TRANSLATE_LANG_KEY"),
    i.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest",
    o.scrolling.jsScrolling(!1),
    o.views.maxCache(0),
    o.views.forwardCache(!1),
    i.interceptors.push(function() {
        return {
            request: function(t) {
                return -1 !== t.url.search("payment") && -1 === t.url.indexOf(l) && (t.url = function(t) {
                    var e = "timestamp=" + d;
                    if (0 < t.indexOf("?"))
                        return 0 < t.indexOf("timestamp=") ? t.replace(/timestamp=[0-9](4)/, e) : t + "&" + e;
                    return t + "?" + e
                }(t.url)),
                t
            }
        }
    }),
    c);
    s = {
        inputDate: new Date,
        setLabel: "Select",
        todayLabel: "Today",
        closeLabel: "Close",
        mondayFirst: !1,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: "popup",
        from: new Date(1900,8,1),
        to: new Date(2035,12,31),
        showTodayButton: !0,
        dateFormat: "dd/MM/yyyy",
        closeOnSelect: !0
    };
    a.configDatePicker(s),
    t.state("app", {
        url: "/",
        abstract: !0,
        cache: !1,
        templateUrl: "templates/menu.html"
    }).state("app.main", {
        url: "main",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/main.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.splash", {
        url: "splash",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/splash.html",
                controller: "SplashCtrl"
            }
        }
    }).state("app.login", {
        url: "auth/login",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/login.html",
                controller: "AuthCtrl"
            }
        }
    }).state("app.register", {
        url: "auth/register",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/register.html",
                controller: "RegisterCtrl"
            }
        }
    }).state("app.forgot-password", {
        url: "auth/forgot-password",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/forgot-password.html",
                controller: "RegisterCtrl"
            }
        }
    }).state("app.change-password", {
        url: "auth/change-password",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/change-password.html",
                controller: "UserCtrl"
            }
        }
    }).state("app.user-information", {
        url: "auth/user-information",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/user-information.html",
                controller: "UserCtrl"
            }
        }
    }).state("app.coupons", {
        url: "auth/coupons",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/bet/coupons.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.discount", {
        url: "auth/discount",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/discount.html",
                controller: "BonusCtrl"
            }
        }
    }).state("app.transactions", {
        url: "auth/transactions",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/transactions.html",
                controller: "TransactionsCtrl"
            }
        }
    }).state("app.deposit", {
        url: "payment/deposit",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/main.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.draw", {
        url: "payment/draw",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/draw/main.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.casino", {
        url: "live-casino",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/casino.html",
                controller: "CasinoCtrl"
            }
        }
    }).state("app.slot", {
        url: "slot",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/slot.html",
                controller: "CasinoCtrl"
            }
        }
    }).state("app.join-live-casino", {
        url: "live-casino/{id}/{provider}",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/play-live.html",
                controller: "CasinoCtrl"
            }
        }
    }).state("app.join-slot", {
        url: "slot/{id}/{provider}",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/play-live.html",
                controller: "CasinoCtrl"
            }
        }
    }).state("app.xpro", {
        url: "xpro",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/play-live.html",
                controller: "CasinoCtrl"
            }
        }
    }).state("app.virtual-betting", {
        url: "virtual-betting",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/virtual-betting.html",
                controller: "VirtualBettingCtrl"
            }
        }
    }).state("app.join-virtual-betting", {
        url: "virtual-betting/{id}",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/play-virtual-betting.html",
                controller: "VirtualBettingCtrl"
            }
        }
    }).state("app.about-us", {
        url: "about-us",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/about-us.html",
                controller: "PagesCtrl"
            }
        }
    }).state("app.sports", {
        url: "sport/bet",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/sports/bet.html",
                controller: "SportCtrl"
            }
        }
    }).state("app.live-sports", {
        url: "sport/live-bet",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/sports/live-bet.html",
                controller: "SportCtrl"
            }
        }
    }).state("app.virtual-sports", {
        url: "sport/virtual-bet",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/sports/virtual-bet.html",
                controller: "SportCtrl"
            }
        }
    }).state("app.bet-history", {
        url: "sport/bet-history",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/sports/bet-history.html",
                controller: "SportCtrl"
            }
        }
    }).state("app.e-sport", {
        url: "sport/e-sport",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/sports/e-sport.html",
                controller: "SportCtrl"
            }
        }
    }).state("app.live-game", {
        url: "live-game",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/betongame.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.tombala", {
        url: "tombala",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/tombala/game.html",
                controller: "TombalaCtrl"
            }
        }
    }).state("app.promotion", {
        url: "promotion",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/promotion/main.html",
                controller: "PromotionCtrl"
            }
        }
    }).state("app.live-support", {
        url: "live-support",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/live-support.html",
                controller: "SupportCtrl"
            }
        }
    }).state("app.freebet", {
        url: "freebet",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/freebet.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.competition", {
        url: "competition",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/competition.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.euro2020competition", {
        url: "euro2020/competition",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/euro2020competition.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.dinamoslot", {
        url: "dinamo-slot",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/games/dinamo-slot.html",
                controller: "MainCtrl"
            }
        }
    }).state("app.cepbank", {
        url: "cepbank",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/cepbank.html",
                controller: "VideoCtrl"
            }
        }
    }).state("app.suggestion", {
        url: "auth/suggestion",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/suggestion/index.html",
                controller: "SuggestionCtrl"
            }
        }
    }).state("app.suggestion-create", {
        url: "auth/suggestion/create",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/suggestion/form.html",
                controller: "SuggestionCtrl"
            }
        }
    }).state("app.suggestion-show", {
        url: "auth/suggestion/show/{id}",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/auth/suggestion/show.html",
                controller: "SuggestionCtrl"
            }
        }
    }).state("app.bank", {
        url: "payment/bank",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/bank/index.html",
                controller: "BankCtrl"
            }
        }
    }).state("app.bank-create", {
        url: "payment/bank/create",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/bank/form.html",
                controller: "BankCtrl"
            }
        }
    }).state("app.bank-update", {
        url: "payment/bank/update/{id}",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/bank/form.html",
                controller: "BankCtrl"
            }
        }
    }).state("app.qr-payment", {
        url: "payment/qr",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/qr/form.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.instant-qr", {
        url: "payment/instant-qr",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/instant-qr/form.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.ref-akbank", {
        url: "payment/ref/akbank",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/ref/akbank.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.ref-ziraat", {
        url: "payment/ref/ziraat",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/ref/ziraat.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.ref-isbank", {
        url: "payment/ref/isbank",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/ref/isbank.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.envoysoft", {
        url: "payment/envoysoft",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/envoysoft/form.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.paygiga", {
        url: "payment/paygiga",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/paygiga/form.html",
                controller: "PaymentsCtrl"
            }
        }
    }).state("app.rocketpay", {
        url: "payment/rocketpay",
        cache: !1,
        views: {
            menuContent: {
                templateUrl: "templates/payment/deposit/rocketpay/form.html",
                controller: "PaymentsCtrl"
            }
        }
    }),
    n.otherwise("/splash")
}
]).directive("mySelect", ["$timeout", function(t) {
    return {
        restrict: "A",
        link: function(t, e, n) {
            $(e).selectOrDie({
                customID: n.mySelect
            })
        }
    }
}
]);
angular.module("dinamo.controllers", []).controller("MainCtrl", ["$scope", "$rootScope", "$ionicLoading", "$timeout", "$state", "$window", "Main", "$ionicSlideBoxDelegate", "$sce", "baseURL", "$translate", function(t, e, n, a, o, i, r, s, l, u, c) {
    n.show({
        template: c.instant("global.loading")
    }),
    e.links = {
        betgame: l.trustAsResourceUrl("https://www." + u + "/mobil/betgametv/5"),
        freebet: l.trustAsResourceUrl("https://www." + u + "/freebet/frame"),
        competition: l.trustAsResourceUrl("https://www." + u + "/competition/frame?mobile=true"),
        euro2020competition: l.trustAsResourceUrl("https://www." + u + "/euro2020/competition/frame?mobile=true"),
        dinamoSlot: l.trustAsResourceUrl("https://www." + u + "/daily-slot/frame")
    },
    e.socials = {
        facebook: "",
        twitter: "",
        instagram: ""
    },
    e.zopim = 0,
    e.nextDomain = "",
    e.tvDomain = "https://bit.ly/3m3VSjf",
    e.zopimShow = function() {
        e.zopim ? ($zopim.livechat.button.hide(),
        e.zopim = 0) : ($zopim.livechat.button.show(),
        e.zopim = 1)
    }
    ,
    a(function() {
        r.getSliders(function(t) {
            e.sliders = t.sliders,
            e.nextDomain = t.nextDomain,
            e.tvDomain = t.tvDomain,
            n.hide(),
            s.update(),
            e.socials.facebook = l.trustAsResourceUrl(t.socials.facebook.object_val),
            e.socials.twitter = l.trustAsResourceUrl(t.socials.twitter.object_val),
            e.socials.instagram = l.trustAsResourceUrl(t.socials.instagram.object_val)
        })
    }, 1250),
    a(function() {
        n.hide()
    }, 1e3)
}
]).controller("SplashCtrl", ["$scope", "$state", "$timeout", function(t, e, n) {
    n(function() {
        e.transitionTo("app.main")
    }, 2e3)
}
]).controller("VideoCtrl", ["$scope", "$state", "$timeout", "Payments", "$ionicLoading", "$sce", function(n, t, e, a, o, i) {
    n.list = [],
    o.show(),
    a.getVideos(function(t) {
        o.hide(),
        angular.forEach(t.videos, function(t, e) {
            t.video = i.trustAsResourceUrl(t.video),
            n.list.push(t)
        })
    })
}
]).controller("SupportCtrl", ["$scope", "$rootScope", "$stateParams", "$timeout", "$sce", function(t, e, n, a, o) {
    t.user = "Merhaba, yardımcı olabilir misiniz?",
    t.licenseURL = o.trustAsResourceUrl("https://www." + domain + "/assets/license.html?domain=" + domain),
    a(function() {
        (void 0 !== e.auth || null !== typeof e.auth && null !== e.auth) && null !== e.auth && (t.user = e.auth.first_name + " " + e.auth.last_name + " ( " + e.auth.username + " ), yardımcı olabilir misiniz?"),
        $zopim.livechat.button.show()
    }, 500)
}
]),
angular.module("dinamo.directives", []).directive("couponChange", ["$animate", "$timeout", function(o, i) {
    return function(t, a, e) {
        t.$watch(e.couponChange, function(t, e) {
            var n = "bounceIn";
            o.removeClass(a, n),
            i(function() {
                o.addClass(a, n)
            })
        })
    }
}
]).directive("match", function() {
    return {
        require: "ngModel",
        restrict: "A",
        scope: {
            match: "="
        },
        link: function(e, t, n, a) {
            e.$watch(function() {
                var t = a.$modelValue || a.$$invalidModelValue;
                return a.$pristine && angular.isUndefined(t) || e.match === t
            }, function(t) {
                a.$setValidity("match", t)
            })
        }
    }
}).directive("oddChange", ["$animate", function(o) {
    return function(t, a, e) {
        t.$watch(e.oddChange, function(t, e) {
            var n;
            t != e && (n = e < t ? "change-up" : "change",
            o.removeClass(a, "change-up"),
            o.removeClass(a, "change"),
            o.addClass(a, n, function() {
                o.removeClass(a, n)
            }))
        })
    }
}
]).directive("revolution", ["$timeout", function(t) {
    return {
        restrict: "A",
        link: function(t, e, n) {
            $(".tp-banner").revolution(t.$eval(n.revolution))
        }
    }
}
]).directive("anchorSmoothScroll", ["$location", function(a) {
    "use strict";
    return {
        restrict: "A",
        replace: !1,
        scope: {
            anchorSmoothScroll: "@"
        },
        link: function(t, e, n) {
            function u() {
                return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop || 0)
            }
            function c(t) {
                t = document.getElementById(t);
                if (null != t) {
                    for (var e = t.offsetTop, n = t; n.offsetParent && n.offsetParent != document.body; )
                        e += (n = n.offsetParent).offsetTop;
                    return e
                }
            }
            e.on("click", function() {
                a.hash(t.anchorSmoothScroll),
                function t(e) {
                    var n;
                    var a = u();
                    var o = c(e);
                    e = a < o ? o - a : a - o;
                    if (e < 100)
                        return void t(0, o);
                    var i = Math.round(e / 100);
                    20 <= i && (i = 20);
                    var r = Math.round(e / 25);
                    var s = a < o ? a + r : a - r;
                    var l = 0;
                    if (a < o) {
                        for (n = a; n < o; n += r)
                            setTimeout("window.scrollTo(0, " + s + ")", l * i),
                            o < (s += r) && (s = o),
                            l++;
                        return
                    }
                    for (n = a; o < n; n -= r)
                        setTimeout("window.scrollTo(0, " + s + ")", l * i),
                        (s -= r) < o && (s = o),
                        l++
                }(t.anchorSmoothScroll)
            })
        }
    }
}
]).directive("angRoundProgress", ["$filter", function(w) {
    return {
        restrict: "AEC",
        link: function(t, e) {
            var r, s, l, u, c, p, d, m, g, h, f, b;
            1 === e.length && (e = e[0],
            r = e.getAttribute("data-round-progress-width") || "400",
            s = e.getAttribute("data-round-progress-height") || "400",
            (l = document.createElement("canvas")).setAttribute("width", r),
            l.setAttribute("height", s),
            l.setAttribute("data-round-progress-model", e.getAttribute("data-round-progress-model")),
            e.parentNode.replaceChild(l, e),
            u = e.getAttribute("data-round-progress-outer-circle-width") || "20",
            c = e.getAttribute("data-round-progress-outer-circle-background-color") || "#505769",
            p = e.getAttribute("data-round-progress-outer-circle-foreground-color") || "#12eeb9",
            d = e.getAttribute("data-round-progress-label-color") || "#12eeb9",
            m = e.getAttribute("data-round-progress-outer-circle-radius") || "100",
            g = e.getAttribute("data-round-progress-label-font") || "50pt Calibri",
            h = e.getAttribute("data-round-progress-data-text"),
            f = e.getAttribute("data-round-progress-date-type"),
            b = parseInt(e.getAttribute("data-round-progress-date-percentage")),
            e = l.getAttribute("data-round-progress-model"),
            t.$watch(e, function(t, e) {
                var n, a, o, i;
                t && (t.label = w("date")(t.start_date, f, "UTC"),
                t.percentage = t.label / b,
                (n = l.getContext("2d")).clearRect(0, 0, r, s),
                a = r / 2,
                o = s / 2,
                n.beginPath(),
                n.arc(a, o, parseInt(m), 0, 2 * Math.PI, !1),
                n.lineWidth = parseInt(u),
                n.strokeStyle = c,
                n.stroke(),
                n.font = g,
                n.textAlign = "center",
                n.textBaseline = "middle",
                n.fillStyle = d,
                n.fillText(t.label, a, o - 7.5),
                n.fillText(h, a, 7.5 + o),
                i = -Math.PI / 2,
                t = 2 * Math.PI * t.percentage - Math.PI / 2,
                n.beginPath(),
                n.arc(a, o, parseInt(m), i, t, !1),
                n.lineWidth = parseInt(u),
                n.strokeStyle = p,
                n.stroke())
            }, !0))
        },
        replace: !0
    }
}
]).directive("scroll", ["$window", function(a) {
    return function(t, e, n) {
        angular.element(a).bind("scroll", function() {
            300 <= this.pageYOffset ? t.boolChangeClass = !0 : t.boolChangeClass = !1,
            t.$apply()
        })
    }
}
]).directive("iframeSetDimensionsOnload", [function() {
    return {
        restrict: "A",
        link: function(t, e, n) {
            e.on("load", function() {
                console.log(document.getElementsByClassName("scroll")[0]);
                var t = e[0].contentWindow.document.body.scrollHeight + "px";
                e.css("width", "100%"),
                e.css("height", t),
                document.getElementsByClassName("scroll")[0].style.height = t
            })
        }
    }
}
]).directive("angularMask", function() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            isModelValueEqualViewValues: "="
        },
        link: function(e, n, l, a) {
            function o(t) {
                var e = l.angularMask
                  , n = e.split("|");
                if (1 < n.length && n.sort(function(t, e) {
                    return t.length - e.length
                }),
                null === t || "" == t)
                    return "";
                var a = String(t).replace(/\D/g, "");
                if (1 < n.length)
                    for (var o in n)
                        if (a.replace(/\D/g, "").length <= n[o].replace(/\D/g, "").length) {
                            e = n[o];
                            break
                        }
                for (var i = "", r = 0, s = 0; s < e.length && a[r]; )
                    e[s].match(/\D/) ? i += e[s] : (i += a[r],
                    r++),
                    s++;
                return i
            }
            e.$watch(function() {
                return l.angularMask
            }, function(t) {
                null != a.$viewValue && (a.$viewValue = o(String(a.$viewValue).replace(/\D/g, "")),
                n.val(a.$viewValue))
            }),
            a.$formatters.push(function(t) {
                return null === t ? "" : o(String(t).replace(/\D/g, ""))
            }),
            a.$parsers.push(function(t) {
                a.$viewValue = o(t);
                t = e.isModelValueEqualViewValues ? a.$viewValue : String(t).replace(/\D/g, "");
                return n.val(a.$viewValue),
                t
            })
        }
    }
}).directive("stringToNumber", function() {
    return {
        require: "ngModel",
        link: function(t, e, n, a) {
            a.$parsers.push(function(t) {
                return "" + t
            }),
            a.$formatters.push(function(t) {
                return parseFloat(t)
            })
        }
    }
}).directive("inputFloat", function() {
    return {
        require: "ngModel",
        link: function(t, e, n, a) {
            "number" == n.type && a.$formatters.push(function(t) {
                return parseFloat(t)
            })
        }
    }
}),
angular.module("dinamo.filters", []).filter("getById", function() {
    return function(t, e, n) {
        for (var a = 0, o = t.length; a < o; a++)
            if (+t[a][n] == +e)
                return t[a];
        return null
    }
}).filter("multiplyByKey", function() {
    return function(t, e) {
        if (void 0 === t || void 0 === e || 0 === t.length)
            return 0;
        for (var n = 1, a = t.length - 1; 0 <= a; a--)
            n *= parseFloat(t[a][e]);
        return n
    }
}).filter("collectByKey", function() {
    return function(t, e) {
        if (void 0 === t || void 0 === e || 0 === t.length)
            return 0;
        for (var n = 0, a = t.length - 1; 0 <= a; a--)
            n += parseFloat(t[a][e]);
        return n
    }
}).filter("timeFilter", function(r) {
    return function(t, e) {
        for (var n = [], a = 0, o = t.length; a < o; a++) {
            var i = t[a].timestamp + "000";
            (i > parseInt(e) && i < r.timezone + 864e5 + parseInt(e) - parseInt(e) % 864e5 || "all" == e) && n.push(t[a])
        }
        return n
    }
}).filter("timeFilter2", function() {
    return function(t, e, n) {
        if (t) {
            for (var a = [], o = 0, i = t.length; o < i; o++) {
                var r = t[o][n] + "000";
                parseInt(r) > parseInt(e) && a.push(t[o])
            }
            return a
        }
    }
}).filter("unique", function() {
    return function(t, e) {
        var a, o;
        return !1 !== e && (e || angular.isUndefined(e)) && angular.isArray(t) && (a = [],
        o = function(t) {
            return angular.isObject(t) && angular.isString(e) ? t[e] : t
        }
        ,
        angular.forEach(t, function(t) {
            for (var e = !1, n = 0; n < a.length; n++)
                if (angular.equals(o(a[n]), o(t))) {
                    e = !0;
                    break
                }
            e || a.push(t)
        }),
        t = a),
        t
    }
}).filter("toArray", function() {
    "use strict";
    return function(t) {
        var n;
        return t instanceof Object ? (n = [],
        angular.forEach(t, function(t, e) {
            t.$key = e,
            n.push(t)
        }),
        n) : t
    }
}).filter("range", function() {
    return function(t, e) {
        e = parseInt(e);
        for (var n = 0; n < e; n++)
            t.push(n);
        return t
    }
}).filter("comma2decimal", [function() {
    return function(t) {
        return t.toString().replace(/\,/g, ".")
    }
}
]),
angular.module("dinamo.services", []).factory("Main", ["$http", "$ionicPopup", "apiURL", "$translate", function(t, n, a, o) {
    return {
        getPages: function(e) {
            t({
                method: "GET",
                url: a + "/get/pages",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                n.alert({
                    title: o.instant("global.info"),
                    template: o.instant("global.warning")
                })
            })
        },
        getSliders: function(e) {
            t({
                method: "GET",
                url: a + "/get/sliders",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                n.alert({
                    title: o.instant("global.info"),
                    template: o.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Auth", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        token: function(e) {
            n({
                method: "GET",
                url: o + "/auth/token",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        register: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/register",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        login: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/login",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        logout: function(e) {
            n({
                method: "POST",
                url: o + "/auth/logout",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        changePassword: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/change-password",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        changeInformation: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/information",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        forgotPassword: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/forgot-password",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        countries: function(e) {
            n({
                method: "POST",
                url: o + "/get/countries",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        currency: function(e) {
            n({
                method: "POST",
                url: o + "/auth/currency",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Transactions", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        get: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/get/activities",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getById: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/get/transaction",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getBonus: function(e) {
            n({
                method: "POST",
                url: o + "/auth/get/bonus",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        setDiscountType: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/set/discount/type",
                data: t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Promotion", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        get: function(e) {
            n({
                method: "POST",
                url: o + "/promotion",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        join: function(t, e) {
            n({
                method: "POST",
                data: t,
                url: o + "/promotion/join",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Suggestion", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        get: function(e) {
            n({
                method: "GET",
                url: o + "/auth/suggestion",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        show: function(t, e) {
            n({
                method: "GET",
                data: t,
                url: o + "/auth/suggestion/show/" + t.id,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        answer: function(t, e) {
            n({
                method: "POST",
                data: t,
                url: o + "/auth/suggestion/show/" + t.id,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        create: function(t, e) {
            n({
                method: "POST",
                data: t,
                url: o + "/auth/suggestion/create",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Casino", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        getLive: function(e) {
            n({
                method: "POST",
                url: o + "/get/everymatrix/live",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getSlot: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/everymatrix/slot?vendor=" + t.vendor,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getXProLive: function(e) {
            n({
                method: "POST",
                url: o + "/get/xpro/mobile",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinLive: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/everymatrix/live/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinSlot: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/everymatrix/slot/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getTombala: function(e) {
            n({
                method: "POST",
                url: o + "/get/tombala",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getLuckyStreakLive: function(e) {
            n({
                method: "POST",
                url: o + "/get/lucky-streak/live",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getLuckyStreakSlot: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/lucky-streak/slot/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getPragmaticPlaySlot: function(e) {
            n({
                method: "POST",
                url: o + "/get/pragmatic-play",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinPragmaticPlaySlot: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/pragmatic-play/play/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinLuckyStreakLive: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/lucky-streak/live/play/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinLuckyStreakSlot: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/lucky-streak/slot/play/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getEzugiLive: function(e) {
            n({
                method: "POST",
                url: o + "/get/ezugi/live",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinEzugiLive: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/ezugi/live/play/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getVirtualBetting: function(e) {
            n({
                method: "POST",
                url: o + "/get/virtual-betting",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        joinVirtualBetting: function(t, e) {
            n({
                method: "POST",
                url: o + "/get/virtual-betting/play/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Payments", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        getMethod: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/payments/" + t + "?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        deposit: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/get/deposit",
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        draw: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/get/draw",
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        exchange: function(e) {
            n({
                method: "POST",
                url: o + "/auth/payments/exchange?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        qrCheck: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/check?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        qrSetStatus: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/set/qr/status?t=" + (new Date).getTime(),
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getCoins: function(e) {
            n({
                method: "POST",
                url: o + "/auth/get/coins?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        refCheck: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/check/ref?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        refSetInfo: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/set/ref/info?t=" + (new Date).getTime(),
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        instantQrCheck: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/check/qr?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        instantQRSetInfo: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/set/qr?t=" + (new Date).getTime(),
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getVideos: function(e) {
            n({
                method: "POST",
                url: o + "/payment/videos",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getEnvoyAmounts: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/envoy/amounts?t=" + (new Date).getTime(),
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getEnvoyBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/envoy/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getEnvoyQrBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/envoy/qr/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getPayGigaAmounts: function(t, e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/paygiga/amounts?t=" + (new Date).getTime(),
                withCredentials: !0,
                data: t,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getPayGigaBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/paygiga/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getRocketPayBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/rocketpay/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getPayminoHavaleBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/paymino-havale/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getExpressHavaleBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/express-havale/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getAnindaKrediKartiBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/aninda/kredikarti/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getHavaleProBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/havale-pro/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getMaMonPayBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/mamonpay/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getFinPayBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/finpay/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getJokerPayBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/jokerpay/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        getYouPayBanks: function(e) {
            n({
                method: "POST",
                url: o + "/auth/deposit/get/youpay/bank/list?t=" + (new Date).getTime(),
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]).factory("Bank", ["$http", "$ionicPopup", "apiURL", "$translate", function(n, a, o, i) {
    return {
        list: function(e) {
            n({
                method: "GET",
                url: o + "/auth/bank",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        create: function(t, e) {
            n({
                method: "POST",
                data: t,
                url: o + "/auth/bank/create",
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        get: function(t, e) {
            n({
                method: "GET",
                data: t,
                url: o + "/auth/bank/update/" + t.id,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        update: function(t, e) {
            n({
                method: "POST",
                data: t,
                url: o + "/auth/bank/update/" + t.id,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        },
        delete: function(t, e) {
            n({
                method: "POST",
                data: {
                    id: t
                },
                url: o + "/auth/bank/delete/" + t,
                withCredentials: !0,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).success(function(t) {
                e(t)
            }).error(function() {
                a.alert({
                    title: i.instant("global.info"),
                    template: i.instant("global.warning")
                })
            })
        }
    }
}
]),
app.controller("AuthCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "$ionicLoading", "$ionicPopup", "$sce", "Auth", "baseURL", "apiURL", "$translate", "$cookies", function(t, e, n, a, o, i, r, s, l, u, c, p, d) {
    i.show({
        template: p.instant("global.loading")
    }),
    n(function() {
        i.hide(),
        null !== e.auth && "app.login" === a.current.name && (a.go("app.main"),
        e.showAlert(p.instant("global.notice"), p.instant("auth.login.t6"), 3e3))
    }, 1e3),
    t.form = {
        _token: e.token,
        username: "",
        password: "",
        phone: ""
    },
    e.getPhone = !1,
    e.result = {},
    t.sendForm = function() {
        i.show({
            template: p.instant("global.loading")
        }),
        t.form._token = e.token,
        l.login(t.form, function(t) {
            i.hide(),
            e.currentLang = p.use(),
            "undefined" !== e.currentLang && void 0 !== e.currentLang || (e.currentLang = d.get("NG_TRANSLATE_LANG_KEY"),
            "undefined" !== e.currentLang && void 0 !== e.currentLang || (e.currentLang = "tr")),
            "success" === t.type ? (e.auth = t.user,
            a.go("app.main")) : (!0 === t.check && (e.getPhone = !0,
            e.result = t),
            e.showAlert(p.instant("global.info"), t.text, 3e3))
        })
    }
    ,
    e.logout = function() {
        r.confirm({
            title: p.instant("global.notice"),
            template: p.instant("auth.login.t7"),
            buttons: [{
                text: "<b>" + p.instant("auth.login.t8") + "</b>",
                type: "button-balanced",
                onTap: function(t) {
                    return !1
                }
            }, {
                text: "<b>" + p.instant("auth.login.t9") + "</b>",
                type: "button-assertive",
                onTap: function(t) {
                    return !0
                }
            }]
        }).then(function(t) {
            console.log(t),
            t && (i.show({
                template: p.instant("global.loading")
            }),
            l.logout(function(t) {
                i.hide(),
                "success" == t.type && (e.auth = null,
                a.go("app.main")),
                e.showAlert("Bilgi", t.text, 3e3)
            }))
        })
    }
}
]),
app.controller("BankCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$ionicLoading", "$ionicPopup", "ionicDatePicker", "$ionicModal", "$sce", "Auth", "Payments", "Bank", "baseURL", "$stateParams", "$translate", function(n, a, e, o, i, r, t, s, l, u, c, p, d, m, g) {
    i.show({
        template: g.instant("global.loading")
    }),
    e(function() {
        i.hide(),
        null !== a.auth || "app.bank" != o.current.name && "app.bank-create" != o.current.name && "app.bank-update" != o.current.name || o.go("app.main")
    }, 1e3),
    a.methods = {
        accounts: {},
        exchange: {},
        banks: {}
    },
    a.form = {
        id: 0,
        bank_id: ""
    },
    n.getList = function() {
        c.exchange(function(t) {
            a.methods.exchange = t
        }),
        p.list(function(t) {
            a.methods.accounts = t.accounts,
            a.methods.banks = t.banks
        })
    }
    ,
    "app.bank" == o.current.name && n.getList(),
    "app.bank-create" == o.current.name && (n.getList(),
    a.form.bank_id = "",
    n.create = function() {
        i.show(),
        p.create(a.form, function(t) {
            i.hide(),
            "success" != t.type ? r.alert({
                title: "Durum",
                template: t.text
            }) : o.go("app.bank")
        })
    }
    ),
    "app.bank-update" == o.current.name && (n.getList(),
    a.form.id = m.id,
    p.get(a.form, function(t) {
        i.hide(),
        a.form = t.data,
        a.form.id = m.id,
        e(function() {}, 200)
    }),
    n.update = function() {
        i.show(),
        p.update(a.form, function(t) {
            i.hide(),
            "success" != t.type ? r.alert({
                title: "Durum",
                template: t.text
            }) : o.go("app.bank")
        })
    }
    ),
    n.bankDelete = function(e) {
        r.confirm({
            title: "Uyarı",
            template: "Banka hesabını silmek istediğinize emin misiniz?",
            buttons: [{
                text: "<b>Hayır</b>",
                type: "button-balanced",
                onTap: function(t) {
                    return !1
                }
            }, {
                text: "<b>Evet</b>",
                type: "button-assertive",
                onTap: function(t) {
                    return !0
                }
            }]
        }).then(function(t) {
            t && (i.show({
                template: g.instant("global.loading")
            }),
            p.delete(e, function(t) {
                i.hide(),
                n.getList(),
                a.showAlert("Bilgi", t.text, 3e3)
            }))
        })
    }
}
]),
app.controller("BonusCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$ionicLoading", "$ionicPopup", "ionicDatePicker", "Auth", "Transactions", function(e, n, t, a, o, i, r, s, l) {
    t(function() {
        o.hide(),
        null === n.auth && "app.discount" === a.current.name && a.go("app.main")
    }, 1e3),
    e.data = [],
    n.discountType = "",
    null !== n.auth && (n.discountType = n.auth.hasOwnProperty("wallet") ? n.auth.wallet.discount_period.toString() : ""),
    e.getBonus = function() {
        o.show(),
        l.getBonus(function(t) {
            o.hide(),
            e.data = t
        })
    }
    ,
    e.getBonus(),
    e.setDiscountType = function() {
        o.show(),
        l.setDiscountType({
            type: n.discountType
        }, function(t) {
            o.hide(),
            n.showAlert("Uyarı", t.text, 3e3)
        })
    }
}
]),
app.controller("CasinoCtrl", ["$scope", "$rootScope", "$location", "$timeout", "$state", "$stateParams", "$ionicLoading", "$sce", "Auth", "Casino", "$window", "$translate", "$cookies", function(e, n, t, a, o, i, r, s, l, u, c, p, d) {
    e.height = c.innerHeight + 100,
    r.show({
        template: p.instant("global.loading")
    }),
    e.games = {},
    e.search = "",
    e.order = !0,
    e.game = {},
    n.liveProvider = "em",
    n.slotProvider = "pragmaticplay",
    void 0 !== t.search().provider && (n.liveProvider = t.search().provider,
    n.slotProvider = t.search().provider,
    d.put("slotProvider", n.slotProvider),
    d.put("liveProvider", n.liveProvider));
    var t = d.get("liveProvider")
      , m = d.get("slotProvider");
    void 0 !== t && (n.liveProvider = t),
    void 0 !== m && (n.slotProvider = m),
    e.changeProvider = function(t) {
        e.games = {},
        r.show({
            template: p.instant("global.loading")
        }),
        "live" === t && ("xpro" !== n.liveProvider && d.put("liveProvider", n.liveProvider),
        e.getLiveGames()),
        "slot" === t && (d.put("slotProvider", n.slotProvider),
        e.getSlotGames())
    }
    ,
    e.getLiveGames = function() {
        "em" === n.liveProvider ? u.getLive(function(t) {
            r.hide(),
            e.games = t
        }) : "ezugi" === n.liveProvider ? u.getEzugiLive(function(t) {
            r.hide(),
            e.games = t.tables
        }) : "xpro" === n.liveProvider ? (r.hide(),
        o.go("app.xpro")) : u.getLuckyStreakLive(function(t) {
            r.hide(),
            e.games = t
        })
    }
    ,
    e.getSlotGames = function() {
        var t = n.slotProvider;
        -1 !== t.indexOf(":") ? u.getSlot({
            vendor: t.replace("em:", "")
        }, function(t) {
            r.hide(),
            e.games = t
        }) : "pragmaticplay" === t ? u.getPragmaticPlaySlot(function(t) {
            r.hide(),
            e.games = t
        }) : u.getLuckyStreakSlot(n.slotProvider, function(t) {
            r.hide(),
            e.games = t
        })
    }
    ,
    "app.casino" === o.current.name && e.getLiveGames(),
    "app.slot" === o.current.name && e.getSlotGames(),
    "app.join-live-casino" === o.current.name && (e.status = !1,
    e.data = {},
    r.show({
        template: p.instant("global.loading")
    }),
    "em" === n.liveProvider ? u.joinLive(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goLive()
    }) : "ezugi" === n.liveProvider ? u.joinEzugiLive(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goLive()
    }) : u.joinLuckyStreakLive(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goLive()
    }),
    e.goLive = function() {
        e.data.hasOwnProperty("type") && (n.showAlert(p.instant("global.notice"), e.data.text, 3e3),
        o.go("app.casino")),
        "" === e.data.game && (n.showAlert(p.instant("global.notice"), e.data.text, 3e3),
        o.go("app.casino")),
        "ezugi" === n.liveProvider ? "" !== e.data.url && c.location.replace(e.data.url + "&language=" + p.use()) : "" !== e.data.game && c.location.replace(e.data.game)
    }
    ),
    "app.join-slot" === o.current.name && (e.status = !1,
    e.data = {},
    r.show({
        template: p.instant("global.loading")
    }),
    t = n.slotProvider,
    console.log(t),
    -1 !== t.indexOf(":") ? u.joinSlot(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goSlot()
    }) : "pragmaticplay" === t ? u.joinPragmaticPlaySlot(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goSlot()
    }) : u.joinLuckyStreakSlot(i.id, function(t) {
        e.data = t,
        r.hide(),
        e.goSlot()
    }),
    e.goSlot = function() {
        e.data.hasOwnProperty("type") && (n.showAlert(p.instant("global.notice"), e.data.text, 3e3),
        o.go("app.slot")),
        "" === e.data.game ? (n.showAlert(p.instant("global.notice"), e.data.text, 3e3),
        o.go("app.slot")) : c.location.replace(e.data.game)
    }
    ),
    "app.xpro" === o.current.name && u.getXProLive(function(t) {
        return r.hide(),
        "refresh" == t.text ? (c.location.reload(),
        !1) : "success" != t.type ? (n.showAlert(p.instant("global.notice"), t.text, 3e3),
        o.go("app.main"),
        !1) : void c.location.replace(t.url)
    })
}
]),
app.controller("PagesCtrl", ["$scope", "$rootScope", "$ionicLoading", "Auth", "$timeout", "$state", "$ionicTabsDelegate", "Main", "$translate", function(e, t, n, a, o, i, r, s, l) {
    e.selectTabWithIndex = function(t) {
        r.select(t)
    }
    ,
    n.show({
        template: l.instant("global.loading")
    }),
    e.pages = {},
    e.getPages = function() {
        s.getPages(function(t) {
            n.hide(),
            e.pages = t
        })
    }
    ,
    e.getPages()
}
]),
app.controller("PaymentsCtrl", ["$scope", "$rootScope", "$timeout", "$interval", "$state", "$ionicLoading", "$ionicPopup", "ionicDatePicker", "$ionicModal", "$sce", "Auth", "Payments", "Bank", "baseURL", "$window", "$translate", "$location", function(o, i, t, r, e, s, n, a, l, u, c, p, d, m, g, h, f) {
    s.show({
        template: h.instant("global.loading")
    }),
    t(function() {
        s.hide(),
        null !== i.auth || "app.deposit" != e.current.name && "app.draw" != e.current.name && "app.qr-payment" != e.current.name || e.go("app.main")
    }, 1e3),
    o.toggle1 = !1,
    o.methods = {
        deposit: {},
        draw: {},
        banks: {},
        accounts: {},
        account_numbers: {},
        exchange: {},
        ecoPayz: u.trustAsResourceUrl("https://www." + m + "/ecopayz/deposit_url"),
        ecoPayzDraw: u.trustAsResourceUrl("https://www." + m + "/ecopayz/draw_url"),
        visa: u.trustAsResourceUrl("https://www." + m + "/card/deposit"),
        jetonDeposit: u.trustAsResourceUrl("https://www." + m + "/jeton/deposit"),
        jetonDraw: u.trustAsResourceUrl("https://www." + m + "/jeton/draw"),
        paPara: u.trustAsResourceUrl("https://www." + m + "/auth/deposit/papara/popup"),
        coinnor: u.trustAsResourceUrl("https://www." + m + "/auth/deposit/coinnor/popup"),
        creditcard: u.trustAsResourceUrl("https://www." + m + "/auth/deposit/credit/card/popup"),
        envoyQR: u.trustAsResourceUrl("https://www." + m + "/auth/deposit/envoy-qr"),
        payKwik: "",
        jetCMT: u.trustAsResourceUrl("https://www." + m + "/auth/deposit/jetcmt/popup")
    },
    o.paykasaAmounts = [10, 15, 20, 25, 30, 50, 60, 70, 80, 100, 150, 200, 250, 500, 1e3, 3e3, 5e3, 1e4],
    o.result = {},
    o.method = "deposit",
    "app.deposit" == e.current.name && (o.method = "deposit"),
    "app.draw" == e.current.name && (o.method = "draw"),
    i.forms = {
        deposit: {},
        draw: {}
    },
    o.coins = {},
    o.qrResponse = {},
    o.countDown = "",
    o.qrStatus = 0,
    o.qrModal = {},
    o.countDownDefault = 20,
    o.refStatus = 0,
    o.refResponse = {},
    o.refForm = {},
    o.envoy = {
        banks: {},
        amounts: {}
    },
    o.envoyQr = {
        banks: {}
    },
    o.paygiga = {
        banks: {},
        amounts: {}
    },
    o.rocketPay = {
        banks: {}
    },
    o.instantQr = {
        status: 0,
        button: !0,
        response: {},
        form: {}
    },
    o.anindaKrediKarti = {
        banks: {}
    },
    o.payMinoHavale = {
        banks: {}
    },
    o.expressHavale = {
        banks: {}
    },
    o.havalePro = {
        banks: {}
    },
    o.maMonPay = {
        banks: {}
    },
    o.finPay = {
        banks: {}
    },
    o.jokerPay = {
        banks: {}
    },
    o.youPay = {
        banks: {}
    },
    o.openMethod = function(t, e) {
        return o.result = [],
        23 === t ? (o.openVisa(),
        !1) : 32 === t ? (o.openQR(),
        !1) : 31 === t ? (o.openRef("app.ref-akbank"),
        !1) : 26 === t ? (o.openRef("app.ref-ziraat"),
        !1) : 33 === t ? (o.openRef("app.ref-isbank"),
        !1) : 42 === t ? (o.openRef("app.instant-qr"),
        !1) : 44 === t ? (o.openRef("app.envoysoft"),
        !1) : 45 === t ? (o.openRef("app.paygiga"),
        !1) : 52 === t ? (o.openRef("app.rocketpay"),
        !1) : (68 === t && o.getEnvoyQrBanks(),
        -1 !== [60, 70, 77, 80, 87, 88, 96, 102, 105, 108, 114].indexOf(t) && setTimeout(function() {
            i.forms.deposit.deposit_account_number = o.methods.account_numbers.papara
        }, 20),
        79 === t && o.getAnindaKrediKartiBanks(),
        91 === t && o.getPayminoHavaleBanks(),
        95 === t && o.getExpressHavaleBanks(),
        98 === t && o.getHavaleProBanks(),
        103 === t && o.getMaMonPayBanks(),
        104 === t && o.getFinPayBanks(),
        109 === t && o.getJokerPayBanks(),
        115 === t && o.getYouPayBanks(),
        !e)
    }
    ,
    i.setDrawAccountNumber = function(t) {
        61 === t && setTimeout(function() {
            i.forms.draw.account_number = o.methods.account_numbers.papara
        }, 20)
    }
    ,
    i.depositNumberCheck = function() {
        return !!i.forms.draw.hasOwnProperty("account_number") && ("" !== o.methods.account_numbers.papara && 1 < i.forms.draw.account_number.length)
    }
    ,
    i.depositNumberCheck2 = function() {
        return !!i.forms.deposit.hasOwnProperty("deposit_account_number") && ("" !== o.methods.account_numbers.papara && 1 < i.forms.deposit.deposit_account_number.length)
    }
    ,
    o.getMethods = function(e) {
        s.show({
            template: h.instant("global.loading")
        }),
        p.getMethod("banks", function(t) {
            o.methods.banks = t
        }),
        p.exchange(function(t) {
            o.methods.exchange = t
        }),
        d.list(function(t) {
            o.methods.accounts = t.accounts,
            o.methods.account_numbers = t.account_numbers
        }),
        p.getMethod(e, function(t) {
            s.hide(),
            "deposit" == e && (o.methods.deposit = t),
            "draw" == e && (o.methods.draw = t)
        })
    }
    ,
    o.loading = !1,
    o.deposit = function() {
        if (o.loading)
            return !1;
        if ((o.loading = !0,
        100 === i.forms.deposit.type) && !window.confirm("Bu ödeme yöntemini kullanabilmek için PaPara Hesabınızdan Sanal Kart oluşturmanız gerekmektedir, eğer PaPara Sanal Kartınız var ise bu uyarıyı onaylayarak işleme devam edebilirsiniz."))
            return !1;
        5 === i.forms.deposit.type && (i.forms.deposit.cardtime = i.forms.deposit.cardmonth + "/" + i.forms.deposit.cardyear),
        s.show({
            template: h.instant("global.loading")
        }),
        i.forms.deposit.mobile = !0,
        p.deposit(i.forms.deposit, function(t) {
            o.loading = !1,
            o.result = t;
            var e, n, a = i.forms.deposit.type;
            s.hide(),
            4 === i.forms.deposit.type ? "error" === t.type ? i.showAlert("Uyarı", t.text, 3e3) : (t.payment_url = u.trustAsResourceUrl(t.payment_url),
            o.methods.payKwik = t.payment_url,
            o.openPayKwikModal(),
            o.toggle1 = !1) : "error" === t.type ? (t.hasOwnProperty("start") || i.showAlert("Uyarı", t.text, 3e3),
            i.forms.deposit.mobile = !0,
            setTimeout(function() {
                i.forms.deposit.deposit_account_number = o.methods.account_numbers.papara
            }, 20)) : (i.forms.deposit.account_number = o.methods.account_numbers.papara,
            -1 === [26, 31, 32, 33, 42].indexOf(a) && (i.forms.deposit = {},
            i.showAlert("Uyarı", t.text, 3e3),
            o.toggle1 = !1,
            i.login())),
            32 === a && (e = 1,
            n = 0,
            t.hasOwnProperty("start") && (o.qrStatus = 3,
            s.show({
                template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
            }),
            o.interval = r(function() {
                p.qrCheck(function(t) {
                    t.hasOwnProperty("data") && t.data.hasOwnProperty("qrURL") && (t.data.qrURL = u.trustAsResourceUrl(t.data.qrURL)),
                    t.status - 1 == 1 && o.qrStatus !== t.status && (o.setTimer(o.countDownDefault),
                    document.getElementById("myaudio").play()),
                    o.qrStatus !== t.status && (e = 0) === n && s.hide(),
                    o.qrStatus = t.status,
                    o.qrResponse = t,
                    1 === o.qrStatus && 0 === e && (s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen karşınıza çıkacak olan QR resmini bekleyiniz ve çıktığında okutunuz."
                    }),
                    e = 1),
                    3 === o.qrStatus && (o.qrStatus = 2,
                    n = 1,
                    0 === e && (s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
                    }),
                    e = 1)),
                    4 === o.qrStatus && ("error" === o.qrResponse.status && document.getElementById("myaudio2").play(),
                    s.hide(),
                    r.cancel(o.interval))
                })
            }, 2e3)));
            return -1 !== [26, 31, 33].indexOf(a) && t.hasOwnProperty("start") && (o.refStatus = 0,
            s.show({
                template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sıraya alınıyor.."
            }),
            o.interval = r(function() {
                p.refCheck(function(t) {
                    o.refButton = !1,
                    1 === t.status && o.refStatus !== t.status && (o.setTimer(2 * o.countDownDefault),
                    document.getElementById("myaudio").play()),
                    o.refStatus = t.status,
                    1 === (o.refResponse = t).active && (s.hide(),
                    s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, bilgi talep edilmesi bekleniyor.."
                    })),
                    1 === o.refStatus && s.hide(),
                    2 === o.refStatus && s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
                    }),
                    3 === o.refStatus && ("error" === o.refResponse.status && document.getElementById("myaudio2").play(),
                    s.hide(),
                    r.cancel(o.interval))
                })
            }, 2e3)),
            42 === a && t.hasOwnProperty("start") && (o.instantQr = {
                status: 0,
                button: !0,
                response: {},
                form: {}
            },
            s.show({
                template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sıraya alınıyor.."
            }),
            o.interval = r(function() {
                p.instantQrCheck(function(t) {
                    o.instantQr.button = !1,
                    1 !== t.status && 3 !== t.status || o.instantQr.status === t.status || (o.setTimer(4 * o.countDownDefault),
                    document.getElementById("myaudio").play()),
                    o.instantQr.status = t.status,
                    1 !== (o.instantQr.response = t).active || 1 !== o.instantQr.status && 3 !== o.instantQr.status || (s.hide(),
                    s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, bilgi talep edilmesi bekleniyor.."
                    })),
                    1 !== o.instantQr.status && 3 !== o.instantQr.status || s.hide(),
                    2 === o.instantQr.status && s.show({
                        template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
                    }),
                    5 === o.instantQr.status && ("error" === o.refResponse.status && document.getElementById("myaudio2").play(),
                    s.hide(),
                    r.cancel(o.interval))
                })
            }, 2e3)),
            2 === a && "success" === t.type && (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url),
            21 === a && "success" === t.type && (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url),
            43 === a && "success" === t.type && (g.location.href = o.methods.creditcard),
            44 === a && "success" === t.type && (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url),
            68 === a && ("success" === t.type ? (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url) : t.hasOwnProperty("start") && i.showAlert("Uyarı", t.text, 3e3)),
            45 === a && "success" === t.type || 52 === a && "success" === t.type || 53 === a && "success" === t.type || 60 === a && "success" === t.type || 63 === a && "success" === t.type || 64 === a && "success" === t.type || 66 === a && "success" === t.type || 67 === a && "success" === t.type || 74 === a && "success" === t.type || 75 === a && "success" === t.type || 76 === a && "success" === t.type || 78 === a && "success" === t.type || 81 === a && "success" === t.type || 83 === a && "success" === t.type || 85 === a && "success" === t.type || 86 === a && "success" === t.type || 87 === a && "success" === t.type || 89 === a && "success" === t.type || 92 === a && "success" === t.type || 93 === a && "success" === t.type || 94 === a && "success" === t.type || 97 === a && "success" === t.type || 99 === a && "success" === t.type || 100 === a && "success" === t.type || 110 === a && "success" === t.type || 116 === a && "success" === t.type ? (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url,
            !1) : void 0
        })
    }
    ,
    o.draw = function() {
        if (o.loading)
            return !1;
        o.loading = !0,
        s.show({
            template: h.instant("global.loading")
        }),
        p.draw(i.forms.draw, function(t) {
            o.loading = !1;
            var e = i.forms.draw.type;
            s.hide(),
            "error" === t.type ? (i.showAlert("Uyarı", t.text, 3e3),
            i.toggle1 = !0) : (i.forms.draw = {},
            i.forms.draw.account_number = o.methods.account_numbers.papara,
            i.showAlert("Uyarı", t.text, 3e3),
            o.toggle1 = !1,
            i.login(),
            14 === e && "success" === t.type && (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url),
            22 === e && "success" === t.type && (t.payment_url = u.trustAsResourceUrl(t.url),
            g.location.href = t.payment_url))
        })
    }
    ,
    o.getMethods(o.method),
    o.changeAccount = function() {
        var t = i.forms.draw.bank_account_id
          , e = o.methods.accounts[t];
        "" !== t ? ("9" !== e.bank_id ? (i.forms.draw.bank = e.bank_id,
        i.forms.draw.iban = e.iban,
        i.forms.draw.branch_code = e.branch_code) : (i.forms.draw.bank = "",
        i.forms.draw.iban = "",
        i.forms.draw.branch_code = ""),
        i.forms.draw.bank_account = e.account_number) : (i.forms.draw.bank = "",
        i.forms.draw.iban = "",
        i.forms.draw.branch_code = "",
        i.forms.draw.bank_account = "")
    }
    ,
    o.getEnvoyBanks = function() {
        o.envoy.amounts = {},
        o.envoy.banks = {},
        i.forms.deposit.ref = "",
        i.forms.deposit.amount = 0,
        s.show({
            template: h.instant("global.loading")
        }),
        p.getEnvoyBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.envoy.banks = t.banks
        })
    }
    ,
    o.getEnvoyQrBanks = function() {
        o.envoyQr.banks = {},
        i.forms.deposit.ref = "",
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getEnvoyQrBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.envoyQr.banks = t.banks
        })
    }
    ,
    o.getEnvoyAmounts = function() {
        o.envoy.amounts = {},
        i.forms.deposit.ref = "",
        i.forms.deposit.amount = 0,
        s.show({
            template: h.instant("global.loading")
        }),
        p.getEnvoyAmounts({
            bank: i.forms.deposit.bank
        }, function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.envoy.amounts = t.amounts
        })
    }
    ,
    o.getPayGigaBanks = function() {
        o.paygiga.amounts = {},
        o.paygiga.banks = {},
        i.forms.deposit.ref = "",
        i.forms.deposit.amount = 0,
        s.show({
            template: h.instant("global.loading")
        }),
        p.getPayGigaBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.paygiga.banks = t.banks
        })
    }
    ,
    o.getPayGigaAmounts = function() {
        o.paygiga.amounts = {},
        i.forms.deposit.ref = "",
        i.forms.deposit.amount = 0,
        s.show({
            template: h.instant("global.loading")
        }),
        p.getPayGigaAmounts({
            bank: i.forms.deposit.bank
        }, function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.paygiga.amounts = t.amounts
        })
    }
    ,
    o.getRocketPayBanks = function() {
        o.rocketPay.banks = {},
        s.show({
            template: h.instant("global.loading")
        }),
        p.getRocketPayBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.rocketPay.banks = t.banks
        })
    }
    ,
    o.getAnindaKrediKartiBanks = function() {
        o.anindaKrediKarti.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getAnindaKrediKartiBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.anindaKrediKarti.banks = t.banks
        })
    }
    ,
    o.getPayminoHavaleBanks = function() {
        o.payMinoHavale.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getPayminoHavaleBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.payMinoHavale.banks = t.banks
        })
    }
    ,
    o.getExpressHavaleBanks = function() {
        o.expressHavale.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getExpressHavaleBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.expressHavale.banks = t.banks
        })
    }
    ,
    o.getHavaleProBanks = function() {
        o.havalePro.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getHavaleProBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.havalePro.banks = t.banks
        })
    }
    ,
    o.getFinPayBanks = function() {
        o.finPay.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getFinPayBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.finPay.banks = t.banks
        })
    }
    ,
    o.getJokerPayBanks = function() {
        o.jokerPay.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getJokerPayBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.jokerPay.banks = t.banks
        })
    }
    ,
    o.getYouPayBanks = function() {
        o.youPay.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getYouPayBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.youPay.banks = t.banks
        })
    }
    ,
    o.getMaMonPayBanks = function() {
        o.maMonPay.banks = {},
        i.forms.deposit.amount = "",
        s.show({
            template: h.instant("global.loading")
        }),
        p.getMaMonPayBanks(function(t) {
            s.hide(),
            "error" === t.type && i.showAlert("Uyarı", t.text, 3e3),
            o.maMonPay.banks = t.banks
        })
    }
    ,
    p.getCoins(function(t) {
        o.coins = t.data
    }),
    o.coinExchange = function(t, e, n) {
        o.coin = o.coins[t];
        t = 0;
        1 === n ? (o.coinAmount = i.forms.deposit.coin,
        o.coinAmount = o.coinAmount.toString(),
        o.coinAmount = o.coinAmount.replace(",", "."),
        t = o.coinAmount * o.coin * e,
        i.forms.deposit.coin = o.coinAmount.toString(),
        i.forms.deposit.amount = parseFloat(t).toFixed(3).toString()) : (o.amount = i.forms.deposit.amount,
        o.amount = o.amount.toString(),
        o.amount = o.amount.replace(",", "."),
        t = o.amount / e / o.coin,
        i.forms.deposit.amount = o.amount.toString(),
        i.forms.deposit.coin = parseFloat(t).toFixed(5).toString())
    }
    ,
    o.setTimer = function(t) {
        o.countDown = t,
        r.cancel(o.timer),
        o.timer = r(function() {
            o.countDown--,
            o.countDown <= 0 && r.cancel(o.timer)
        }, 1e3)
    }
    ,
    o.setStatus = function(t) {
        o.qrStatus = 2,
        s.show({
            template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
        }),
        3 === t && (o.qrResponse.data.photo = "",
        o.qrResponse.data.qrURL = "",
        o.countDown = 0),
        p.qrSetStatus({
            status: t
        }, function(t) {
            o.qrStatus !== t.status && s.hide(),
            o.qrStatus = t.status
        })
    }
    ,
    o.setRefInfo = function() {
        o.refStatus = 2,
        o.refButton = !0,
        s.show({
            template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
        }),
        p.refSetInfo(o.refForm, function(t) {
            o.refStatus !== t.status && s.hide(),
            o.refStatus = t.status,
            o.refButton = !1
        })
    }
    ,
    o.instantQrSetInfo = function(t) {
        1 === t ? (o.instantQr.status = 0,
        s.show({
            template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen karşınıza çıkacak olan sizden talep edilen şifre alanını doldurunuz."
        })) : (o.instantQr.status = 2,
        s.show({
            template: "<ion-spinner></ion-spinner> <br /><br /> Lütfen bekleyiniz, işlem sonucu bekleniyor.."
        })),
        o.instantQr.button = !0,
        o.instantQr.form.type = t,
        p.instantQRSetInfo(o.instantQr.form, function(t) {
            o.instantQr.status !== t.status && s.hide(),
            o.instantQr.form = {},
            o.instantQr.status = t.status,
            o.instantQr.button = !1
        })
    }
    ,
    o.openQR = function() {
        return e.go("app.qr-payment"),
        !0
    }
    ,
    o.openRef = function(t) {
        return e.go(t),
        !0
    }
    ,
    l.fromTemplateUrl("qr-modal.html", {
        scope: o,
        animation: "slide-in-up"
    }).then(function(t) {
        o.qrModal = t
    }),
    l.fromTemplateUrl("ecopayz.html", {
        scope: o,
        animation: "slide-in-up"
    }).then(function(t) {
        o.ecoPayzModal = t
    }),
    o.openEcoPayzModal = function() {
        o.ecoPayzModal.show()
    }
    ,
    o.closeEcoPayzModal = function() {
        o.ecoPayzModal.hide(),
        i.login()
    }
    ,
    o.openEcoPayz = function() {
        return g.open(o.methods.ecoPayz, "_blank"),
        !1
    }
    ,
    o.openEcoPayzDraw = function() {
        return g.open(o.methods.ecoPayzDraw, "_blank"),
        !1
    }
    ,
    o.openVisa = function() {
        return g.open(o.methods.visa, "_blank"),
        !1
    }
    ,
    o.openJetonDeposit = function() {
        return g.open(o.methods.jetonDeposit, "_blank"),
        !1
    }
    ,
    o.openJetonDraw = function() {
        return g.open(o.methods.jetonDraw, "_blank"),
        !1
    }
    ,
    o.openPaPara = function() {
        return g.open(o.methods.paPara, "_blank"),
        !1
    }
    ,
    o.openJetCMT = function() {
        return g.open(o.methods.jetCMT, "_blank"),
        !1
    }
    ,
    o.openCoinnor = function() {
        return g.open(o.methods.coinnor, "_blank"),
        !1
    }
    ,
    o.openEnvoyQR = function() {
        return g.open(o.methods.envoyQR, "_blank"),
        !1
    }
    ,
    o.openCreditCard = function() {
        return i.showAlert("Uyarı", "Lütfen bekleyiniz, kredi kartı ekranı açılacak", 1e3),
        t(function() {
            g.open(o.methods.creditcard, "_blank")
        }, 1e3),
        !1
    }
    ,
    l.fromTemplateUrl("paykwik.html", {
        scope: o,
        animation: "slide-in-up"
    }).then(function(t) {
        o.payKwikModal = t
    }),
    o.openPayKwikModal = function() {
        o.payKwikModal.show()
    }
    ,
    o.closePayKwikModal = function() {
        o.payKwikModal.hide(),
        i.login()
    }
    ,
    o.selectedDate1 = "",
    o.dateChange = function(t) {
        var e = t.getFullYear()
          , n = t.getMonth() + 1
          , t = t.getDate();
        return (t <= 10 ? "0" + t : t) + "/" + (n <= 10 ? "0" + n : n) + "/" + e
    }
    ,
    o.openDatePickerOne = function(t) {
        a.openDatePicker({
            callback: function(t) {
                t = new Date(t);
                o.selectedDate1 = o.dateChange(t),
                i.forms.deposit.transaction_date = o.dateChange(t),
                i.forms.deposit.birth_date = o.dateChange(t)
            },
            templateType: "popup"
        })
    }
    ,
    o.copyTextToClipboard = function(t) {
        var e = document.createElement("textarea");
        e.style.position = "fixed",
        e.style.top = 0,
        e.style.left = 0,
        e.style.width = "2em",
        e.style.height = "2em",
        e.style.padding = 0,
        e.style.border = "none",
        e.style.outline = "none",
        e.style.boxShadow = "none",
        e.style.background = "transparent",
        e.value = t,
        document.body.appendChild(e),
        e.focus(),
        e.select();
        try {
            var n = document.execCommand("copy")
              , a = (n && i.showAlert("Bilgi", "Kopyalandı", 1e3),
            n ? "successful" : "unsuccessful");
            console.log("Copying text command was " + a)
        } catch (t) {
            console.log("Oops, unable to copy")
        }
        document.body.removeChild(e)
    }
}
]),
app.controller("PromotionCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "$ionicLoading", "$ionicPopup", "$ionicModal", "$sce", "Auth", "Promotion", "$translate", function(n, a, t, e, o, i, r, s, l, u, c, p) {
    i.show({
        template: p.instant("global.loading")
    }),
    n.promotions = {},
    n.activePromo = {},
    n.joinButton = !1,
    a.bonus_code = "",
    c.get(function(t) {
        i.hide(),
        n.promotions = t
    }),
    n.join = function(t, e) {
        a.joinButton = !0,
        i.show({
            template: p.instant("global.loading")
        }),
        c.join({
            id: t,
            bonus_code: e
        }, function(t) {
            n.showAlert("Bonus", t.text, 3e3),
            a.joinButton = !1,
            i.hide()
        })
    }
    ,
    s.fromTemplateUrl("promotion.html", {
        scope: n,
        animation: "slide-in-up"
    }).then(function(t) {
        n.modal = t
    }),
    n.openModal = function(t) {
        n.activePromo = t,
        n.modal.show()
    }
    ,
    n.closeModal = function() {
        n.modal.hide(),
        a.login()
    }
}
]),
app.controller("RegisterCtrl", ["$scope", "$rootScope", "$ionicLoading", "Auth", "$timeout", "$state", "$location", "$translate", function(n, t, e, a, o, i, r, s) {
    n.getQueryParams = function(t) {
        t = t.split("+").join(" ");
        for (var e, n = {}, a = /[?&]?([^=]+)=([^&]*)/g; e = a.exec(t); )
            n[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
        return n
    }
    ,
    n.getParams = n.getQueryParams(document.location.search),
    e.show({
        template: s.instant("global.loading")
    }),
    o(function() {
        e.hide(),
        null !== t.auth && "app.register" != i.current.name && i.current.name
    }, 1e3),
    n.countries = {},
    n.currency = {},
    a.countries(function(t) {
        e.hide(),
        n.countries = t
    }),
    a.currency(function(t) {
        e.hide(),
        n.currency = t.data
    }),
    n.dates = [],
    n.initDates = function() {
        for (var t = (new Date).getFullYear() - 18; 1920 <= t; t--)
            n.dates.push(t)
    }
    ,
    n.initDates(),
    n.register = {
        terms: !0,
        country: "",
        phone1: "+90",
        currency_id: ""
    },
    n.success = !1,
    n.currentIndex = 0;
    var l = $(".form-section")
      , o = (n.navigateTo = function(t) {
        $(".form-navigation .previous").toggle(0 < t);
        var e = t >= l.length - 1;
        $(".form-navigation .next").toggle(!e),
        $(".form-navigation [type=submit]").toggle(e),
        n.currentIndex = t
    }
    ,
    n.curIndex = function() {
        return n.currentIndex
    }
    ,
    n.previous = function() {
        var t = n.curIndex();
        0 != t && 0 < t ? n.navigateTo(t - 1) : n.navigateTo(0)
    }
    ,
    n.next = function() {
        $(".register-form").parsley().validate({
            group: "block-" + n.curIndex()
        }) && n.navigateTo(n.curIndex() + 1)
    }
    ,
    n.tcKimlik = function(t) {
        var e = Number(t.substring(0, 1)) + Number(t.substring(1, 2)) + Number(t.substring(2, 3)) + Number(t.substring(3, 4)) + Number(t.substring(4, 5)) + Number(t.substring(5, 6)) + Number(t.substring(6, 7)) + Number(t.substring(7, 8)) + Number(t.substring(8, 9)) + Number(t.substring(9, 10))
          , e = String(e);
        return e.substring(e.length, e.length - 1) == t.substring(10, 11)
    }
    ,
    n.send = function() {
        if (n.register.ref = n.getParams.ref,
        e.show({
            template: s.instant("global.loading")
        }),
        n.register._token = t.token,
        n.register.phone = n.register.phone1 + n.register.phone2,
        void 0 === n.register.birth_date1)
            return n.showAlert(s.instant("auth.register.t40"), s.instant("auth.register.t41"), 3e3),
            e.hide(),
            !1;
        if (void 0 === n.register.birth_date2)
            return n.showAlert(s.instant("auth.register.t40"), s.instant("auth.register.t41"), 3e3),
            e.hide(),
            !1;
        if (void 0 === n.register.birth_date3)
            return n.showAlert(s.instant("auth.register.t40"), s.instant("auth.register.t41"), 3e3),
            e.hide(),
            !1;
        if (n.register.birth_date = n.register.birth_date1 + "/" + n.register.birth_date2 + "/" + n.register.birth_date3,
        1 == n.register.country) {
            if (void 0 === n.register.identity_number)
                return n.showAlert(s.instant("auth.register.t40"), s.instant("auth.register.t42"), 3e3),
                e.hide(),
                !1;
            if (!n.tcKimlik(n.register.identity_number))
                return n.showAlert(s.instant("auth.register.t40"), s.instant("auth.register.t42"), 3e3),
                e.hide(),
                !1;
            a.register(n.register, function(t) {
                "success" === t.type ? (n.success = !0,
                e.hide(),
                n.showAlert(s.instant("auth.register.t40"), t.text, 3e3),
                i.go("app.main")) : (e.hide(),
                "validation.required" == t.text && (t.text = s.instant("auth.register.t43")),
                n.showAlert(s.instant("auth.register.t40"), t.text, 3e3))
            })
        } else
            a.register(n.register, function(t) {
                "success" === t.type ? (n.success = !0,
                e.hide()) : (e.hide(),
                "validation.required" == t.text && (t.text = s.instant("auth.register.t43"))),
                n.showAlert(s.instant("auth.register.t40"), t.text, 3e3)
            });
        console.log(n.register)
    }
    ,
    l.each(function(t, e) {
        $(e).find(":input").attr("data-parsley-group", "block-" + t)
    }),
    n.navigateTo(n.currentIndex),
    r.search());
    n.forgotActivate = !1,
    void 0 !== o.code ? n.forgotActivate = !0 : n.forgotActivate = !1,
    n.forgot = {
        type: "username",
        code: o.code
    },
    n.changePassword = function() {
        return n.forgot.action = 2,
        e.show({
            template: s.instant("global.loading")
        }),
        void 0 === n.forgot.password1 || void 0 === n.forgot.password2 ? (e.hide(),
        n.showAlert(s.instant("auth.register.t44"), s.instant("auth.register.t43"), 3e3),
        !1) : n.forgot.password1 != n.forgot.password2 ? (e.hide(),
        n.showAlert(s.instant("auth.register.t44"), s.instant("auth.register.t45"), 3e3),
        !1) : void a.forgotPassword(n.forgot, function(t) {
            e.hide(),
            "success" == t.type ? (n.post = !1,
            n.showAlert(s.instant("auth.register.t44"), t.text, 3e3),
            i.go("app.main")) : n.showAlert(s.instant("auth.register.t44"), t.text, 3e3)
        })
    }
    ,
    n.forgotten = function() {
        n.forgot.action = 1,
        e.show({
            template: s.instant("global.loading")
        }),
        a.forgotPassword(n.forgot, function(t) {
            e.hide(),
            "success" == t.type ? (n.post = !1,
            n.showAlert(s.instant("auth.register.t44"), t.text, 3e3),
            i.go("app.main")) : n.showAlert(s.instant("auth.register.t44"), t.text, 3e3)
        })
    }
}
]),
app.controller("SportCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$ionicLoading", "$ionicPopup", "ionicDatePicker", "$ionicModal", "$sce", "baseURL", "$stateParams", "$translate", function(i, r, t, s, e, n, a, o, l, u, c, p, d, m, g) {
    i.BetslipState = {
        betslipEventsCount: 0,
        betslipIsVisible: !1
    },
    i.listener = function(t) {
        var e = $("#sportsBook")
          , n = document.querySelector("#betslipNotificationWrap")
          , t = (n ? (n.classList.add("NoSelections"),
        n.addEventListener("click", function() {
            e[0].contentWindow.postMessage({
                type: "GMCMS:goToBetslip"
            }, "*")
        }),
        n.querySelector(".BetslipIndicatorCounter")) : console.warn("There is no betslip button available!"),
        t.data);
        if (t) {
            var a = t.type
              , o = t.payload;
            switch (a) {
            case "OMFE:setIFrameHeight":
                0 < o && e.height(o);
                break;
            case "OMFE:showOverlay":
                document.body.classList.add("OMFE-showOverlay");
                break;
            case "OMFE:hideOverlay":
                document.body.classList.remove("OMFE-showOverlay");
                break;
            case "OMFE:goToRegister":
                s.transitionTo("app.register");
                break;
            case "OMFE:goToLogin":
                s.transitionTo("app.login");
                break;
            case "OMFE:betPlaced":
                $(document).trigger("BALANCE_UPDATED"),
                r.login();
                break;
            case "OMFE:locationChanged":
                o.basePath && o.hash && o.offset && window.scrollTo({
                    top: e.offset().top + o.offset
                });
                break;
            case "OMFE:scrollTop":
                window.scrollTo({
                    top: 0
                });
                break;
            case "OMFE:updateBetslipSelectionsCount":
                o.count,
                i.BetslipState.betslipEventsCount = o.count,
                i.redrawBetslip();
                break;
            case "OMFE:betslipInitialized":
                n.classList.add("BetslipVisible"),
                i.BetslipState.betslipEventsCount = o.count,
                i.redrawBetslip();
                break;
            case "OMFE:betslipDestroyed":
                n.classList.remove("BetslipVisible"),
                i.BetslipState.betslipEventsCount = o.count,
                i.redrawBetslip();
                break;
            case "OMFE:sessionTerminated":
                window.location.reload()
            }
        }
    }
    ,
    r.$on("$locationChangeSuccess", function(t, e, n) {
        window.removeEventListener("message", i.listener)
    }),
    t(function() {
        window.addEventListener("message", i.listener)
    }, 1e3),
    i.redrawBetslip = function() {
        $("#betslipNotificationWrap .notification").text(i.BetslipState.betslipEventsCount),
        i.BetslipState && 0 < i.BetslipState.betslipEventsCount && !i.BetslipState.betslipIsVisible ? $("#betslipNotificationWrap").show() : $("#betslipNotificationWrap").hide()
    }
}
]),
app.controller("SuggestionCtrl", ["$scope", "$rootScope", "$ionicLoading", "$ionicPopup", "Auth", "$timeout", "$state", "$stateParams", "Suggestion", function(e, t, n, a, o, i, r, s, l) {
    String.prototype.capitalize = function() {
        return this.toLowerCase().replace(/(^|\s)([a-z])/g, function(t, e, n) {
            return e + n.toUpperCase()
        })
    }
    ,
    e.type = {},
    e.department = {},
    i(function() {
        n.hide(),
        null !== t.auth || "app.suggestion" != r.current.name && "app.suggestion-show" != r.current.name && "app.suggestion-new" != r.current.name || r.go("app.main")
    }, 1e3),
    "app.suggestion" == r.current.name && (e.list = {},
    e.getList = function() {
        n.show(),
        l.get(function(t) {
            n.hide(),
            e.list = t.suggestion,
            e.type = t.types,
            e.department = t.department
        })
    }
    ,
    e.getList()),
    "app.suggestion-create" == r.current.name && (e.suggestion = {},
    e.create = function() {
        n.show(),
        l.create(e.suggestion, function(t) {
            n.hide(),
            "success" != t.type ? a.alert({
                title: "Durum",
                template: t.text
            }) : r.go("app.suggestion")
        })
    }
    ),
    "app.suggestion-show" == r.current.name && (e.suggestion = {},
    e.answers = {},
    e.answer = {},
    e.getSuggestion = function(t) {
        n.show(),
        l.show(t, function(t) {
            n.hide(),
            e.suggestion = t.suggestion,
            e.answers = t.answer,
            e.type = t.types,
            e.department = t.department
        })
    }
    ,
    e.send = function() {
        n.show(),
        l.answer({
            id: e.suggestion.id,
            message: e.answer.message
        }, function(t) {
            n.hide(),
            "success" != t.type ? a.alert({
                title: "Durum",
                template: t.text
            }) : (e.answer.message = "",
            e.getSuggestion({
                id: s.id
            }))
        })
    }
    ,
    e.getSuggestion({
        id: s.id
    }))
}
]),
app.controller("TombalaCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "$ionicLoading", "$ionicPopup", "$ionicModal", "$sce", "$window", "Auth", "Casino", "$translate", function(o, i, t, e, n, r, a, s, l, u, c, p, d) {
    o.height = u.innerHeight + 100,
    r.show({
        template: d.instant("global.loading")
    }),
    o.game = {},
    o.loading = 1,
    o.error = !1,
    p.getTombala(function(t) {
        var e, n, a;
        r.hide(),
        o.loading = 0,
        "success" != t.type ? (i.showAlert(d.instant("global.notice"), t.text, 2e3),
        o.error = !0) : (t.url = l.trustAsResourceUrl(t.url),
        o.game = t,
        e = window,
        t = document,
        n = "//static.lgio.net/lg-f.js?v=" + Date.now(),
        a = "lgf",
        e.LGFrameObject = a,
        e.lgf = e.lgf || function() {
            (e.lgf.q = e.lgf.q || []).push(arguments)
        }
        ,
        e.lgf.l = +new Date,
        a = t.createElement("script"),
        t = t.getElementsByTagName("script")[0],
        a.async = 1,
        a.src = n,
        t.parentNode.insertBefore(a, t),
        lgf("config", {
            container: "lgf-container",
            origin: "",
            params: {
                sign: o.game.token,
                homepage: window.location.hostname
            }
        }))
    })
}
]),
app.controller("TransactionsCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$ionicLoading", "$ionicPopup", "ionicDatePicker", "Auth", "Transactions", "$translate", "$ionicModal", function(e, n, t, a, o, i, r, s, l, u, c) {
    e.dateChange = function(t) {
        var e = t.getFullYear()
          , n = t.getMonth() + 1
          , t = t.getDate();
        return (t <= 10 ? "0" + t : t) + "/" + (n <= 10 ? "0" + n : n) + "/" + e
    }
    ,
    e.selectedDate1 = e.dateChange(new Date),
    e.selectedDate2 = e.dateChange(new Date),
    e.openDatePickerOne = function(t) {
        r.openDatePicker({
            callback: function(t) {
                t = new Date(t);
                e.selectedDate1 = e.dateChange(t),
                n.filter.date1 = t
            },
            templateType: "popup"
        })
    }
    ,
    e.openDatePickerTwo = function(t) {
        r.openDatePicker({
            callback: function(t) {
                t = new Date(t);
                e.selectedDate2 = e.dateChange(t),
                n.filter.date2 = t
            },
            templateType: "popup"
        })
    }
    ,
    o.show({
        template: u.instant("global.loading")
    }),
    t(function() {
        o.hide(),
        null === n.auth && "app.transactions" == a.current.name && a.go("app.main")
    }, 1e3),
    n.filter = {
        service: "all",
        page: 1,
        date1: new Date,
        date2: new Date
    },
    e.transactions = {
        all: {},
        bingo: {},
        bet: {},
        casino: {},
        transaction: {}
    },
    c.fromTemplateUrl("transaction-detail.html", {
        scope: e,
        animation: "slide-in-up"
    }).then(function(t) {
        e.detailModal = t
    }),
    e.openDetailModal = function(t) {
        o.show({
            template: u.instant("global.loading")
        }),
        e.activeTransaction = t,
        l.getById({
            id: t.id
        }, function(t) {
            o.hide(),
            e.activeTransaction.detail = t.data
        }),
        e.detailModal.show()
    }
    ,
    e.getTransactions = function() {
        o.show({
            template: u.instant("global.loading")
        }),
        l.get(n.filter, function(t) {
            o.hide(),
            "all" == e.filter.service && (e.transactions.all = t),
            "tombala" == e.filter.service && (e.transactions.bingo = t),
            "coupon" == e.filter.service && (e.transactions.bet = t),
            "casino" == e.filter.service && (e.transactions.casino = t),
            "transaction" == e.filter.service && (e.transactions.transaction = t)
        })
    }
    ,
    e.filterDate = function() {
        return e.getTransactions()
    }
    ,
    e.filterReset = function() {
        e.selectedDate1 = "",
        e.selectedDate2 = ""
    }
    ,
    e.getTransactions()
}
]),
app.controller("UserCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "$ionicLoading", "$ionicPopup", "$sce", "Auth", "$translate", function(e, n, t, a, o, i, r, s, l, u) {
    i.show({
        template: u.instant("global.loading")
    }),
    t(function() {
        null != n.auth || "app.change-password" != a.current.name && "app.user-information" != a.current.name || (a.go("app.main"),
        n.showAlert(u.instant("global.notice"), u.instant("auth.login.t6"), 3e3))
    }, 1e3);
    var c = document.createElement("div");
    e.decodeHTMLEntities = function(t) {
        return t && "string" == typeof t && (t = (t = t.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")).replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, ""),
        c.innerHTML = t,
        t = c.textContent,
        c.textContent = ""),
        t
    }
    ,
    e.countries = {},
    e.password = {},
    e.information = {
        country: 1
    },
    l.login("", function(t) {
        n.auth = t.user,
        e.information = {
            address: e.decodeHTMLEntities(n.auth.detail.address),
            birth_date: n.auth.detail.birth_date,
            country: n.auth.detail.country_id,
            city: e.decodeHTMLEntities(n.auth.detail.city),
            phone: n.auth.detail.phone,
            team: e.decodeHTMLEntities(n.auth.detail.team)
        },
        $("select").trigger("click")
    }),
    l.countries(function(t) {
        i.hide(),
        e.countries = t
    }),
    e.saveInformation = function() {
        i.show({
            template: u.instant("global.loading")
        }),
        l.changeInformation(e.information, function(t) {
            i.hide(),
            n.showAlert(u.instant("global.notice"), t.text, 3e3)
        })
    }
    ,
    e.changePassword = function() {
        return e.password.hasOwnProperty("old_password") ? e.password.hasOwnProperty("pass") ? e.password.pass.length < 6 ? (n.showAlert(u.instant("global.notice"), u.instant("auth.change-password.t11"), 3e3),
        !1) : e.password.hasOwnProperty("pass_confirmation") ? e.password.pass != e.password.pass_confirmation ? (n.showAlert(u.instant("global.notice"), u.instant("auth.change-password.t13"), 3e3),
        !1) : (i.show({
            template: u.instant("global.loading")
        }),
        void l.changePassword(e.password, function(t) {
            i.hide(),
            n.showAlert(u.instant("global.notice"), t.text, 3e3),
            "success" == t.type && (e.password = {})
        })) : (n.showAlert(u.instant("global.notice"), u.instant("auth.change-password.t12"), 3e3),
        !1) : (n.showAlert(u.instant("global.notice"), u.instant("auth.change-password.t10"), 3e3),
        !1) : (n.showAlert(u.instant("global.notice"), u.instant("auth.change-password.t9"), 3e3),
        !1)
    }
}
]),
app.controller("VirtualBettingCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "$ionicLoading", "$sce", "Auth", "Casino", "$window", "$translate", function(e, n, t, a, o, i, r, s, l, u, c) {
    e.height = u.innerHeight + 100,
    i.show({
        template: c.instant("global.loading")
    }),
    e.games = {},
    e.search = "",
    e.order = !0,
    e.game = {},
    e.getVirtualBetting = function() {
        l.getVirtualBetting(function(t) {
            e.games = t.list,
            i.hide()
        })
    }
    ,
    "app.virtual-betting" === a.current.name && e.getVirtualBetting(),
    "app.join-virtual-betting" === a.current.name && (e.status = !1,
    l.joinVirtualBetting(a.params.id, function(t) {
        i.hide(),
        "fail" === t.type ? (n.showAlert(c.instant("global.notice"), t.message, 3e3),
        a.go("app.virtual-betting")) : (e.status = !0,
        e.game = r.trustAsResourceUrl(t.game),
        "" !== e.game && u.location.replace(e.game))
    }))
}
]);
