require('chromedriver');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// Handing promise rejection simplifies error messages, and prevents deprecation warning
process.on('unhandledRejection', function(error) {
  console.log('unhandledRejection', error.message);
});

driver.get('http://www.google.com');

// this element was getting 'found' twice, and intermittently causing a 'stale' element error
var searchBar = driver.findElement(By.name('q'));

searchBar.sendKeys('webdriver');

driver.sleep(1000).then(function() {
  // Return key working better than TAB and click()
  searchBar.sendKeys(webdriver.Key.RETURN);
});

driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if(title === 'webdriver - Google Search') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
    // moved quit inside the last then method to prevent it getting called early
    driver.quit();
  });
});

