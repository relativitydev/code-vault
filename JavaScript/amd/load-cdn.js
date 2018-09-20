// This example shows how to load Bootstrap from a CDN
// using RequireJS in an AMD.

// First, specify the Bootstrap CDN in the RequireJS config
requirejs.config({
  paths: {
    "bootstrap": ["//stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min"]
  },
  shim: {
    "bootstrap": {
      deps: ["jquery"],
      exports: "$"
    }
  }
});

// Then, specify both jQuery and Bootstrap as dependencies
define(["jquery", "bootstrap"], function($) {
  var config = requirejs.s.contexts._.config;
  console.log(config);

  if (typeof($.fn) !== 'undefined') {
    console.log("Loaded bootstrap");
    var bootstrap_ver = $.fn.tooltip.Constructor.VERSION;
    console.log(bootstrap_ver); // => 4.1.1
  }

  function sampleHandler(api) {
    // blah blah
  }
  return sampleHandler;
});
