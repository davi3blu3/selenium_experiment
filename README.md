# Selenium Experiment

A simple setup for experimenting with Selenium in node.js for browser automation.


### Getting Started

1. Clone or fork this repo.
2. Run `npm install` to download dependencies.


### Test 1: from MDN
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment

- I used npm browser drivers instead of installing chromedriver onto the system path
- I had much better luck with chromedriver than geckodriver
- adding them to $PATH will eventually make more sense if we start to use this tool more regularly. For now I erred towards portability.
- test1.js is from this article

This test was passing intermittently, and when it failed kept throwing big hairy `Unhandled promise rejection` errors and warning that unhandled promise rejections were deprecated and need to be handled, or else they terminate the node.js process.

Added code to handle this error from http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html

Still finicky and not passing consistently, until I made a few tweaks.  Saved the findElement into a variable - because it was getting 'found' twice, and sometimes coming back as 'stale'.

Instead of hitting Tab and then finding the Search button and clicking it, I changed it to send Return to initiate the search.

moved the quit() command into the final promise outputting the test results.

Then I got it passing 5 / 5 times.

### Test 2
http://seleniumhq.github.io/selenium/docs/api/javascript/
