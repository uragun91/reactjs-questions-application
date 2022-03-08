# Verification Checks

Below is a short walkthrough the code

- All the setup and base state is in the file `App.js` which renders the entire page.
- Any Error from the API/Dummy API will cause the Error Message to be shown on the main page.
- `App` fetches the checks data from the API and the uses modifier `disableSubsequentChecks` to make sure only the first check is enabled and as we answer more questions more questions become enabled as required by the Assignment.
- `App` uses the `Checks` component to display all the checks and `Checks` also handles any keyboard navigation details
- `Submit` handles the submission logic and also enables Enter to submit.
- `utils.js` contains utility functions needed to make sure the app works as per given requirements and keep the heavy logic inside small testable functions.

## Next Steps

- Have made some modifications to `Button` component to make it more like the design given. There is case for a well thought out Button component which can handle many scenarios like grouped button, multipe answers etc.
- Have written unit tests for the util functions and some components, but due to time constraints the testing suite has gaps, ie, not covered 100%. So there could be a case for writing more tests and filling those gaps.
- Have used the basic css given by Create React App, in the bigger app we would have to shift to CSS Modules etc to avoid namespace issues.
- Loading screen when we are fetching checks and some feedback when we are in the middle of the submission.
