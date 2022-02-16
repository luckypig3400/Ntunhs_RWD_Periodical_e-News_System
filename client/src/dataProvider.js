import jsonServerProvider from "ra-data-json-server";
//import simpleRestProvider from 'ra-data-simple-rest';

// http://localhost:5000
// https://jsonplaceholder.typicode.com
const dataProvider = jsonServerProvider("http://localhost:5000");

export default dataProvider;

/*
const fetchJson = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
}
//const dataProvider = simpleRestProvider('http://localhost:5000', fetchJson);
*/
