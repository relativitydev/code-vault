/*
 * Returns an array of the document artifact IDs
 * currently in queue for the viewer. 
 * NOTE: must be run from inside the Review.aspx page
 */ 
function getFilteredDocIds()
{
    var baseUrl = document.location.origin;
    var url = baseUrl + "/Relativity/Case/Document/Review.aspx/GetArtifactIdList";

    var pojo = {
        "indexStart": 1,
        "count": -1      
    };

    var payload = JSON.stringify(pojo);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    var csrf = GetCsrfTokenFromPage();  // helper JS method
    xhttp.setRequestHeader("X-CSRF-Header", csrf);

    // authentication is taken care of
    xhttp.send(payload);
    xhttp.onreadystatechange = function ()
    {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhttp.readyState === DONE)
        {
            if (xhttp.status === OK)
            {
                console.log("output: ")
                console.log(xhttp.responseText); // 'This is the output.'
            } 
            else
            {
                console.log("Error: " + xhttp.status); // An error occurred during the request.
            }
        }
    };
}