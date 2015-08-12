angular.module('mithlond')
        .factory('mithlond', function () {

            // Internal state
            // TODO: Replace this static data by data retrieved from WebSocket call.
            var menus = [{}];
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
        .directive('article', ['$scope', function ($scope) {

            /*
             <article>
             <title>...</title>
             <author>...</author>
             <created>...</created>
             <content>...</content>
             </article>
             */

            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    author: '@'
                },
                replace: true,
                /*controller: function ($scope, $element) {

                    $scope.select = function (pane) {
                        angular.forEach(panes, function (pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                    };

                    this.addPane = function (pane) {
                        if (panes.length == 0) {
                            $scope.select(pane);
                        }
                        panes.push(pane);
                    }
                },  */
                template: '<div class="article" data-ng-transclude></div>'
            }
        }])
        .directive('author', [function () {
            return {
                restrict: 'E',
                require: '^article',
                transclude: true,
                scope: {},
                controller: function ($scope, $element) {},
                replace: true,
                template: '<div class="author" data-ng-transclude></div>'
            }
        }])
        .directive('created', [function () {

            /*
             <article>
             <author>...</author>
             <created>...</created>
             <content>...</content>
             </article>
             */

            return {
                restrict: 'E',
                require: '^article',
                transclude: true,
                scope: {},
                controller: function ($scope, $element) {},
                replace: true,
                template: '<div class="created" data-ng-transclude></div>'
            }
        }])
        .directive('content', [function () {

            /*
             <article>
             <author>...</author>
             <created>...</created>
             <content>...</content>
             </article>
             */

            return {
                restrict: 'E',
                transclude: true,
                scope: {},
            }
        }])
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