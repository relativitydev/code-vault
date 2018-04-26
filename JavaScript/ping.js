/*
 * This function pings the object manager to make sure it's alive
 */
function ping()
{
    var endpoint = "/Relativity.Rest/API/protocol_2.0_sr/Relativity.Objects/workspaces/-1/objects/query/ping?";
    
    // get ticks
    var d = new Date();
    var ticks = d.getDate();

    var queryStrParams = {
        _: ticks
    };

    var queryStr = $.param(queryStrParams);
    var url = endpoint + queryStr;
    $.ajax({
        url: url,
        type: 'GET',
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
