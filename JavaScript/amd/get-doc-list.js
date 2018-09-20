define(function() {
  function sampleHandler(api) {
    /*
     * Gets the list of the currently filtered docs,
     * be it from a view or saved search
     */
    function getFilteredDocs(overrideApi) {
      // set a custom data source factory function for item list
      overrideApi.setItemListDataSource(function(itemListDataSourceParams) {
        return {

          inboundTransformer: {
            method: function(data) {
              console.log(data);
              // to get the list of artifact ids:
              var artifactIds = data["IDWindow"];
              return api.inboundTranslationService.objectManager.translate(
                itemListDataSourceParams.workspaceId,
                itemListDataSourceParams.folderId,
                data,
                itemListDataSourceParams.callbacks.dataMappingCallback,
                itemListDataSourceParams.callbacks.docReviewPrimingCallback,
                itemListDataSourceParams.callbacks.refreshFILCallback,
                itemListDataSourceParams.callbacks.getGroupDefinitionFieldName);
            }
          }

        };
      });
    }

    // "subscribe" to the events--that is, handle them
    return {
      // handle the dataSourceInit event, which occurs
      // once upon page load
      dataSourceInit: getFilteredDocs
    };
  }
  return sampleHandler;
});
