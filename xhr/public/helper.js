(function() {

  'use strict';

  function $get(doc, handle) {
    let request = new XMLHttpRequest();
    if (!request) {
      console.log('Unable to create request.  Giving up.');
      return false;
    }
    request.open('GET', doc);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === 4) { // DONE
        if (request.status === 200) { // OK
          let response = request.responseText;
          handle(response);
        }
        else {
          console.log('Error: ' + request.status);
        }
      }
    }
  };

  function $create(doc, params, handle) {};

  function $update(doc, params, handle) {};

  function $delete(doc, params, handle) {};

  window.$get = $get;
}());

