(function () {
    'use strict';

    // 1) Define the article service.
    var articleService = angular.module('articleService', ['ngRoute', 'ngSanitize', 'ngResource']);

    articleService.service();
})();