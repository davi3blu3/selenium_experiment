# Selenium Experiment

A simple setup for experimenting with Selenium in node.js for browser automation.


### Getting Started

1. Clone or fork this repo.
2. Run `npm install` to download dependencies.
3. Node 8 is required to use async & await
4. You need browser drivers for selenium to work. Most documentation I found recommends adding the drivers to your local system path / $PATH - in the interest of simplicity I used npm packages and 'required' them into each file.
5. I had much better luck with 'chromedriver' than 'geckodriver' ... had some compatibility issues with Firefox Quantum, so these examples will use Chrome v63.


### Test 1: from MDN
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment

I followed this tutorial to get started, and had some issues.  This test was passing intermittently, and when it failed kept throwing big hairy `Unhandled promise rejection` errors and warning that unhandled promise rejections were deprecated and need to be handled, or else they terminate the node.js process.

I added this snippet to satisfy this warning and simplify error output: http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html

A few tweaks were necessary to get the test passing consistently.  I saved the 'q' element in a variable instead of trying to 'find' it twice - the second of which was coming back as a 'stale' element. Instead of hitting Tab and then finding the Search button and clicking it, I changed it to send Return to initiate the search. I moved the quit() command into the final promise outputting the test results. Then I got it passing consistently ... compare the original code in branch 'inital' verses final code in branch 'master'.

### Test 2
http://seleniumhq.github.io/selenium/docs/api/javascript/

This example requires node 8+ as it makes heavy use of async await to handle all the promises returned from accessing the DOM.

### Test 3