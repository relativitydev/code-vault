using System;
using System.Threading.Tasks;
using Relativity.Services.Group;
using Relativity.Services.Permission;
using Relativity.Services.ServiceProxy;

public static class PrintPermissions
{
    /// <summary>
    /// Prints out the object permissions for one of the groups inside a given workspace
    /// </summary>
    /// <param name="mgr">Object that implements IPermissionManager</param>
    /// <param name="workspaceId">Artifact ID of the workspace whose permissions we want to read</param>
    /// <returns></returns>
    public static async Task PrintGroupPermissions(IPermissionManager mgr, int workspaceId)
    {
        // get an enabled group
        GroupSelector sel = await mgr.GetWorkspaceGroupSelectorAsync(workspaceId);
        if (sel.EnabledGroups.Count > 0)
        {
            GroupRef firstGroup = sel.EnabledGroups.FirstOrDefault();
            // get the permissions associated with said group
            GroupPermissions permissions = await mgr.GetWorkspaceGroupPermissionsAsync(workspaceId, firstGroup);
            // print out Object Permissions
            Console.WriteLine("Permissions for members of {0}", firstGroup.Name);
            foreach (ObjectPermission objPerm in permissions.ObjectPermissions)
            {
                Console.WriteLine("Object Name: {0}", objPerm.Name);
                // we could print out others, but let's just print out if group
                // members can edit the object (true/false)
                Console.WriteLine("Can Edit: {0}", objPerm.EditSelected);
                Console.WriteLine();
            }
        }
        else
        {
            Console.WriteLine("No groups enabled for this workspace ({0})", workspaceId);
        }
    }


    /// <summary>
    /// Prints out the enabled and disabled groups for a given workspace
    /// </summary>
    /// <param name="mgr">Object that implements IPermissionManager</param>
    /// <param name="workspaceId">Artifact ID of the workspace whose permissions we want to read</param>
    /// <returns></returns>
    public static async Task ReadGroupsAsync(IPermissionManager mgr, int workspaceId)
    {
        GroupSelector sel = await mgr.GetWorkspaceGroupSelectorAsync(workspaceId);
        Console.WriteLine("Enabled groups:");
        foreach (GroupRef group in sel.EnabledGroups)
        {
            Console.WriteLine(group.Name);
        }
        Console.WriteLine("------");
        Console.WriteLine("Disabled Groups:");
        foreach (GroupRef group in sel.DisabledGroups)
        {
            Console.WriteLine(group.Name);
        }
    }
}

