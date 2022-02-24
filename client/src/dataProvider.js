import jsonServerProvider from "ra-data-json-server";
import {fetchUtils} from "react-admin"
import axios from 'axios'

const fetchJson = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  options.headers.set('withCredentials', true);
  axios.defaults.withCredentials = true;
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonServerProvider("http://localhost:5000",fetchJson);

export default dataProvider;

