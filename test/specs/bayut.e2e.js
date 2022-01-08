const MainPage = require('../pageobjects/main.page');
const ListingsPage = require('../pageobjects/listinngs.page');

function nameParse(name){
    formatedName = name.toLowerCase().replace(/ /g, "-").replace("---", "-");
    switch (formatedName){
        case "jumeirah-lake-towers":
            return formatedName+"-jlt";
        case "jumeirah-village-circle":
            return formatedName+"-jvc";
        case "jumeirah-beach-residence":
            return formatedName+"-jbr";
        default:
            return formatedName
    }
}
async function regionNames(regionList){
    var list = [];
    for (const region of regionList){
        list.push(nameParse(await region.getText()));
    }
    return list;
}

async function regionLinks(regionList){
    var list = [];
    for (const region of regionList){
        list.push(await region.$("a"));
    }
    return list;
}

describe('Test beyut.com', () => {
    it('all proprieties in the Dubai Marina area need to contain the keyword Dubai Marina', async () => {
        await MainPage.open();
        await MainPage.enterLocation("Dubai Marina");
        await MainPage.selectBuyPurpose();
        await MainPage.goToListings();
        await expect(browser).toHaveUrlContaining('https://www.bayut.com/for-sale/property/dubai/dubai-marina/');
        await ListingsPage.refuseCookies();
        var canContinue = true;
        do{
            const descriptionsList = await ListingsPage.descriptionOfListings;
            for (const element of descriptionsList){
                await expect(element).toHaveTextContaining('Dubai Marina');
            }
            const nextInput = await ListingsPage.buttonNextPage;
            canContinue = await nextInput.isExisting();

            if(canContinue){
                await nextInput.click();
                await new Promise(r => setTimeout(r, 250));

            }
            
        }while(canContinue);
    });

    it("all items listed under To Rent/Dubai Apartments should have working links", async () =>{
        await MainPage.open();
        await MainPage.goToRent();
        await MainPage.viewAll();
        const numberOfListedRegions = await MainPage.listOfRegionsFromDubaiAppartments.length;
        const listedRegions = await MainPage.listOfRegionsFromDubaiAppartments;
        const listedRegionsNames = await regionNames(listedRegions);
        const listedRegionsLinks = await regionLinks(listedRegions);
        for (var i = 0;i< numberOfListedRegions;i++){
            await listedRegionsLinks[i].click();
            await expect(browser).toHaveUrlContaining(`https://www.bayut.com/to-rent/apartments/dubai/${listedRegionsNames[i]}/`);
            await new Promise(r => setTimeout(r, 500));

            await browser.back();
            await MainPage.goToRent();
            await MainPage.viewAll();
        }
    });
});


