/*
 * These methods will attempt to perform a basic document query against a given
 * workspace with object manager. Should give a sense if the database is alive 
 * or not.
 */

/*
 * Newer versions of object manager (~Feb 2018 or later)
 */
function test_query_new(workspaceId) {
    // new URL
    var url = `/Relativity.Rest/API/Relativity.Objects/workspace/${workspaceId}/object/query`;

    // new payload
    var payload = {
        "request": {
            "objectType":{"artifactTypeID":10},
            "fields":[],
            "condition":"",
            "rowCondition":"",
            "sorts":[],
            "includeIdWindow":true          
        },
        "start":1,
        "length":25
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(payload),
        beforeSend: function (request) {
            request.setRequestHeader("X-CSRF-Header", window.top.GetCsrfTokenFromPage());
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },

        success: function (data) {
            console.info("Success.");
            console.info(data);
        }
    });
}


/*
 * Old object manager (DO NOT USE)
 */
function test_query(workspaceId) {
    var url = `/Relativity.Rest/API/Relativity.Objects/workspaces/${workspaceId}/objects/query`;

    // simple query
    var payload = {
        "artifactType": {
            "descriptorArtifactTypeID":10
        },
        "query": {
            "fields":[],
            "condition":"",
            "rowCondition":"",
            "sorts":[]
        },
        "start":1,
        "length":25,
    };

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(payload),
        beforeSend: function (request) {
            request.setRequestHeader("X-CSRF-Header", window.top.GetCsrfTokenFromPage());
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },

        success: function (data) {
            console.info("Success.");
            console.info(data);
        }
    });
}
