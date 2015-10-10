var org;
(function (org) {
    var mithlond;
    (function (mithlond) {
        var modules;
        (function (modules) {
            var Article = (function () {
                /**
                 * Creates an article object wrapping the supplied data.
                 * None of the data should be empty.
                 *
                 * @param title The title of this article.
                 * @param author The article author.
                 * @param created The date when this article was created.
                 * @param markupContent The content/data of this article.
                 */
                function Article(title, author, created, markupContent) {
                    this.title = title;
                    this.author = author;
                    this.created = created;
                    this.markupContent = markupContent;
                }
                return Article;
            })();
            var Articles = (function () {
                /**
                 * Creates a new Articles retrieval object, which may retrieve data from the supplied
                 *
                 * @param organisation The organisation for which articles should be retrieved.
                 * @param category The category of articles to retrieve.
                 * @param limit The maximum number of articles to retrieve. Must be at least 1.
                 * @param debug If {@code true}, use a debug host (localhost:8080).
                 */
                function Articles(organisation, category, limit, debug) {
                    if (limit === void 0) { limit = 5; }
                    if (debug === void 0) { debug = false; }
                    this.organisation = organisation;
                    this.category = category;
                    this.limit = limit;
                    // Check sanity
                    if (limit < 1) {
                        this.limit = 5;
                    }
                    // Assign internal state
                    this.hostURL = (debug ? "http://localhost:8080/" : "https://www.jguru.se/") + "service/";
                }
                /**
                 * Retrieves the URL from which to acquire the articles.
                 * @returns {string} the URL from which to acquire the articles.
                 */
                Articles.prototype.getURL = function () {
                    return this.hostURL + this.organisation + "/" + this.category + "/" + this.limit;
                };
                return Articles;
            })();
        })(modules = mithlond.modules || (mithlond.modules = {}));
    })(mithlond = org.mithlond || (org.mithlond = {}));
})(org || (org = {}));
