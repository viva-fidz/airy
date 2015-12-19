(function () {
    'use strict';

    angular
        .module('airy.clientForm')
        .controller('ClientUpdateController', ClientUpdateController);

    function ClientUpdateController($scope, clientResource, client) {
        $scope.client = angular.copy(client);
        $scope.formTitle = 'Client #' + client.id;
        $scope.submitForm = updateClient;

        function updateClient() {
            clientResource.update($scope.client).success(function (data) {
                angular.extend(client, data.client);
                $scope.closeThisDialog();
            });
        }
    }
})();