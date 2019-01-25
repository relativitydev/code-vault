/*
 * Gets the DOM id of a decimal type field by name
 * when the layout is NOT in edit mode (i.e. read-only mode)
 */
function getDecimalFieldId(fieldName) {
    // sample format:
    // _dynamicTemplate__kCuraScrollingDiv__dynamicViewFieldRenderer_ctl02_decimalTextBox_readOnlyValue
    var left = "_dynamicTemplate__kCuraScrollingDiv__dynamicViewFieldRenderer_ctl";
    var right = "_decimalTextBox_readOnlyValue";
    // id is the number that's changing depending on the field's position in the layout
    var id = "";  // 01, 02, etc.
    var labels = document.getElementsByClassName("dynamicViewFieldName");
    // iterate through the labels and find the one that has the fieldName in it
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (label.innerText == fieldName + ":") {
            var labelId = label.id;
            var idArr = labelId.match(/\d/g);
            id = idArr.join("");
            break;
        }
    }

    if (id == "") {
        return ""; // return empty if not found
    }
    return left + id + right;
}


/*
 * Helper method to round a number
 */ 
function roundUsing(number, prec) {
    var tempnumber = number * Math.pow(10, prec);
    tempnumber = Math.round(tempnumber);
    return tempnumber / Math.pow(10, prec);
}


/*
 * Sets the number of decimal places that is displayed
 * If the specified length is greater than the extant precision, 
 * we pad it with zeroes.
 */ 
function displayDecimal(numPlaces = 4) {
    const myDecFieldName = "Air Speed"; // name of decimal field
    var myDecFieldId = getDecimalFieldId(myDecFieldName);
    if (myDecFieldId != "") {
        // get the DOM element
        var myDecField = document.getElementById(myDecFieldId);
        var text = myDecField.innerText;

        // split the string along the decimal point and concentrate
        // on the right side
        var split = text.split(".");
        if (split.length != 2) {
            // weird, because should be 2
            console.log("Not a valid decimal field!");
            return;
        }
        // get current decimal length
        var length = split[1].length;
        if (numPlaces > length) {
            // pad with zeroes
            let diff = numPlaces - length;
            let pad = "0".repeat(diff);  // "0000..."
            myDecField.innerText = text + pad;
        }
        else if (numPlaces < length) {
            var num = parseFloat(text);
            var rounded = roundUsing(num, numPlaces);
            var roundedAsStr = rounded.toString();
            // pad with zeroes if needed
            var roundedSplit = roundedAsStr.split(".");
            if (roundedSplit.length == 1) {
                // this means we have rounded to a whole number
                let pad = "0".repeat(numPlaces);
                myDecField.innerText = roundedAsStr + "." + pad;
                return;
            }
            // check if we are still short
            let diff = numPlaces - roundedSplit[1].length; 
            if (diff > 0) {
                // pad with zeroes
                let pad = "0".repeat(diff);
                myDecField.innerText = roundedAsStr + pad;
            }
            else {
                myDecField.innerText = roundedAsStr;
            }
        }
        // do nothing if specified length is equal to original length
    }

    else {
        console.log(`Unable to find field with name ${myDecFieldName}`);
    }
}
