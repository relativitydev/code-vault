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
* [change-font.js](change-font.js) - creates a drop-down menu that changes the font of the layout
* [display-decimal.js](display-decimal.js) - rounds a decimal field to a given number of places on the front end
* [get-filtered-docs.js](get-filtered-docs.js) - returns the IDs of the current documents in the viewer queue
* [hide-pagination.js](hide-pagination.js) - hides the pagination controls in the default document viewer
* [ping.js](ping.js) - pings Object Manager
* [prime-doc-review.js](prime-doc-review.js) - sends a list of document IDs to the document viewer queue
* [test-obj-manager.js](test-obj-manager.js) - queries the first 25 documents with object manager

### AMDs (Asynchronous Module Definitions)
* [get-doc-list.js](amd/get-doc-list.js) - reveals a point where you can access the current document list queue
* [highlight-cells.js](amd/highlight-cells.js) - displays "Responsive" documents in a highlighted cell
* [load-cdn.js](amd/load-cdn.js) - shows how to load Bootstrap from a CDN
* [modal-window.js](amd/modal-window.js) - demonstrates how to override the "New Item" button for an RDO and display a modal window
* [object-mgr.js](amd/object-mgr.js) - shows how to perform an Object Manager query without explicit use of AJAX/jQuery
