angular.module('dinamo.services', [])

.factory('Main', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    getPages: function(callback) {
      $http({
        method: 'GET',
        url: apiURL + '/get/pages',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getSliders: function(callback) {
      $http({
        method: 'GET',
        url: apiURL + '/get/sliders',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template :  $translate.instant('global.warning')
        });
      });
    }
  }
}])

.factory('Auth', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {

    token: function(callback) {
      $http({
        method: 'GET',
        url: apiURL + '/auth/token',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    register: function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/register',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    login: function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/login',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    logout : function(callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/logout',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    changePassword: function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/change-password',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    changeInformation: function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/information',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    forgotPassword: function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/forgot-password',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    countries: function(callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/countries',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    currency: function(callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/currency',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    }
  };
}])

.factory('Transactions', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    get : function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/get/activities',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    getById : function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/get/transaction',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getBonus : function(callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/get/bonus',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    setDiscountType : function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/set/discount/type',
        data: data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

  }
}])

.factory('Promotion', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    get: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/promotion',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    join: function (data, callback) {
      $http({
        method: 'POST',
        data : data,
        url: apiURL + '/promotion/join',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    }
  }
}])

.factory('Suggestion', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    get: function (callback) {
      $http({
        method: 'GET',
        url: apiURL + '/auth/suggestion',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    show: function (data, callback) {
      $http({
        method: 'GET',
        data : data,
        url: apiURL + '/auth/suggestion/show/' + data.id,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    answer: function (data, callback) {
      $http({
        method: 'POST',
        data : data,
        url: apiURL + '/auth/suggestion/show/' + data.id,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    create: function (data, callback) {
      $http({
        method: 'POST',
        data : data,
        url: apiURL + '/auth/suggestion/create',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    }
  }
}])

.factory('Casino', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    getLive: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/everymatrix/live',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getSlot: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/everymatrix/slot?vendor=' + data['vendor'],
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    getXProLive: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/xpro/mobile',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    joinLive: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/everymatrix/live/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    joinSlot: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/everymatrix/slot/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    getTombala: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/tombala',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    getLuckyStreakLive: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/lucky-streak/live',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getLuckyStreakSlot: function (type, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/lucky-streak/slot/' + type,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },


    getPragmaticPlaySlot: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/pragmatic-play',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    joinPragmaticPlaySlot: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/pragmatic-play/play/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    joinLuckyStreakLive: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/lucky-streak/live/play/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    joinLuckyStreakSlot: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/lucky-streak/slot/play/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },


    getEzugiLive: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/ezugi/live',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    joinEzugiLive: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/ezugi/live/play/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getVirtualBetting: function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/virtual-betting',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    joinVirtualBetting: function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/get/virtual-betting/play/' + data,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

  }
}])

.factory('Payments', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    getMethod : function(data, callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/payments/' + data + '?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    deposit : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/get/deposit',
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {

          callback(data);

        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    draw : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/get/draw',
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    exchange : function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/payments/exchange?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },
    qrCheck : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/check?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    qrSetStatus : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/set/qr/status?t='+ new Date().getTime(),
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getCoins : function (callback) {
      $http({
        method: 'POST',
        url: apiURL + '/auth/get/coins?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    refCheck : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/check/ref?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    refSetInfo : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/set/ref/info?t='+ new Date().getTime(),
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    instantQrCheck : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/check/qr?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    instantQRSetInfo : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/set/qr?t='+ new Date().getTime(),
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getVideos : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/payment/videos',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getEnvoyAmounts : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/envoy/amounts?t='+ new Date().getTime(),
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    getEnvoyBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/envoy/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getEnvoyQrBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/envoy/qr/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getPayGigaAmounts : function (data, callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/paygiga/amounts?t='+ new Date().getTime(),
        withCredentials: true,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getPayGigaBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/paygiga/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getRocketPayBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/rocketpay/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getPayminoHavaleBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/paymino-havale/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    getExpressHavaleBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/express-havale/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    getAnindaKrediKartiBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/aninda/kredikarti/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function (data) {
        callback(data);
      })
      .error(function () {
        $ionicPopup.alert({
          title : $translate.instant('global.info'),
          template : $translate.instant('global.warning')
        });
      });
    },

    getHavaleProBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/havale-pro/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getMaMonPayBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/mamonpay/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getFinPayBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/finpay/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getJokerPayBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/jokerpay/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },

    getYouPayBanks : function (callback) {
      $http({
        method: 'POST',
        url: apiURL+ '/auth/deposit/get/youpay/bank/list?t='+ new Date().getTime(),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
  }
}])

.factory('Bank', ['$http', '$ionicPopup', 'apiURL', '$translate', function($http, $ionicPopup, apiURL, $translate) {
  return {
    list: function (callback) {
      $http({
        method: 'GET',
        url: apiURL + '/auth/bank',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    create: function (data,callback) {
      $http({
        method: 'POST',
        data : data,
        url: apiURL + '/auth/bank/create',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    get: function (data, callback) {
      $http({
        method: 'GET',
        data : data,
        url: apiURL + '/auth/bank/update/' + data.id,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    update: function (data, callback) {
      $http({
        method: 'POST',
        data : data,
        url: apiURL + '/auth/bank/update/' + data.id,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    },
    delete: function (id, callback) {
      $http({
        method: 'POST',
        data : {'id' : id},
        url: apiURL + '/auth/bank/delete/' + id,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function (data) {
          callback(data);
        })
        .error(function () {
          $ionicPopup.alert({
            title : $translate.instant('global.info'),
            template : $translate.instant('global.warning')
          });
        });
    }
  }
}]);