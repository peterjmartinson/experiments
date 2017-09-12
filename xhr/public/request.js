/*jshint esversion:6 */
window.onload = (function() {

  'use strict';

  let test_file = 'test.md';
  let test_link = document.getElementById('link');

  window.$get('/file' + test_file, render);

  test_link.addEventListener('click', sendQuery);

  function sendQuery() {
    window.$get('/query' + 2, render);
  }
    
  function render(response) {
    // Currently, this does a ghetto Markdown parse.
    // Replace this with a simple render that pumps
    // the output through a real Markdown parser
    let $output = document.querySelector('#output'),
        paragraph = /[\n\r]{2}|  [\n\r]{1}/g,
        newline = /[\n\r]{1}/g,
        output = '<p>' + response + '</p>';
    output = output.replace(paragraph, '</p><p>');
    output = output.replace(newline, '<br>');
    $output.innerHTML = output;
  }

}());
