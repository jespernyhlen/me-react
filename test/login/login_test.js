/**
 * Test for getting started with Selenium.
 */
'use strict';

const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;

// Does not work with WSL!! Use cygwin

// Test suite
test.describe('Login', function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .build();
        browser.get('http://localhost:8082/login');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

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

    function assertBtn(target) {
        browser.findElement(By.css('button')).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    function assertForm(target) {
        browser.findElement(By.name(target)).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    // Test case
    test.it('Test login', function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, 'Jesper Nyhlén - JS-Ramverk');
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, 'Jesper Nyhlén - JS-Ramverk');
        });

        assertH1('Logga in användare');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test form email', function(done) {
        assertForm('email');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test form password', function(done) {
        assertForm('password');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test form submit', function(done) {
        assertBtn('submit');
        matchUrl('login');

        done();
    });
});
