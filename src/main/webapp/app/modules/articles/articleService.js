(function () {
    'use strict';

    // 1) Define the article service.
    var articleService = angular.module('articleService', ['ngRoute', 'ngSanitize', 'ngResource']);

    /*
     <articles organisation="mithlond" category="news" limit="5">
     <article
     title="Some title"
     author="Das Häxxmästare"
     created="2015-02-15 15:43>
     </article>
     </articles>
     */

    //
    // 2) Create the article retrieval service.
    //    Use factory style to enable private state.
    //
    articleService.factory('articleRetrievalService', ['$resource', function ($resource) {

        // Internal state
        var hostURL = ($scope.debug ? "http://localhost:8080/" : "https://www.jguru.se/") + "service";

        // Use ngResource to acquire the data from the host.
        return $resource(
                hostURL + '/:organisation/articles/:category/:limit',
                {
                    organisation: '=',
                    category: '=',
                    limit: '='
                },
                {
                    get: {method: 'GET', params: {limit: 5}, isArray: true}
                }
        );
    }]).factory('articleService', ['articleRetrievalService', function (articleRetrievalService) {

        // Internal state
        var toReturn;
        var articlesDefinition = function () {

            // Shared state
            this.organisation = 'unknown';
            this.category = 'unknown';
            this.limit = 5;
            this.articles = [];
            this.completed = false;

            // Public API
            this.init = function (organisation, category, limit) {

                // Assign internal state
                this.organisation = organisation;
                this.category = category;
                this.limit = limit;

                // Find the tag list
                this.articles = articleRetrievalService.get({}, {
                    organisation: this.organisation,
                    category: this.category,
                    limit: this.limit
                }, function () {
                    toReturn.completed = true;
                });

                // All done.
                return this;
            };

            /**
             * @returns {boolean} True there are articles matching the criteria supplied to this articleService.
             */
            this.hasArticles = function () {
                return this.articles.length > 0;
            };
        };

        // All done.
        toReturn = new articlesDefinition('unknown', 'unknown');
        return toReturn;
    }]);

    //
    // 3) Create the articles directive which uses the articleService to acquire article data.
    //
    articleService.directive('articles', ['$scope', 'articleService', function ($scope, articleService) {
        /*
         <articles organisation="mithlond" category="news" limit="5">
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
            template: '<div class="article">'
            + '<div class="article_title">{{}}</div></div>'
        }
    }]);

    articleService.directive('article', ['$scope', function ($scope) {
        /*
         <articles organisation="mithlond" category="news">
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
            template: '<div class="article">'
            + '<div class="article_title">{{}}</div></div>'
        }
    }]);
})();