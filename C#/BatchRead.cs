using System;
using System.Collections.Generic;

using kCura.Relativity.Client;
using kCura.Relativity.Client.DTOs;
using Document = kCura.Relativity.Client.DTOs.Document;

/// <summary>
/// Demonstrates how to batch out the Document.Read() method
/// </summary>
public static class BatchRead
{
    /// <summary>
    /// Copies the documents from the result set over to a list
    /// </summary>
    /// <param name="resultSet"></param>
    /// <param name="resultDocs"></param>
    private static void AddResultsToList(ref ResultSet<Document> resultSet, ref List<Document> resultDocs)
    {
        foreach (Result<Document> result in resultSet.Results)
        {
            if (!result.Success)
            {
                Console.WriteLine("Failed to read document!");
                Console.WriteLine(result.Message);
            }
            else
            {
                Console.WriteLine($"Control number: {result.Artifact.TextIdentifier}");
                resultDocs.Add(result.Artifact);
            }
        }
    }


    /// <summary>
    /// Batches out the Document.Read() method and stores it in a list of resulting Document artifacts
    /// </summary>
    /// <param name="proxy"></param>
    /// <param name="docIds"></param>
    /// <param name="resultDocs"></param>
    public static void ReadLongList(IRSAPIClient proxy, List<int> docIds, ref List<Document> resultDocs)
    {
        const int BATCH_SIZE = 500;

        // keep track of number of remaining documents
        int remaining = docIds.Count;

        // starting index
        int startIndex = 0;

        while (remaining > BATCH_SIZE)
        {
            // get a subset of the document IDs of size BATCH_SIZE
            List<int> batch = docIds.GetRange(startIndex, BATCH_SIZE);

            // query with the batch
            ResultSet<Document> resultSet = proxy.Repositories.Document.Read(batch);

            AddResultsToList(ref resultSet, ref resultDocs);

            // move the startIndex pointer up by BATCH_SIZE 
            startIndex += BATCH_SIZE;

            // decrease the number of remaining documents
            remaining -= BATCH_SIZE;
        }

        // check for any remaining documents
        if (remaining > 0)
        {
            List<int> lastBatch = docIds.GetRange(startIndex, remaining);
            ResultSet<Document> resultSet = proxy.Repositories.Document.Read(lastBatch);
            AddResultsToList(ref resultSet, ref resultDocs);
        }           
    }
}
