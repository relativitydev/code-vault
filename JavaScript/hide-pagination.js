/*
 * Hides the pagination controls in the document viewer
 */

var currTry = 0;
const maxTries = 100;

function hideDocNav() {
    // the class name of the buttons
    const className = "documentNavigatorButtonCell";
    // use top.document instead of document
    var els = top.document.getElementsByClassName(className);
    console.log(els);
    if (!els.length) {
        console.log("Navigator buttons not found.");
        if (currTry < maxTries) {
            window.setTimeout(hideDocNav, 100);
            currTry++;
        } else {
            return;
        }
        
    } else {
        console.log("Found buttons.");
        els[0].hidden = true;
    }
}


function startUp() {
    $(document).ready(function () {
        hideDocNav();
    });
}


startUp();
