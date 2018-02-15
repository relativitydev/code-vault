/*
 * Specifies the document viewer queue so that
 * the user will only come across these documents
 * when hitting the "next" or "back" button 
 */ 
function limitDocList(docIds)
{
    var baseUrl = document.location.origin;
    // specify the URL we are to return to after
    var returnUrl = baseUrl + "myCustomPageURL";
    var url = baseUrl + "/Relativity/PageBaseService.asmx/PrimeDocReview";
    var settings = 
    {
        IdList: docIds,
        Url: returnUrl,
        SourceType: 4,
        ArtifactTypeID: 10,
        ViewArtifactID: 1003684
    };
    // need to wrap the settings inside a string for some reason
    var settingsAsStr = JSON.stringify(settings);

    var pojo = {
        "settings": settingsAsStr       
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


function test()
{
    var documents = [1041525, 1041527];
    limitDocList(documents);
}
