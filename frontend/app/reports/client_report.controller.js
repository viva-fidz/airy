export const PERIODS = [
    {
        label: '1 week',
        updateRange: (range) => {
            range.beg = moment(range.beg).startOf('isoWeek').format();
            range.end = moment(range.beg).endOf('isoWeek').format();
        },
        shiftBack: (range) => {
            range.beg = moment(range.beg).subtract(1, 'week').format();
            range.end = moment(range.beg).endOf('isoWeek').format();
        },
        shiftForward: (range) => {
            range.beg = moment(range.beg).add(1, 'week').format();
            range.end = moment(range.beg).endOf('isoWeek').format();
        },
    },
    {
        label: '2 weeks',
        updateRange: (range) => {
            range.beg = moment(range.beg).startOf('isoWeek').format();
            range.end = moment(range.beg).add(1, 'week').endOf('isoWeek').format();
        },
        shiftBack: (range) => {
            range.beg = moment(range.beg).subtract(1, 'week').format();
            range.end = moment(range.beg).add(1, 'week').endOf('isoWeek').format();
        },
        shiftForward: (range) => {
            range.beg = moment(range.beg).add(1, 'week').format();
            range.end = moment(range.beg).add(1, 'week').endOf('isoWeek').format();
        },
    },
    {
        label: '4 weeks',
        updateRange: (range) => {
            range.beg = moment(range.beg).startOf('isoWeek').format();
            range.end = moment(range.beg).add(3, 'week').endOf('isoWeek').format();
        },
        shiftBack: (range) => {
            range.beg = moment(range.beg).subtract(1, 'week').format();
            range.end = moment(range.beg).add(3, 'week').endOf('isoWeek').format();
        },
        shiftForward: (range) => {
            range.beg = moment(range.beg).add(1, 'week').format();
            range.end = moment(range.beg).add(3, 'week').endOf('isoWeek').format();
        },
    },
    {
        label: '1 month',
        updateRange: (range) => {
            range.beg = moment(range.beg).startOf('month').format();
            range.end = moment(range.beg).endOf('month').format();
        },
        shiftBack: (range) => {
            range.beg = moment(range.beg).subtract(1, 'month').format();
            range.end = moment(range.beg).endOf('month').format();
        },
        shiftForward: (range) => {
            range.beg = moment(range.beg).add(1, 'month').format();
            range.end = moment(range.beg).endOf('month').format();
        },
    },
];


class ClientReportController {

    constructor($scope, $stateParams, $rootScope, airyBreadcrumbs,
                clientResource, calculator) {
        this._stateParams = $stateParams;
        this._rootScope = $rootScope;
        this._breadcrumbs = airyBreadcrumbs;
        this._clientResource = clientResource;
        this._calculator = calculator;

        this.report = {};
        this.client = {};
        this.periods = PERIODS;
        this.period = this.periods[0];

        this.range = {
            beg: moment().startOf('isoWeek').format(),
            end: moment().endOf('isoWeek').format(),
        };

        $scope.$watch('$ctrl.range', () => this.getReport(), true);
    }

    getReport() {
        this._clientResource.getReport(this._stateParams.clientId, this.range).then(response => {
            let data = response.data;
            this._rootScope.title = data.report.client.name + ' :: Task report';
            this._breadcrumbs.add({
                label: data.report.client.name,
                state: 'client_detail',
                params: {clientId: data.report.client.id},
            }, {
                label: 'Task report',
            });
            this.report = data.report;
            this.client = data.report.client;
        });
    }

    setPeriod() {
        this.period.updateRange(this.range);
    }

    showCalculator(duration) {
        this._calculator.show(duration);
    }

    sendByEmail() {
        this._clientResource.sendReport(this._stateParams.clientId, this.range);
    }
}

export default ClientReportController;
