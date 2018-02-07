require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

// error handling or console will yell at you
process.on('unhandledRejection', function(error) {
  console.log('unhandledRejection', error.message);
});

async function formTest( testCase ) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {

    await driver.get('https://www.tn.gov/environment/contacts/ask-tdec-questions.html');

    // locate input fields & selection options
    let firstName =      driver.findElement(By.id(  'field45752983-first'  )),
        lastName =       driver.findElement(By.id(  'field45752983-last'   )),
        email =          driver.findElement(By.id(  'field45781628'        )),
        emailConfirm =   driver.findElement(By.id(  'field49455846'        )),
        topicSelect =    driver.findElement(By.id(  'field45781633'        )),
        countySelect =   driver.findElement(By.id(  'field45784636'        )),
        question =       driver.findElement(By.id(  'field45785718'        )),
        topicOptions,
        countyOptions,
        submit =        driver.findElement(By.id(   'fsSubmitButton2475700'));

    // populate test values into form
    await firstName.sendKeys(testCase.firstName);
    await driver.sleep(500);

    await lastName.sendKeys(testCase.lastName);
    await driver.sleep(500);

    await email.sendKeys(testCase.email);
    await driver.sleep(500);

    await emailConfirm.sendKeys(testCase.email);
    await driver.sleep(500);

    // open select component for Topic
    await topicSelect.click();
    await driver.sleep(200);

    // capture option elements from topic dropdown
    await driver.findElements(By.css('#field45781633 option'))
                .then(function(arr){
                  topicOptions = arr;
                });
    // iterate through each element (promise) and find match to click
    await topicOptions.filter((topic) => {
      return topic.getText().then((text) =>{
        if(text === testCase.topic) {
          topic.click();
        }
      })
    });
    await driver.sleep(500);


    // open select component for County
    await countySelect.click();
    await driver.sleep(200);

    // capture option elements from county dropdown
    await driver.findElements(By.css('#field45784636 option'))
                .then(function(arr){
                  countyOptions = arr;
                });

    // iterate through each element (promise) and find match to click
    await countyOptions.filter((county) => {
      return county.getText().then((text) => {
        if(text === testCase.county) {
          county.click();
        }
      })
    });
    await driver.sleep(500);

    await question.sendKeys(testCase.question);
    

    // I'm not going to actually submit this form:
    // await submit.click();
    // await driver.sleep(3000);
    // If next page has expected title, Test passed.

  } finally {
    // pause to see result before quitting
    await driver.sleep(3000);
    await driver.quit();
  }
};

// Test Cases
const test1 = {
  _id: 1,
  firstName: "Testy",
  lastName: "McTesterson",
  email: "test@yourmom.com",
  topic: "Energy",
  county: "Rutherford",
  question: "This is a test. Test question for a test field in a test form on an internal TDEC browser testing thingy designed by Testy McTesterson. I repeat, this is just a test. Please disregard."
}

formTest( test1 );