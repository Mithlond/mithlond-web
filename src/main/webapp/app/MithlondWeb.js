(function () {
    'use strict';

    // 1) Instantiate all dependency module instances.
    angular.module('mithlond', []);

    // 2) Create application instance; inject dependency module references.
    var app = angular.module('MithlondWebApp', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'mithlond']);

    // 3) Configure the application.
    //    ("Constructor" call, invoked before scopes are defined/injected.)
    app.config(['$routeProvider', function ($routeProvider) {

        // Define routes
        $routeProvider.when('/news/current', {
            templateUrl: 'app/modules/mithlond/news/current.html',
            controller: 'mithlondController'
        }).when('/peopleDetails/:jpaId', {
            templateUrl: 'app/modules/mithlond/peopleDetailView.html',
            controller: 'mithlondController'
        }).otherwise({
            redirectTo: '/news/current'
        });
    }
    ]);

    // 4) Initialize the application's rootScope state.
    //    ("Constructor" call, invoked *after* scopes are defined/injected.)
    app.run(['$http', '$rootScope', function ($http, $rootScope) {

        /**
         * Singleton function for creating a Theme structure.
         *
         * @param name The name of the returned Theme. Must not contain whitespace, and should be a
         * legal CSS class name. The name of the selected theme is added as a CSS class to the 'body' element.
         * @param structureID The optional id of the structure path used for including header and footer markup files.
         * Must not contain whitespace, and defaults to 'standard'
         */
        $rootScope.createTheme = function (name, structureID) {

            /**
             * The active theme's name.
             */
            this.name = name;

            /**
             * The structureID of the themes. Defaults to 'standard' if not supplied.
             */
            this.structureID = (typeof structureID === 'undefined') ? 'standard' : structureID;

            /**
             * Retrieves a path to the theme's Footer file, which should be an include-able HTML file.
             * @returns {string} The path to the theme's Footer file, which should be an include-able HTML file.
             */
            this.footer = function () {
                return 'app/shared/theme/' + this.structureID + '/footer.html';
            };

            /**
             * Retrieves a path to the theme's top NavBar file, which should be an include-able HTML file.
             * @returns {string} The path to the theme's top NavBar file, which should be an include-able HTML file.
             */
            this.topNavBar = function () {
                return 'app/shared/theme/' + this.structureID + '/topNavbar.html';
            }
        };

        /**
         * Sets the theme with the supplied themeName as the active/selected theme.
         *
         * @param themeName The name of the theme to select.
         */
        $rootScope.setTheme = function (themeName) {

            // Check sanity
            if (typeof themeName === 'string' || themeName instanceof String) {

                // Find the theme with the supplied name
                for (var i = 0; i < $rootScope.themes.length; i++) {
                    if ($rootScope.themes[i].name == themeName) {

                        // Set the new (?) theme
                        $rootScope.theme = $rootScope.themes[i];

                        // All done.
                        return;
                    }
                }
            }
        };

        // Shared state: All available themes.
        $rootScope.themes = [
            new $rootScope.createTheme('mellow'),
            new $rootScope.createTheme('nazgul'),
            new $rootScope.createTheme('sylvan')];

        // Shared state: The active theme.
        $rootScope.setTheme('sylvan');
    }]);
}());