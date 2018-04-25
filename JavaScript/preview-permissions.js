/*
 * After this function is called, refresh the page, and the end-user will be in preview mode.
 * @param {int} groupId - The artifact ID of the group we are previewing as
 * @param {int} workspaceId - The artifact ID of the workspace we are previewing in
 */ 
function previewPermissions(groupId, workspaceId) {
    var endpoint = "/Relativity/GroupWorkspacePermissions.asmx/PreviewSecurity";
    var d = new Date();
    var ticks = d.getDate().toString();
    var payload = {
        "artifactID": groupId,
        "lastModifiedOn": ticks,
        "workspaceID": workspaceId
    };

    $.ajax({
        url: endpoint,
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
