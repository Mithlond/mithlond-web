angular.module('mithlond')
        .factory('mithlond', function () {

            // Internal state
            // TODO: Replace this static data by data retrieved from WebSocket call.
            var people = [{
                jpaId: 25,
                firstName: 'Johannes',
                lastName: 'Brahms',
                birthday: '1833-05-07T00:00:00Z'
            }, {
                jpaId: 29,
                firstName: 'Ludvig',
                lastName: 'van Beethoven',
                birthday: '1770-12-17T00:00:00Z'
            }, {
                jpaId: 382,
                firstName: 'Antonio',
                lastName: 'Vivaldi',
                birthday: '1678-03-04T00:00:00Z'
            }];
            var selected = -1;

            // Public accessors
            return {

                get: function () {
                    return people;
                },

                select: function (jpaId) {
                    selected = jpaId;
                },

                find: function (index) {
                    return people[index];
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