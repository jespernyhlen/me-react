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
test.describe('Register', function() {
    test.beforeEach(function(done) {
        this.timeout(10000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();
        browser.get('http://localhost:3000/register');
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
                console.log(type);
                assert.equal(type, target);
            });
        });
    }

    function assertFormName(target) {
        browser.findElement(By.name(target)).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, 'text');
            });
        });
    }

    // Test case
    test.it('Test register', function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, 'Jesper Nyhlén - JS-Ramverk');
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, 'Jesper Nyhlén - JS-Ramverk');
        });

        assertH1('Registrera användare');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test form name', function(done) {
        assertFormName('name');

        done();
    });

    // Test case
    test.it('Test form lastname', function(done) {
        assertFormName('lastName');

        done();
    });

    // Test case
    test.it('Test form date', function(done) {
        assertFormName('year');

        done();
    });

    // Test case
    test.it('Test form email', function(done) {
        assertForm('email');

        done();
    });

    // Test case
    test.it('Test form password', function(done) {
        assertForm('password');

        done();
    });
});
