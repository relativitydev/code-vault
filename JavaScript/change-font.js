// This example adds a dropdown menu that changes the font
// in the layout

const FONTS = [
    "Arial",
    "Bookman",
    "Comic Sans MS",
    "Courier",
    "Courier New",
    "Garamond",
    "Georgia",
    "Helvetica",
    "Impact",
    "Palatino",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana"
];

const FONT_SIZES = [
    7, 9, 10, 11, 12, 14, 16, 18, 24, 30
];


const FONT_DROPDOWN_ID = "font_changer_dropdown";

const SIZE_DROPDOWN_ID = "fontsize_dropdown";


function addOptionTo(dropdown, optionValue) {
    var option = document.createElement("option");
    option.setAttribute("value", optionValue);
    option.innerText = optionValue.toString();
    dropdown.appendChild(option);
}

/*
 * Create dropdowns for fonts and font sizes
 */
function createDropDownsUnder(parent) {
    // create new form for dropdowns
    var form = document.createElement("form");
    form.id = "font-changer";

    var fontDropdown = document.createElement("select");
    FONTS.forEach(function (font) {
        addOptionTo(fontDropdown, font);
    });
    fontDropdown.id = FONT_DROPDOWN_ID;

    var sizeDropdown = document.createElement("select");
    FONT_SIZES.forEach(function (size) {
        addOptionTo(sizeDropdown, size);
    });
    sizeDropdown.id = SIZE_DROPDOWN_ID;

    form.appendChild(fontDropdown);
    // form.appendChild(sizeDropdown);

    // var clearBtn = document.createElement("button");
    // clearBtn.innerText = "Clear";

    // form.appendChild(clearBtn);

    parent.appendChild(form);
}


/*
 * Get the review bar (with the Edit, Save buttons)
 */ 
function getReviewBar() {
    // find the iFrame that the review bar lives in
    let iframeId = "_profileAndPaneCollectionFrame";
    var iframeElem = top.document.getElementById(iframeId);
    if (!iframeElem) {
        return null;
    }
    var level1 = iframeElem.contentDocument;

    // hidden inside another iframe
    let childiframeId = "_documentProfileFrame";
    var innerIframe = level1.getElementById(childiframeId);
    if (!innerIframe) {
        return null;
    }

    var level2 = innerIframe.contentDocument;

    // now find the bar
    let className = "reviewActionBarTop";
    var topBars = level2.getElementsByClassName(className);
    if (topBars.length === 1) {
        return topBars[0];
    }
    // console.log("Bar is null");
    return null;
}



function applyStyling() {
    var reviewBar = getReviewBar();
    if (!reviewBar)
        return;

    createDropDownsUnder(reviewBar);

    // add event listeners
    let tagsToModify = ['label', 'td', 'span'];
    tagsToModify.forEach(function (tag) {
        $("#" + FONT_DROPDOWN_ID).change(function () {
            $(tag).css("font-family", $(this).val());
        });

        // $("#" + SIZE_DROPDOWN_ID).change(function () {
        //     $(tag).css("font-family", $(this).val() + "px");
        // });
    });
}


function addFontChangerStartUp() {
    $(document).ready(function() {
        applyStyling();
    });
}

addFontChangerStartUp();


