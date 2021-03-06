/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        //to loop through each feed, check if each feed
        //has url defined and not empty
        it('have valid URLs', function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
                expect(element.url.length).toBeGreaterThan(0);
            });
        });

        //to loop through each feed, check if each feed
        //has name defined and not empty
        it('have valid names', function() {
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).toBeGreaterThan(0);                
            });
        });
    });

    //the test suite is for the menu
    describe('The menu', function() {

        //local variables
        var body = $('body');
        var menuIcon = $('.menu-icon-link');
        
        it('hide by default', function() {
            //check if body has 'menu-hidden' class to be hidden
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //test if visibility is changed when menu icon is clicked
        it('change visibility when the menu icon is clicked', function() {
            menuIcon.click(); //simulate icon clicking
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuIcon.click();//simulate icon clicking again
            expect(body.hasClass("menu-hidden")).toBeTruthy();
        });

        //additional Test Coverage
        //test if the menu is hidden after the first feedlist link is clicked
        it('hide after the first feedlist link is clicked', function() {
            menuIcon.click();//simulate icon is clicked
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //simulate the first feedlist link is clicked
            $('ul.feed-list').find('a')[0].click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //test if the menu is hidden after the second feedlist link is clicked
        it('hide after the second feedlist link is clicked', function() {
            menuIcon.click();//simulate icon is clicked
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //simulate the second feedlist link is clicked
            $('ul.feed-list').find('a')[1].click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //test if the menu is hidden after the third feedlist link is clicked
        it('hide after the third feedlist link is clicked', function() {
            menuIcon.click();//simulate icon is clicked
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //simulate the third feedlist link is clicked
            $('ul.feed-list').find('a')[2].click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        //test if the menu is hidden after the forth feedlist link is clicked
        it('hide after the forth feedlist link is clicked', function() {
            menuIcon.click();//simulate icon is clicked
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            //simulate the forth feedlist link is clicked
            $('ul.feed-list').find('a')[3].click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

    });

    //this test is for initial entries
    describe('Initial Entries', function() {

        //call asynchronous function
        //call done() after it returns
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //begin testing
        it('are included in the feed container when the app is loaded initially', function() {
            //get the number of .entry element
            //Check if the number is greater than 0
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    //a new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //variable for old feed
        var oldContent;

        beforeEach(function(done) {
            //call asychronous function to get feed
            //Save it to oldContent
            //Then call asychronous function to load additional feed
            loadFeed(0, function() {
                oldContent = $('.feed').html();
                loadFeed(1, done);
            });
        });
        
        it('ensure the content actually changes after a new feed is loaded', function() {
            //get newContent
            //Then compare newContent with oldContent
            //to check if there is a change made
            expect($('.feed').html()).not.toEqual(oldContent);
        });
    });

}());
