angular.module('dinamo.directives', [])

.directive('couponChange', ['$animate', '$timeout', function ($animate, $timeout) {
    return function (scope, elem, attr) {
        scope.$watch(attr.couponChange, function (nv, ov) {
            var c = 'bounceIn';
            $animate.removeClass(elem, c);
            $timeout(function(){
                $animate.addClass(elem, c);
            });
        });
    };
}])

.directive('match', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            match: '='
        },
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(function () {
                var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
            }, function (currentValue) {
                ctrl.$setValidity('match', currentValue);
            });
        }
    };
})

.directive('oddChange', ['$animate', function ($animate) {
    return function (scope, elem, attr) {
        scope.$watch(attr.oddChange, function (nv, ov) {
            if (nv != ov) {
                var c = nv > ov ? 'change-up' : 'change';
                $animate.removeClass(elem, 'change-up');
                $animate.removeClass(elem, 'change');
                $animate.addClass(elem, c, function () {
                    $animate.removeClass(elem, c);
                });
            }
        });
    };
}])

.directive('revolution', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $('.tp-banner').revolution(scope.$eval(attrs.revolution));
        }
    };
}])

.directive('anchorSmoothScroll', ['$location', function ($location) {
    'use strict';

    return {
        restrict: 'A',
        replace: false,
        scope: {
            'anchorSmoothScroll': '@'
        },

        link: function ($scope, $element, $attrs) {

            initialize();

            /* initialize -
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function initialize() {
                createEventListeners();
            }

            /* createEventListeners -
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function createEventListeners() {
                // listen for a click
                $element.on('click', function () {
                    // set the hash like a normal anchor scroll
                    $location.hash($scope.anchorSmoothScroll);

                    // smooth scroll to the passed in element
                    scrollTo($scope.anchorSmoothScroll);
                });
            }

            /* scrollTo -
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function scrollTo(eID) {

                // This scrolling function
                // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

                var i;
                var startY = currentYPosition();
                var stopY = elmYPosition(eID);
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY);
                    return;
                }
                var speed = Math.round(distance / 100);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (i = startY; i < stopY; i += step) {
                        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                        leapY += step;
                        if (leapY > stopY) leapY = stopY;
                        timer++;
                    }
                    return;
                }
                for (i = startY; i > stopY; i -= step) {
                    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                    leapY -= step;
                    if (leapY < stopY) leapY = stopY;
                    timer++;
                }
            }

            /* currentYPosition -
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (window.pageYOffset) {
                    return window.pageYOffset;
                }
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop) {
                    return document.documentElement.scrollTop;
                }
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) {
                    return document.body.scrollTop;
                }
                return 0;
            }

            /* scrollTo -
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                if (elm != null) {
                    var y = elm.offsetTop;
                    var node = elm;
                    while (node.offsetParent && node.offsetParent != document.body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    }
                    return y;
                }
            }
        }
    };
}])

.directive('angRoundProgress', ['$filter', function ($filter) {
    return {
        restrict: "AEC",
        link: function (scope, templateElement) {
            if (templateElement.length === 1) {

                var node = templateElement[0];

                var width = node.getAttribute('data-round-progress-width') || '400';
                var height = node.getAttribute('data-round-progress-height') || '400';

                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                canvas.setAttribute('data-round-progress-model', node.getAttribute('data-round-progress-model'));
                node.parentNode.replaceChild(canvas, node);

                var outerCircleWidth = node.getAttribute('data-round-progress-outer-circle-width') || '20';

                var outerCircleBackgroundColor = node.getAttribute('data-round-progress-outer-circle-background-color') || '#505769';
                var outerCircleForegroundColor = node.getAttribute('data-round-progress-outer-circle-foreground-color') || '#12eeb9';
                var labelColor = node.getAttribute('data-round-progress-label-color') || '#12eeb9';

                var outerCircleRadius = node.getAttribute('data-round-progress-outer-circle-radius') || '100';

                var labelFont = node.getAttribute('data-round-progress-label-font') || '50pt Calibri';
                var dataText = node.getAttribute('data-round-progress-data-text');
                var dateType = node.getAttribute('data-round-progress-date-type');
                var datePerc = parseInt(node.getAttribute('data-round-progress-date-percentage'));
                var expression = canvas.getAttribute('data-round-progress-model');
                scope.$watch(expression, function (newValue, oldValue) {
                    if (!!newValue) {
                        newValue.label = $filter('date')(newValue.start_date, dateType, 'UTC');
                        newValue.percentage = newValue.label / datePerc;
                        // Create the content of the canvas
                        var ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, width, height);
                        // The "background" circle
                        var x = width / 2;
                        var y = height / 2;
                        ctx.beginPath();
                        ctx.arc(x, y, parseInt(outerCircleRadius), 0, Math.PI * 2, false);
                        ctx.lineWidth = parseInt(outerCircleWidth);
                        ctx.strokeStyle = outerCircleBackgroundColor;
                        ctx.stroke();

                        // The inner number
                        ctx.font = labelFont;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = labelColor;
                        ctx.fillText(newValue.label, x, y - 7.5);
                        ctx.fillText(dataText, x, y + 7.5);

                        // The "foreground" circle
                        var startAngle = -(Math.PI / 2);
                        var endAngle = ((Math.PI * 2 ) * newValue.percentage) - (Math.PI / 2);
                        var anticlockwise = false;
                        ctx.beginPath();
                        ctx.arc(x, y, parseInt(outerCircleRadius), startAngle, endAngle, anticlockwise);
                        ctx.lineWidth = parseInt(outerCircleWidth);
                        ctx.strokeStyle = outerCircleForegroundColor;
                        ctx.stroke();
                    }
                }, true);

            }
        },
        replace: true
    }

}])

.directive("scroll", ['$window', function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 300) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
}])

.directive('iframeSetDimensionsOnload', [function(){
  return {
      restrict: 'A',
      link: function(scope, element, attrs){
          element.on('load', function(){
              /* Set the dimensions here,
               I think that you were trying to do something like this: */

              console.log(document.getElementsByClassName('scroll')[0]);

              var iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
              var iFrameWidth = '100%';
              element.css('width', iFrameWidth);
              element.css('height', iFrameHeight);

              document.getElementsByClassName('scroll')[0].style.height = iFrameHeight;
          })
      }
  }}])

