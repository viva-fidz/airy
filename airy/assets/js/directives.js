(function () {
    'use strict';

    angular
        .module('airyDirectives', [])
        .directive('airyHeader', airyHeader)
        .directive('airyFooter', airyFooter)
        .directive('autoFocus', autoFocus)
        .directive('rangeSelector', rangeSelector);

    function airyHeader(airyUser) {
        return {
            restrict: 'A',
            templateUrl: 'static/partials/header.html',
            scope: {},
            link: function (scope, element) {
                scope.user = airyUser.user;
            }
        };
    }

    function airyFooter(airyUser) {
        return {
            restrict: 'A',
            templateUrl: 'static/partials/footer.html',
            scope: {},
            link: function (scope, element) {
                scope.user = airyUser.user;
                scope.logoutUser = airyUser.logout;
            }
        };
    }

    function autoFocus($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $timeout(function () {
                    element[0].focus();
                }, 10);
            }
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
                range: '='
            },
            link: function (scope, element) {
                scope.formatRange = function () {
                    var rangeBeg = moment(scope.range.beg);
                    var rangeEnd = moment(scope.range.end);
                    return rangeBeg.format('DD.MM.YY') + ' — ' + rangeEnd.format('DD.MM.YY');
                };

                scope.shiftBack = function () {
                    scope.range.beg = moment(scope.range.beg).subtract(1, 'week').format();
                    scope.range.end = moment(scope.range.end).subtract(1, 'week').format();
                };

                scope.shiftForward = function () {
                    scope.range.beg = moment(scope.range.beg).add(1, 'week').format();
                    scope.range.end = moment(scope.range.end).add(1, 'week').format();
                };
            }
        };
    }
})();
