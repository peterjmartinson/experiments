(function() {

  'use strict';

  function $get(route, handle) {
    let request = new XMLHttpRequest();
    if (!request) {
      console.log('Unable to create request.  Giving up.');
      return false;
    }
    request.open('GET', route);
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

  function $create(route, params, handle) {};

  function $update(route, params, handle) {};

  function $delete(route, params, handle) {};

  window.$get = $get;
}());

