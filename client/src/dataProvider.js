import jsonServerProvider from "ra-data-json-server";
import simpleRestProvider from 'ra-data-simple-rest';
import {fetchUtils} from "react-admin"
import axios from 'axios'

const dataProvider = jsonServerProvider("http://localhost:3090/periodical/api");

export default dataProvider;

