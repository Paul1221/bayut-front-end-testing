

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get buttonRefuseCookies() {
        return $("button=Maybe Later");
    }

    get descriptionOfListings(){
        return $$("._7afabd84");
    }

    get buttonNextPage(){
        return $("//a[@title='Next']");
    }

    async refuseCookies(){
        await this.buttonRefuseCookies.click();
    }
}

module.exports = new SecurePage();
