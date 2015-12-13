(function () {
    'use strict';

    angular
        .module('airy.directives', [])
        .directive('autoFocus', autoFocus)
        .directive('rangeSelector', rangeSelector);

    function autoFocus($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $timeout(function () {
                    element[0].focus();
                }, 10);
            },
        };
    }

    function rangeSelector() {
        return {
            restrict: 'A',
            template: '\
                <a class="shift-back icon" ng-click="shiftBack()">l</a>\
                <span>{{ formatRange() }}</span>\
                <a class="shift-forward icon" ng-click="shiftForward()">r</a>\
            ',
            scope: {
                range: '=',
            },
            link: function (scope, element) {
                scope.formatRange = function () {
                    var rangeBeg = moment(scope.range.beg);
                    var rangeEnd = moment(scope.range.end);
                    return rangeBeg.format('DD.MM.YY') + ' — ' + rangeEnd.format('DD.MM.YY');
                };

                scope.shiftBack = function () {
                    var rangeBeg = moment(scope.range.beg);
                    var rangeEnd = moment(scope.range.end);
                    scope.range = {
                        beg: rangeBeg.subtract(1, 'week').format(),
                        end: rangeEnd.subtract(1, 'week').format(),
                    };
                };

                scope.shiftForward = function () {
                    var rangeBeg = moment(scope.range.beg);
                    var rangeEnd = moment(scope.range.end);
                    scope.range = {
                        beg: rangeBeg.add(1, 'week').format(),
                        end: rangeEnd.add(1, 'week').format(),
                    };
                };
            },
        };
    }
})();
