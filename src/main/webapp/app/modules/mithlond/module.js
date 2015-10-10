var mithlond = angular.module('mithlond', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngResource']);

mithlond.factory('mithlond', function ($resource) {

            // Internal state
            // TODO: Replace this static data by data retrieved from WebSocket call.
            var menus = [{}];
            var selected = "";

            // Public accessors
            return {

                /**
                 * Retrieves the menus.
                 *
                 * @returns {*[]} An array containing Menu Objects, and sub-arrays containing sub-menus.
                 */
                getMenus: function () {
                    return menus;
                }
            };
        })
        .controller('mithlondController', ['$scope', '$routeParams', 'mithlond',
            function ($scope, $routeParams, mithlond) {

                // Make the members accessible in the scope
                $scope.mithlond = mithlond.get();

                // If we have detail information, expose it in the scope.
                if ($routeParams.jpaId != 'Undefined') {
                    mithlond.select($routeParams.jpaId);
                    $scope.id = $routeParams.jpaId;
                }
            }]);