using System;
using System.IO;
using System.Runtime.InteropServices;
using kCura.EventHandler;
using Choice = kCura.EventHandler.Choice;
using FileValue = kCura.EventHandler.FileValue;

[kCura.EventHandler.CustomAttributes.Description("Custodian Pre-Save Event Handler")]
[Guid("68F834DB-1213-4462-B683-8CC809F6A4F7")]
public class CustodianPreSave : PreSaveEventHandler
{
    /// <summary>
    /// If we return an empty FieldCollection, we will only have access to fields on our layout. 
    /// If we want fields that are NOT available on the layout, then we will need to add them here.
    /// </summary>
    public override FieldCollection RequiredFields
    {
        get
        {
            FieldCollection retVal = new FieldCollection();
            return retVal;
        }
    }


    public override Response Execute()
    {
        Response response = new Response
        {
            Success = true,
            Message = String.Empty
        };

        try
        {
            // Fixed-Length Text--------------------------------------------------------------------
            // Get
            string name = (string) ActiveArtifact.Fields["Name"].Value.Value;
            // Set
            ActiveArtifact.Fields["Name"].Value.Value = "Andrew Zipper";

            // Date--------------------------------------------------------------------------------
            // Get
            DateTime startDate = 
                (DateTime) ActiveArtifact.Fields["Employment Start Date"].Value.Value;
            // Set
            DateTime newStartDate = new DateTime(1999, 12, 31);
            ActiveArtifact.Fields["Employment Start Date"].Value.Value = newStartDate;

            // Whole Number-------------------------------------------------------------------------
            // Get
            int employmentDuration = 
                (int) ActiveArtifact.Fields["Employment Duration in Years"].Value.Value;
            // Set
            ActiveArtifact.Fields["Employment Duration in Years"].Value.Value =
                DateTime.Today.Year - newStartDate.Year;

            // Yes/No-------------------------------------------------------------------------------
            // Get
            bool isSeniorManagement = 
                (bool) ActiveArtifact.Fields["Is Part of Senior Management?"].Value.Value;
            // Set
            ActiveArtifact.Fields["Is Part of Senior Management?"].Value.Value = false;

            // Single Choice------------------------------------------------------------------------
            // Get
            kCura.EventHandler.ChoiceCollection interestLevel =
                (ChoiceCollection)ActiveArtifact.Fields["Interest Level"].Value.Value;
            // Set
            // Even though it is just a single choice, we have to wrap it in a ChoiceCollection object
            kCura.EventHandler.ChoiceCollection newInterestLevel = new ChoiceCollection();
            kCura.EventHandler.Choice lowChoice = new Choice(1147813, "Low");
            newInterestLevel.Add(lowChoice);
            ActiveArtifact.Fields["Interest Level"].Value.Value = newInterestLevel;

            // Multiple Choice----------------------------------------------------------------------
            // Get
            kCura.EventHandler.ChoiceCollection tags =
                (ChoiceCollection)ActiveArtifact.Fields["Tags"].Value.Value;
            // Set
            kCura.EventHandler.ChoiceCollection newSetOfTags = new ChoiceCollection
            {
                new Choice(1147817, "Executive"),
                new Choice(1147818, "Person of Interest")
            };
            ActiveArtifact.Fields["Tags"].Value.Value = newSetOfTags;

            // Currency-----------------------------------------------------------------------------
            // Get
            decimal lastKnownIncome = 
                (decimal) ActiveArtifact.Fields["Last Known Income Amount"].Value.Value;
            // Set
            ActiveArtifact.Fields["Last Known Income Amount"].Value.Value = new decimal(1700000.00);

            // Decimal------------------------------------------------------------------------------
            // Get
            decimal percentOwnership = 
                (decimal) ActiveArtifact.Fields["Percent Ownership"].Value.Value;
            // Set
            ActiveArtifact.Fields["Percent Ownership"].Value.Value = new decimal(25.00);

            // User---------------------------------------------------------------------------------
            // Get
            if (!ActiveArtifact.Fields["Current User"].Value.IsNull)
            {
                int currentUserId = 
                    (int)ActiveArtifact.Fields["Current User"].Value.Value;
            }
            // Set
            int newUserId = 1026092;
            ActiveArtifact.Fields["Current User"].Value.Value = newUserId;

            // File---------------------------------------------------------------------------------
            // Get
            kCura.EventHandler.FileFieldValue currentFile = 
                (FileFieldValue) ActiveArtifact.Fields["Current File"].Value;
            // to read the file as a stream:
            if (!currentFile.IsNull)
            {
                using (Stream stream = currentFile.FileValue.FileStream)
                {
                    // read the file
                }
            }
            // Set
            if (!currentFile.IsNull)
            {
                using (System.IO.MemoryStream memStream = new MemoryStream())
                {
                    byte[] byteArray = System.Text.Encoding.UTF8.GetBytes("This is a test text file.");
                    memStream.Write(byteArray, 0, byteArray.Length);
                    FileValue fileValue = new kCura.EventHandler.FileValue("TestFile.txt", memStream);
                    ActiveArtifact.Fields["Current File"].Value.Value = fileValue;
                }
            }

            // Long Text----------------------------------------------------------------------------
            // Get
            string currentFileText = (string) ActiveArtifact.Fields["Description"].Value.Value;
            // Set
            ActiveArtifact.Fields["Description"].Value.Value =
                "This custodian has an abnormally large number of documents.";

            // Single Object------------------------------------------------------------------------
            // Get - returns the Artifact ID of the associated object
            int parentCustodian =
                (int)ActiveArtifact.Fields["Parent Custodian"].Value.Value;
            // Set
            int newParentCustodianId = 1147821;
            ActiveArtifact.Fields["Parent Custodian"].Value.Value = newParentCustodianId;

            // Multiple Object----------------------------------------------------------------------
            // Get - returns an array of the Artifact IDs of the associated objects
            int[] associatedDocs = (int[]) ActiveArtifact.Fields["Documents"].Value.Value;
            // Set
            int newArraySize = associatedDocs.Length + 1;
            int[] newDocs = new int[newArraySize];
            newDocs[0] = 1039364; // specify Artifact ID of document we want to include
            associatedDocs.CopyTo(newDocs, 1);
            ActiveArtifact.Fields["Documents"].Value.Value = newDocs;
        }

        catch (InvalidCastException ice)
        {
            response.Message = $"Invalid cast occured: {ice.Message}";
            response.Success = false;
        }

        catch (Exception ex)
        {
            //Change the response Success property to false to let the user know an error occurred
            response.Success = false;
            response.Message = ex.ToString();
        }

        return response;
    }
}

