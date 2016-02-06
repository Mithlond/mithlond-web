(function () {
    'use strict';

    // 1) Retrieve the article module.
    var articleModule = angular.module('articleService', ['ngRoute', 'ngSanitize', 'ngResource']);

    // 2) Create the directives within the module.
    articleModule.directive('articles', ['$scope', 'articleService', function ($scope, articleService) {
        /*
         <articles organisation="mithlond" category="news" limit="5">
         <article  ....>
         </article>
         </articles>
         */
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                organisation: '=',
                category: '=',
                limit: '='
            },
            replace: true,
            controller: function ($scope, element, attr) {

                // Internal state
                var articles = $scope.articles = [];
                articleService.init(organisation, category, limit);

                this.addArticle = function fetchArticles(category) {

                    // TODO: Retrieve the articles from the backend service
                    articles.push(article);
                }
            },
            templateUrl: 'article.html'
        }
    }]);

    articleModule.directive('article', ['$scope', function ($scope) {
        /*
         <article title="Some title" author="Das Häxxmästare" created="2015-02-15 15:43>
         ...
         </article>
         */

        return {
            restrict: 'E',
            require: '^articles',
            transclude: true,
            scope: {
                title: '=',
                author: '=',
                created: '='
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
            templateUrl: 'article.html'
        }
    }]);
})();