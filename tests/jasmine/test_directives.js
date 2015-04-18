describe('Directives', function () {
    'use strict';
    var scope;
    var element;

    beforeEach(module('airyDirectives'));

    describe('test week selector', function () {
        var element;
        var compile;

        beforeEach(inject(function (_$compile_, $rootScope) {
            compile = _$compile_;
            scope = $rootScope.$new();
            scope.range = {
                beg: '2015-04-13T00:00:00+03:00',
                end: '2015-04-19T23:59:59+03:00',
            };
            element = angular.element('<div range-selector range="range"></div>');
        }));

        it('should show the date range', function () {
            compile(element)(scope);
            scope.$digest();
            expect(element.find('span').text()).toBe('13.04.15 — 19.04.15');
        });

        it('should shift the date range back and forward', function () {
            compile(element)(scope);
            scope.$digest();
            element.find('.shift-back').click();
            expect(scope.range.beg).toBe('2015-04-06T00:00:00+03:00');
            expect(scope.range.end).toBe('2015-04-12T23:59:59+03:00');

            element.find('.shift-forward').click();
            expect(scope.range.beg).toBe('2015-04-13T00:00:00+03:00');
            expect(scope.range.end).toBe('2015-04-19T23:59:59+03:00');
        });
    });
});
