/// <reference path="../typedefinitions/defs.d.ts" />
/// <reference path="service/ThemeService.ts" />

import {Theme, StandardTheme} from "./service/ThemeService";
import {ThemeService, StandardThemeService} from "./service/ThemeService";
module mithlond {

    // Create the 'mithlond-web' module.
    angular.module("mithlond-web", []);

    /*
    appModule.controller("MyController", ["$scope", ($scope)
        => new Application.Controllers.MyController($scope)]);

    appModule.factory("MyService", ["$http", "$location", ($http, $location)
        => new Application.Services.MyService($http, $scope)]);

    appModule.directive("myDirective", ()
        => new Application.Directives.MyDirective());
    */
}