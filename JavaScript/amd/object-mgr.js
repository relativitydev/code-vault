// Shows how to perform an object manager query without direct use of jQuery
define(function () {  
    function dataSourceHandler(api) {

        // our field name on the document object
        const FIELD_NAME = "Dummies";

        function addColumn(overrideApi) {
            // set a custom data source factory function for item list
            overrideApi.setItemListDataSource(function (itemListDataSourceParams) {
                return {
                    getData: {
                        method: function (data) {
                            var result = api.promise.defer();                 

                            // get the payload
                            var payload = data["payload"];

                            // add the extra field
                            payload.request.fields.push({
                            "Name": FIELD_NAME,
                            "ArtifactID": 0,                        
                            "Guids":[]
                            });

                            var workspaceId = itemListDataSourceParams.workspaceId;
                            
                            var requestParamsDataList = {
                                workspaceId: workspaceId,
                                payload: payload
                            };

                            var settings = {
                                disableNotifications: true,
                                dataRetrievalServicePath: ""
                            };

                            // perform the query
                            var queryResults = api.dataSourceService
                                                .kepler
                                                .objectManager
                                                .queryWithSettings(requestParamsDataList, settings);

                            result.resolve(queryResults);
                    
                            return result.promise;
                        }
                    },
                };
            });
        }

        // "subscribe" to the events--that is, handle them
        return {
            // handle the dataSourceInit event, which occurs
            // once upon page load
            dataSourceInit: addColumn
        };
    }
    return dataSourceHandler;
});


