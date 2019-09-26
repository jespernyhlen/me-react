/**
 * Test for getting started with Selenium.
 */
'use strict';

const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

let browser;

// Does not work with WSL!! Use cygwin

// Test suite
test.describe('Navbar', function() {
    test.beforeEach(function(done) {
        this.timeout(10000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();
        browser.get('http://localhost:3000/');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css('h1')).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertReport() {
        browser
            .findElement(By.className('main-container'))
            .then(function(element) {
                assert.notEqual(element, null);
            });
    }

    // Test case
    test.it('Test home', function(done) {
        assertH1('Lite om mig');
        matchUrl('');

        done();
    });

    test.it('Test go to login', function(done) {
        // try use nav link
        goToNavLink('Logga in');

        assertH1('Logga in användare');
        matchUrl('login');

        done();
    });

    test.it('Test go to register', function(done) {
        goToNavLink('Registrera');

        // get h1 text
        assertH1('Registrera användare');
        matchUrl('register');

        done();
    });

    test.it('Test go to report', function(done) {
        goToNavLink('Vecka 1');

        assertReport();

        done();
    });
});
