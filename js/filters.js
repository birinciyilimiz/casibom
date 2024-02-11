'use strict';

/**
 * @ngdoc function
 * @name DinamoBet.filter:Filters
 * @description
 * # Filters
 * Filter of the DinamoBet
 */
angular.module('dinamo.filters', [])
  .filter('getById', function () {
    return function (input, index, key) {
      var i = 0,
        len = input.length;
      for (; i < len; i++) {
        if (+input[i][key] === +index) {
          return input[i];
        }
      }
      return null;
    };
  }).filter('multiplyByKey', function () {
    return function (data, key) {
      if (typeof(data) === 'undefined' || typeof(key) === 'undefined' || data.length === 0) {
        return 0;
      }

      var multiply = 1;
      for (var i = data.length - 1; i >= 0; i--) {
        multiply *= parseFloat(data[i][key]);
      }

      return multiply;
    };
  })
  .filter('collectByKey', function () {
    return function (data, key) {
      if (typeof(data) === 'undefined' || typeof(key) === 'undefined' || data.length === 0) {
        return 0;
      }

      var collect = 0;
      for (var i = data.length - 1; i >= 0; i--) {
        collect += parseFloat(data[i][key]);
      }

      return collect;
    };
  })
  .filter('timeFilter', function ($rootScope) {
    return function (input, min) {
      var filtered = [];
      var i = 0,
        len = input.length;

      for (; i < len; i++) {
        var timestamp = input[i].timestamp + '000';

        if (timestamp > parseInt(min) && timestamp < $rootScope.timezone + 86400000 + parseInt(min) - parseInt(min) % 86400000) {
          filtered.push(input[i]);
        } else if (min == 'all') {
          filtered.push(input[i]);
        }
      }

      return filtered;
    };

  })
  .filter('timeFilter2', function () {
    return function (input, min, key) {
      if (input) {
        var filtered = [];
        var i = 0,
          len = input.length;

        for (; i < len; i++) {

          var timestamp = input[i][key] + '000';
          timestamp = parseInt(timestamp);

          if (timestamp > parseInt(min)) {
            filtered.push(input[i]);
          }
        }

        return filtered;
      }
    };

  })
  .filter('unique', function () {

    return function (items, filterOn) {

      if (filterOn === false) {
        return items;
      }

      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        var hashCheck = {}, newItems = [];

        var extractValueToCompare = function (item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };

        angular.forEach(items, function (item) {
          var valueToCheck, isDuplicate = false;

          for (var i = 0; i < newItems.length; i++) {
            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }

        });
        items = newItems;
      }
      return items;
    };
  }).filter('toArray', function () {
    'use strict';
    return function (obj) {
      if (!(obj instanceof Object)) {
        return obj;
      }
      var result = [];
      angular.forEach(obj, function (obj, key) {
          obj.$key = key;
        result.push(obj);
      });
      return result;
    }
  })
.filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
      for (var i=0; i<total; i++)
        input.push(i);
      return input;
    };
  })
.filter('comma2decimal', [
  function() { // should be altered to suit your needs
    return function(value) {
      return value.toString().replace(/\,/g,'.');
    };
}]);