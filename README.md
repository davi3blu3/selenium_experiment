# Selenium Experiment

A simple setup for experimenting with Selenium in node.js for browser automation.


### Getting Started

1. Clone or fork this repo.
2. Run `npm install` to download dependencies.
3. Node 8 is required to use async & await in examples 2 & 3.
4. You need browser drivers for selenium to work. Most documentation I found recommends adding the drivers to your local system path / $PATH - in the interest of simplicity I used npm packages and 'required' them into each file.
5. I had much better luck with 'chromedriver' than 'geckodriver' ... had some compatibility issues with Firefox Quantum, so these examples will use Chrome v63.


### Test 1: from MDN example
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment

I followed this tutorial to get started, and had some issues.  This test was passing intermittently, and when it failed kept throwing big hairy `Unhandled promise rejection` errors and warning that unhandled promise rejections were deprecated and need to be handled, or else they terminate the node.js process.

I added this snippet to satisfy this warning and simplify error output: http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html

A few tweaks were necessary to get the test passing consistently.  I saved the 'q' element in a variable instead of trying to 'find' it twice - the second of which was coming back as a 'stale' element. Instead of hitting Tab and then finding the Search button and clicking it, I changed it to send Return to initiate the search. I moved the quit() command into the final promise outputting the test results. Then I got it passing consistently ... compare the original code in branch 'initial' verses final code in branch 'master'.

Run from the console with `node test1.js`

### Test 2: from Selenium HQ example
http://seleniumhq.github.io/selenium/docs/api/javascript/

This example requires node 8+ as it makes heavy use of async await to handle the promises returned from querying the DOM.  It worked pretty well as written, also using the Return key instead of Tab, Click.  I modified it slightly to console a successful test when the result page title was accessed. Compare the original code in branch 'initial' verses final code in branch 'master'.

Run from the console with `node test2.js`

The selenium link also had useful documentation for the selenium API.

### Test 3: filling out a form
After playing with these examples I wanted to see if I could fill out a web form. I started with the same setup as test 2, and altered from there. The form is at https://www.tn.gov/environment/contacts/ask-tdec-questions.html and I collected element ids from all of the inputs I wanted to access.

I inserted driver.sleep methods after each step, to make it easier to watch what's happening in the browser during the test. These aren't neccessary.

I struggled with making a selection from the drop down menus, because I wanted to iterate through all the <options> nested under each <select> to compare with my input. But the array returned was inside a promise object, and each element itself was a promise object.  I eventually declared variables that I could later save the options arrays to inside of a .then method.  Then the text comparison had to be made within another .then method as I iterated with a filter.

This test is only on the master branch.

Run from the console with `node test3.js`