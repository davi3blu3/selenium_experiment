require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

// error handling or console will yell at you
process.on('unhandledRejection', function (error) {
  console.log('unhandledRejection', error.message);
});

async function formTest(testCase) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {

    await driver.get('https://www.tn.gov/environment/contacts/ask-tdec-questions.html');

    // locate input fields & selection options
    let firstName = driver.findElement(By.id('field45752983-first')),
      lastName = driver.findElement(By.id('field45752983-last')),
      email = driver.findElement(By.id('field45781628')),
      emailConfirm = driver.findElement(By.id('field49455846')),
      topicSelect = driver.findElement(By.id('field45781633')),
      countySelect = driver.findElement(By.id('field45784636')),
      question = driver.findElement(By.id('field45785718')),
      submit = driver.findElement(By.id('fsSubmitButton2475700'));

    // populate test values into form
    await driver.sleep(200)
      .then(() => {
        firstName.sendKeys(testCase.firstName);
        return driver.sleep(200);
      })
      .then(() => {
        lastName.sendKeys(testCase.lastName);
        return driver.sleep(200);
      })
      .then(() => {
        email.sendKeys(testCase.email);
        return driver.sleep(200);
      })
      .then(() => {
        emailConfirm.sendKeys(testCase.email);
        driver.sleep(500);
      })
      .then(() => {
        topicSelect.click()
        .then(() => {
          driver.sleep(200);
          return driver.findElements(By.css('#field45781633 option'));
        })
        .then((arr) => {
          // iterate through array
          arr.filter((topic) => {
            return topic.getText().then((text) => {
              // match text and select element
              if (text === testCase.topic) {
                topic.click();
              }
            })
          })
        });
      });



    await countySelect.click()
      .then(() => {
        driver.sleep(200);
        return driver.findElements(By.css('#field45784636 option'));
      })
      .then((arr) => {
        // iterate through array
        arr.filter((county) => {
          // match text and select element
          return county.getText().then((text) => {
            if (text === testCase.county) {
              county.click();
            }
          })
        });
      }).then(() => {
        question.sendKeys(testCase.question);
      });



    // I'm not going to actually submit this form:
    // await submit.click();
    // await driver.sleep(3000);
    // If next page has expected title, Test passed.

  } finally {
    // pause to see result before quitting
    await driver.takeScreenshot()
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

const test2 = {
  _id: 2,
  firstName: 122345,
  lastName: null,
  email: "test@yourmom.com",
  topic: "Energy",
  county: "Davidson",
  question: "This is a test. Test question for a test field in a test form on an internal TDEC browser testing thingy designed by Testy McTesterson. I repeat, this is just a test. Please disregard."
}

formTest(test1);