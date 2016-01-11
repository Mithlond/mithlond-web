/// <reference path="../../typedefinitions/defs.d.ts" />

/**
 * Interface specifying the contents of a theme.
 */
export interface Theme {

    /**
     * A single-word identifier for this Theme. Must be unique within the known suite of themes.
     * Must also be identical to a CSS class to be applied to the topmost body element as an ng-data-class
     * on the form: data-ng-class="theme.id"
     */
    id : string;

    /**
     * The CSS class to apply for this Theme. Should typically be identical to the theme id.
     */
    cssClass : string;

    /**
     * Retrieves a name for this Theme. Typically used within Menus, Checkboxes or equivalent.
     */
    getName(locale:string) : string;

    /**
     * Retrieves the available locales for this Theme.
     */
    availableLocales : string[];
}

export class StandardTheme implements Theme {

    // State
    id:string;
    cssClass:string;
    private names:Array<string>;
    availableLocales:Array<string>;

    /**
     * Creates a new StandardTheme wrapping the supplied data.
     *
     * @param id The id of this Theme.
     * @param names An array with names of this Theme in various locales. The first name in the array is
     * considered the default name.
     * @param locales An array with locale definitions. The size of this array must match the size of the names
     * array.
     * @param cssClass An optional CSS class, which should be applied if this Theme is active.
     */
    constructor(id:string,
                private names:Array<string>,
                locales:Array<string>,
                cssClass?:string) {

        // Check sanity
        if (names.length != locales.length) {
            throw new TypeError("The names and locales parameter must be of equal lengths.");
        }

        // Assign internal state
        this.id = id;
        this.cssClass = cssClass == null ? id : cssClass;
        this.names = names;
        this.availableLocales = locales;
    }

    /**
     * Retrieves the name of this Theme in the supplied locale.
     *
     * @param locale The locale for which the theme name should be retrieved.
     * @returns {string} The name of this Theme in the supplied locale, or the first name of this Theme if the
     * supplied locale was not defined.
     */
    getName(locale:string):string {

        // Find the index of the supplied locale
        var index:number = this.availableLocales.indexOf(locale);
        if (index == -1) {
            throw new TypeError("Locale '" + locale + "' not found. Known locales: " + this.availableLocales);
        }

        // All done.
        return this.names[index];
    }
}

/**
 * Specification for how to set and get Themes
 */
export interface ThemeService {

    /**
     * Retrieves all registered Themes.
     */
    getAvailableThemes() : Array<Theme>;

    /**
     * The currently active Theme.
     */
    activeTheme : Theme;
}

/**
 * Hard-coded ThemeService implementation.
 */
export class StandardThemeService implements ThemeService {

    // Internal state
    private static standardThemeNames = ["nazgul", "ocean", "silly", "sylvan"];
    private static standardThemes : Array<Theme> = [];
    activeTheme : Theme;

    constructor() {

        // Define the locales for which we should create theme names.
        var locales = ["sv", "en"];

        // Create all standard themes names.
        for(var tName in StandardThemeService.standardThemeNames) {

            // Add the swedish and english theme names.
            // However, make the first letter upper case.
            var upperCased = tName.charAt(0).toUpperCase() + tName.substr(1);

            // Add the Theme.
            var theme = new StandardTheme(tName, [upperCased, upperCased], locales, null);
            StandardThemeService.standardThemes.concat(theme);

            // Use the "ocean" theme as default.
            if(tName == "ocean") {
                this.activeTheme = theme;
            }
        }
    }

    /**
     * @returns {Array<Theme>} All available Themes
     */
    getAvailableThemes():Array<Theme> {
        return StandardThemeService.standardThemes;
    }
}