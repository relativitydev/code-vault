define(function() {
  "use strict";

  function testHandler(api) {
    var api = api;

    /*
     * Highlights a cell if the document is responsive
     */
    function responsiveFormatter(cellValue, options, rowObject, formatterApi) {
      var data,
        resultHtml,
        selectedChoice;
      data = formatterApi.getCellData(cellValue) || "";
      if (data === "") {
        return "";
      }
      selectedChoice = data["Name"];
      selectedChoice = formatterApi.escapeString(selectedChoice);
      if (options.gridFormatter.isLinked) {
        resultHtml = "<a target='_top' href='" + rowObject["viewUrl"] + "'>Name: " + data + "</a>"
      } else {
        resultHtml = selectedChoice;
      }
      if (selectedChoice === "Responsive") {
        resultHtml = `<div style="background-color:#fdff9b">${resultHtml}</div>`; // add effect
      }
      // otherwise, leave as is
      return resultHtml;
    }

    function cellFormattersInit(formatterApi) {
      var fieldResponsive;
      fieldResponsive = formatterApi.fields.find(function(field) {
        return field.displayName === "Responsive Designation";
      });
      if (fieldResponsive) {
        formatterApi.setFormatter(fieldResponsive.columnName, responsiveFormatter);
      }
    }
    return {
      cellFormattersInit: cellFormattersInit
    };
  }
  return testHandler;
});
