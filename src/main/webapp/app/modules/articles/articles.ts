module org.mithlond.modules {

    class Article {

        /**
         * Creates an article object wrapping the supplied data.
         * None of the data should be empty.
         *
         * @param title The title of this article.
         * @param author The article author.
         * @param created The date when this article was created.
         * @param markupContent The content/data of this article.
         */
        constructor(public title:string,
                    public author:string,
                    public created:string,
                    public markupContent:string) {
        }
    }

    class Articles {

        // Internal state
        retrieved:Array<Article>;
        hostURL:string;

        /**
         * Creates a new Articles retrieval object, which may retrieve data from the supplied
         *
         * @param organisation The organisation for which articles should be retrieved.
         * @param category The category of articles to retrieve.
         * @param limit The maximum number of articles to retrieve. Must be at least 1.
         * @param debug If {@code true}, use a debug host (localhost:8080).
         */
        constructor(public organisation:string,
                    public category:string,
                    public limit:number = 5,
                    debug:boolean = false) {

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
        public getURL():string {
            return this.hostURL + this.organisation + "/" + this.category + "/" + this.limit;
        }
    }
}