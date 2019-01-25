// This example shows how to add an event listener to a DOM element

/*
 * Enables a textbox with the given ID
 */ 
function enableTextbox(textboxId) {
    var textbox = document.getElementById(textboxId);
    if (textbox != null)
        textbox.disabled = false;
    else
        console.log("Could not find textbox")
}

/*
 * Disables a textbox with the given ID
 */ 
function disableTextbox(textboxId) {
    var textbox = document.getElementById(textboxId);
    if (textbox != null)
        textbox.disabled = true;
    else
        console.log("Could not find textbox")
}

/*
 * Checks if the drop-down is selecting a given string. If so, 
 * it enables a textbox.
 */
function enableTextboxOnSelection(selection, dropDownId, textboxId) {
    var drop = document.getElementById(dropDownId);
    // get the selected text
    if (drop != null) {
        var selectedText = drop.options[drop.selectedIndex].innerText;
        if (selectedText == selection) {
            enableTextbox(textboxId);
        }
        else {
            disableTextbox(textboxId);
        }
    }
}

/*
 * Adds an event listener that enables a textbox if the user selects "Responsive"
 * from the drop-down menu. Otherwise, it disables the textbox.
 */ 
function addEventListenerToDropDown() {
    // IDs are subject to change if the layout changes
    const textboxId = "_documentProfileEditor__kCuraScrollingDiv_dynamicViewRenderer_ctl02_int32TextBox_textBox";
    const dropDownId = "_documentProfileEditor__kCuraScrollingDiv_dynamicViewRenderer_ctl04_dropDownList";

    // first, disable the textbox
    disableTextbox(textboxId);

    // get the drop-down element
    var dropDown = document.getElementById(dropDownId);
    if (dropDown != null) {
        // on drop-down selection change, disable or enable a textbox
        // depending on the user selection
        dropDown.addEventListener("change", function() { 
            enableTextboxOnSelection("Responsive", dropDownId, textboxId);
        }, false);
    } 
}

function test() {
    addEventListenerToDropDown();
}
