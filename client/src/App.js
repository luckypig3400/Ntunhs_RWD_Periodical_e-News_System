import React from 'react'
import { Admin, Resource } from 'react-admin'

import MyLoginPage from './MyLoginPage';
import MyLogoutButton from './MyLogoutButton';
import authProvider from './authProvider';

import restProvider from 'ra-data-simple-rest'
import PostList from './components/PostList'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import UserList from './components/UserList'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'

function App() {

  return (
    <Admin authProvider={authProvider} dataProvider={restProvider('http://localhost:3000')}>
      <Resource
        name='posts'
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
      />
      <Resource
        name='users'
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
      />
    </Admin>
  )
}

export default App
