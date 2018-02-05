require('chromedriver');
const webdriver = require('selenium-webdriver');

// open the browser from node
let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()
    .get('http://www.google.com');