.directive('angularMask', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      isModelValueEqualViewValues: '='
    },
    link: function ($scope, el, attrs, model) {
      $scope.$watch(function(){return attrs.angularMask;}, function(value) {
        if (model.$viewValue != null){
          model.$viewValue = mask(String(model.$viewValue).replace(/\D/g, ''));
          el.val(model.$viewValue);
        }
      });

      model.$formatters.push(function (value) {
        return value === null ? '' : mask(String(value).replace(/\D/g, ''));
      });

      model.$parsers.push(function (value) {
        model.$viewValue = mask(value);
        var modelValue = $scope.isModelValueEqualViewValues ? model.$viewValue : String(value).replace(/\D/g, '');
        el.val(model.$viewValue);
        return modelValue;
      });

      function mask(val) {
        var format = attrs.angularMask,
          arrFormat = format.split('|');

        if (arrFormat.length > 1) {
          arrFormat.sort(function (a, b) {
            return a.length - b.length;
          });
        }

        if (val === null || val == '') {
          return '';
        }
        var value = String(val).replace(/\D/g, '');
        if (arrFormat.length > 1) {
          for (var a in arrFormat) {
            if (value.replace(/\D/g, '').length <= arrFormat[a].replace(/\D/g, '').length) {
              format = arrFormat[a];
              break;
            }
          }
        }
        var newValue = '';
        for (var nmI = 0, mI = 0; mI < format.length;) {
          if (!value[nmI]) {
            break;
          }
          if (format[mI].match(/\D/)) {
            newValue += format[mI];
          } else {
            newValue += value[nmI];
            nmI++;
          }
          mI++;
        }
        return newValue;
      }
    }
}})
.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value);
      });
    }
  };
})
.directive('inputFloat', function(){
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel){
      if(attrs.type == 'number'){
        ngModel.$formatters.push(function(value){
          return parseFloat(value);
        });
      }
    }
  };
});