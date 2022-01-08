

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputLocation() {
        return $('.b9e5541a ._4610598b').$("input");
    }

    get inputPurpose() {
        return $('._9dc6d35d .e7c6503c .ef5cccac');
    }

    get inputFind() {
        return $('a=Find');
    }

    get inputBuy(){
        return $('button=Buy');
    }

    get searchOptionDubaiMarina(){
        return $("._0e756b14");
    }

    get buttonMostPopularToRent(){
        return $("//div[@class='d8530318']");
    }

    get listOfRegionsFromDubaiAppartments(){
        return $$("._22762832")[9].$$("li");
    }

    get buttonViewAll(){
        return $$("//div[@class='_2f838ff4 _5b112776 _29dd7f18']")[2];
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async enterLocation (location) {
        await this.inputLocation.setValue(location);
        await new Promise(r => setTimeout(r, 1000));
        await this.searchOptionDubaiMarina.click();
    }

    async selectBuyPurpose () {
        await this.inputPurpose.click();
        await this.inputBuy.click();
    }

    async goToListings(){
        await this.inputFind.click();
    }

    async goToRent(){
        const ceva = await this.buttonMostPopularToRent;
        await ceva.click();
        await new Promise(r => setTimeout(r, 500));

    }
    
    async viewAll(){
        const view = await this.buttonViewAll;
        await view.click();
        await new Promise(r => setTimeout(r, 1000));
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open();
    }
}

module.exports = new MainPage();
