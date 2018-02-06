require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

process.on('unhandledRejection', function(error) {
  console.log('unhandledRejection', error.message);
});

async function formTest( testCase ) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {

    await driver.get('https://www.tn.gov/environment/contacts/ask-tdec-questions.html');

    // locate input fields & selection options
    let inputFields = {
        firstName:      driver.findElement(By.id(  'field45752983-first'  )),
        lastName:       driver.findElement(By.id(  'field45752983-last'   )),
        email:          driver.findElement(By.id(  'field45781628'        )),
        emailConfirm:   driver.findElement(By.id(  'field49455846'        )),
        topicSelect:    driver.findElement(By.id(  'field45781633'        )),
        countySelect:   driver.findElement(By.id(  'field45784636'        )),
        question:       driver.findElement(By.id(  'field45785718'        )),
        options:        driver.findElements(By.css('option'               ))
    }

    // populate test values into form

    // await inputFields.firstName.sendKeys(testCase.firstName);
    // await driver.sleep(500);

    // await inputFields.lastName.sendKeys(testCase.lastName);
    // await driver.sleep(500);

    // await inputFields.email.sendKeys(testCase.email);
    // await driver.sleep(500);

    // await inputFields.emailConfirm.sendKeys(testCase.email);
    // await driver.sleep(500);

    await inputFields.topicSelect.click();
    await driver.sleep(100);
    for (var i = 0; i < inputFields.options.length; i++) {
        let optText = await inputFields.options[i].getText();
        if( optText == testCase.topic ){
            console.log('attempting to click ', optText);
            inputFields.options[i].click();
            break;
        }
    }
    await driver.sleep(500);

    await inputFields.countySelect.click();
    for (var j = 0; j < inputFields.options.length; j++) {
        let optText = await inputFields.options[j].getText();
        if( optText == testCase.county ){
            console.log('clicking county: ', optText);
            inputFields.options[j].click();
            break;
        }
    }
    await driver.sleep(500);

    await inputFields.question.sendKeys(testCase.question);
    await driver.sleep(500);

  } finally {

    await driver.quit();
  }
};

const test1 = {
  _id: 1,
  firstName: "Testy",
  lastName: "McTesterson",
  email: "testy@prodigy.net",
  topic: "Energy",
  country: "Rutherford",
  question: "This is a test. Test question for a test field in a test form on an internal TDEC browser testing thingy designed by Testy McTesterson. I repeat, this is just a test. Please disregard."
}

formTest( test1 );