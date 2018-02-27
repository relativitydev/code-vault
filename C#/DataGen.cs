using System;
using System.Data;
using System.Text;
using kCura.Relativity.DataReaderClient;
using kCura.Relativity.ImportAPI;
using kCura.Relativity.ImportAPI.Enumeration;

public static class DataGen
{
    /// <summary>
    /// Gets the number of digits of an integer in decimal representation
    /// e.g. 10 => 2, 1000 => 4
    /// </summary>
    /// <param name="num"></param>
    private static int Intlength(int num)
    {
        return num.ToString("D").Length;
    }


    /// <summary>
    /// Creates the DataTable that contains the Control Number and file path
    /// of the document
    /// </summary>
    /// <param name="numRows">Number of rows to generate</param>
    /// <param name="filePath">Path to the native file</param>
    /// <param name="identifierCol">Column name of doc identifier</param>
    /// <param name="filePathCol">Column name of document file path</param>
    /// <returns></returns>
    private static DataTable GenerateLoadTable(int numRows, 
                                               string filePath,
                                               string identifierCol,
                                               string filePathCol)
    {
        DataTable table = new DataTable();
        table.Columns.Add(identifierCol, typeof(string));
        table.Columns.Add(filePathCol, typeof(string));

        const string prefix = "TEST_";
        // determine padding e.g. TEST_0001
        int numDigits = Intlength(numRows);
        for (int i = 1; i <= numRows; i++)
        {
            int localNumDigits = Intlength(i);
            int diff = numDigits - localNumDigits;
            string padding = new String('0', diff);
            string suffix = padding + i.ToString("D");
            table.Rows.Add(prefix + suffix, filePath);
        }
        return table;
    }


    /// <summary>
    /// Generates a large number of documents
    /// </summary>
    public static void Generate(ImportAPI iapi, int workspaceId, int numDocs)
    {
        ImportBulkArtifactJob importJob = iapi.NewNativeDocumentImportJob();
        iapi.ExecutionSource = ExecutionSourceEnum.ImportAPI;

        const int controlNumFieldArtifactId = 1003667;
        const string idFieldName = "Control Number";
        const string nativeFileField = "FILE_PATH";

        importJob.OnMessage += ImportJobOnMessage;
        importJob.OnComplete += ImportJobOnComplete;
        importJob.OnFatalException += ImportJobOnFatalException;

        importJob.Settings.CaseArtifactId = workspaceId;
        importJob.Settings.ExtractedTextFieldContainsFilePath = true;
        importJob.Settings.ExtractedTextEncoding = Encoding.UTF8;
        importJob.Settings.NativeFileCopyMode = NativeFileCopyModeEnum.CopyFiles;
        importJob.Settings.OverwriteMode = OverwriteModeEnum.AppendOverlay;
        importJob.Settings.DisableControlNumberCompatibilityMode = true;
        importJob.Settings.SelectedIdentifierFieldName = idFieldName;
        importJob.Settings.NativeFilePathSourceFieldName = nativeFileField;
        importJob.Settings.IdentityFieldId = controlNumFieldArtifactId;

        const string file = @"S:\Data\Hamlet.docx";
        importJob.SourceData.SourceData = 
            GenerateLoadTable(numDocs, file, idFieldName, nativeFileField)
            .CreateDataReader();
        Console.WriteLine("Executing import...");
        importJob.Execute();
    }

    private static void ImportJobOnMessage(Status status) => Console.WriteLine("Message: {0}", status.Message);

    private static void ImportJobOnFatalException(JobReport jobReport) => Console.WriteLine("Fatal Error: {0}", jobReport.FatalException);

    private static void ImportJobOnComplete(JobReport jobReport) => Console.WriteLine("Job Finished With {0} Errors: ", jobReport.ErrorRowCount);
}
