$requestUrl = 'https://instance-name/Relativity.Rest/API/Relativity.Objects/workspace/1022106/object/query'
$username = 'admin.user@abc.corp'
$password = 'TopSecretPassword1234!'
$encodedUserAndPass = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($username):$($password)"))
 
# Request Definition
$headers = New-Object "System.Collections.Generic.Dictionary[[String], [String]]"
$headers.Add("X-CSRF-Header", "-")
$headers.Add("Content-Type", "application/json")
$headers.Add("Authorization", 'Basic ' + $encodedUserAndPass)
 
$body = @{
    "request" = @{
        "objectType"= @{ "ArtifactTypeId"= 1000049 }
        "condition"= ""
        "fields" = @(@{ name = "name" }, @{ name = "Inventoried Files"}, @{ name = "Discovered Files"})
    }
    "start"= 1
    "length"= 25
}
 
$json = $body | ConvertTo-Json -Depth 4


$json
# Invoke service endpoint and return response
$response = ""
$response = Invoke-RestMethod $requestUrl -Method Post -Headers $headers -Body $json -ContentType 'application/json;charset=utf-8' -ErrorVariable RestError -ErrorAction SilentlyContinue
  
if($RestError) {
    $RestError.ErrorRecord.Exception.Response.StatusCode.value__
    $RestError.ErrorRecord.Exception.Response.StatusDescription
}
else {
    $response|ConvertTo-Json
}
