import * as React from "react";
import {fetchUtils, Admin, Resource ,ShowGuesser } from 'react-admin';
import { UserList,UserEdit,UserCreate } from './component/users';
import { PostList, PostEdit, PostCreate } from './component/posts';
import {CategorysList,CategorysEdit,CategorysCreate} from './component/categorys'
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-json-server';
//import simpleRestProvider from 'ra-data-simple-rest';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';

// http://localhost:5000
// https://jsonplaceholder.typicode.com
const dataProvider = jsonServerProvider('http://localhost:5000');

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

  
const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={ShowGuesser} icon={PostIcon} />
    <Resource name="categorys" list={CategorysList} create={CategorysCreate} edit={CategorysEdit} icon={CategoryIcon} />
    <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} icon={UserIcon} />   
  </Admin>
)



export default App;