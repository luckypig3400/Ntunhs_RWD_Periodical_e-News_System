import jsonServerProvider from "ra-data-json-server";
import {fetchUtils} from "react-admin"
import simpleRestProvider from 'ra-data-simple-rest';

// http://localhost:5000
// https://jsonplaceholder.typicode.com
const fetchJson = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonServerProvider("http://localhost:5000/periodical/api",fetchJson);

export default dataProvider;

