/*
 * This snippet demonstrates how to authenticate a REST call from server-side code.
 * This is intended to be run on an agent, event handler, or custom page.
 * Need the following namespaces for ClaimsIdentity
 * using System.Security;
 * using System.Security.Claims;
 */

// get the current URL
string baseUrl = Helper.GetServicesManager().GetRESTServiceUrl().GetLeftPart(UriPartial.Authority);

// bearer token will be stored here
string authToken = "";               

// get auth key from one of the claims
ClaimsIdentity identity = ClaimsPrincipal.Current.Identities.First();
if (identity != null && identity.IsAuthenticated)
{
    Claim claim = identity.Claims.FirstOrDefault(x => x.Type == "access_token");
    if (claim != null)
    {
        // set the auth token
        authToken = claim.Value;
    }
    else
    {
        throw new SecurityException("Access token not found for user.");
    }
}
else
{
    throw new SecurityException("User is not authenticated");
}

// instantiate HttpClient
var httpClient = new HttpClient
{
    BaseAddress = new Uri(baseUrl)
};

// set auth header
string authHeader = $"Bearer {authToken}";
httpClient.DefaultRequestHeaders.Add("Authorization", authHeader);
httpClient.DefaultRequestHeaders.Add("X-CSRF-Header", "-");

// perform a GET
int workspaceId = Helper.GetActiveCaseID();
int activeArtifactId = this.ActiveArtifact.ArtifactID;

string httpUrl = $"/Relativity.REST/Workspace/{workspaceId}/CustomRDO/{activeArtifactId}";
HttpResponseMessage response = httpClient.GetAsync(httpUrl).Result;
if (response.StatusCode == HttpStatusCode.OK)
{
    string result = response.Content.ReadAsStringAsync().Result;
    // do something with result
}
