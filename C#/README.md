# C#
The preferred language for server-side Relativity development

## About
These samples demonstrate how to use some of the many interfaces and services the platform has to offer. 

## How to Use
These can be used in a Relativity Custom Page, Event Handler, Agent, or even a local client-side .NET console application 
(with the appropriate login credentials). Below are some instantiation patterns you might find helpful.

#### Custom Page
```C#
// implements IDisposable
using (IRSAPIClient proxy = Relativity.CustomPages.ConnectionHelper.Helper().GetServicesManager()
        .CreateProxy<IRSAPIClient>(ExecutionIdentity.CurrentUser))
{
    // call method
    MyMethod(proxy);
}
```

#### Agent/Event Handler
```C#
using (IRSAPIClient proxy = this.Helper.GetServicesManager()
    .CreateProxy<IRSAPIClient>(ExecutionIdentity.System))
{
    // do something
}
```

#### With client credentials
```C#
Uri servicesUri = new Uri("https://my-instance.com/Relativity.Services");
string username = "albert.einstein@relativity.com";
string password = "EequalsEmmSee^2";
using (IRSAPIClient proxy =  new RSAPIClient(
                                servicesUri,
                                new UsernamePasswordCredentials(username, password))
{
    // do something
}

// for other services, use a service factory

Uri restUri = new Uri("https://my-instance.com/Relativity.REST/api");
var creds = new Relativity.Services.ServiceProxy.UsernamePasswordCredentials(username, password);
var settings = new Relativity.Services.ServiceFactorySettings(servicesUri, restUri, creds);
var svcFactory = new Relativity.Services.ServiceProxy.ServiceFactory(settings);
using (IObjectManager objManager = svcFactory.CreateProxy<IObjectManager>())
{
    // CRUDQ on objects
    UpdateAllDocuments(objManager);
}

```

## File Descriptions
* [CustodianPreSave.cs](CustodianPreSave.cs) - examples on getting/setting fields of various types on an event handler
* [PrintPermissions.cs](PrintPermissions.cs) - uses the `IPermissionManager` interface to print out permissions

