// Overrides the "New <RDO name>" button to launch a modal window that says "Hello, world."
define(function() {
  function modalHandler(api) {
    function createButton(buttonApi) {
      buttonApi.setButton({
        text: "Say hello",
        eventName: "say_hello"  // name of event when btn clicked
      });
    }

    function showMyModal() {
      var id = api.modalService.createModal({
        title: "My first list page interaction event handler",
        template: "<span>Hello, world.</span>",
        buttons: [{name: "OK", eventName: "hw_modal_ok"}],
        init: function(scope) {
          scope.$on("hw_modal_ok", function() {
            // Close modal on the OK button click.
            api.modalService.hideModal(id);
          });
        }
      });
      api.modalService.showModal(id);
    }
    
    // Show this modal upon button click
    api.eventService.subscribe("say_hello", showMyModal);
    return {
      newItemButtonInit: createButton
    };
  }
  return modalHandler;
});
