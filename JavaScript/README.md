# JavaScript
Samples to run on Relativity's web UI
## About
You can use these JavaScript examples in your Page Interaction Event Handlers and Custom Pages to customize front-end behavior.

## How to Use
For simple ad-hoc tests, you can paste these samples into your browser's developer console (e.g. hitting <kbd>F12</kbd> in Google Chrome and <kbd>Enter</kbd> to run them). 

For AMDs (Asynchronous Module Definitions), however, you will have to upload the scripts as resource files and attach them to your event handler.
More info:
* [List page interaction event handlers](https://platform.relativity.com/9.6/Content/Customizing_workflows/List_Page_Interaction_event_handlers.htm)

## File Descriptions

* [add-event-listener.js](add-event-listener.js) - adds an event listener to a drop-down menu
* [display-decimal.js](display-decimal.js) - rounds a decimal field to a given number of places on the front end
* [get-filtered-docs.js](get-filtered-docs.js) - returns the IDs of the current documents in the viewer queue
* [ping.js](ping.js) - pings Object Manager
* [prime-doc-review.js](prime-doc-review.js) - sends a list of document IDs to the document viewer queue
* [test-obj-manager.js](test-obj-manager.js) - queries the first 25 documents with object manager

### AMDs (Asynchronous Module Definitions)
* [get-doc-list.js](amd/get-doc-list.js) - reveals a point where you can access the current document list queue
