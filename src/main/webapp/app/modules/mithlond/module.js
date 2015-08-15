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
        .directive('articles', ['$scope', function($scope) {
            /*
             <articles category="mithlond/news">
                <article
                    title="Some title"
                    author="Das Häxxmästare"
                    created="2015-02-15 15:43>
                </article>
             </articles>
             */
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    category: '@'
                },
                replace: true,
                controller: function ($scope, $element) {

                    // Internal state
                    var articles = $scope.articles = [];

                    $scope.select = function (pane) {
                        angular.forEach(panes, function (pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                    };

                    this.addArticle = function (article) {
                        articles.push(pane);
                    }
                },
                template: '<div class="article">'
                + '<div class="article_title">{{}}</div></div>'
            }
        }])
        .directive('article', ['$scope', function ($scope) {
            /*
             <articles category="mithlond/news">
                <article
                    title="Some title"
                    author="Das Häxxmästare"
                    created="2015-02-15 15:43>
                    ...
                </article>
             </articles>
             */

            return {
                restrict: 'E',
                require: '^articles',
                transclude: true,
                scope: {
                    title: '@',
                    author: '@',
                    created: '@'
                },
                replace: true,
                controller: function ($scope, $element) {

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
                },
                template: '<div class="article">'
                + '<div class="article_title">{{}}</div></div>'
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