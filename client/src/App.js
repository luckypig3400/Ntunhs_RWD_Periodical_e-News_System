import * as React from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { UserList, UserEdit, UserCreate } from "./component/users";
import { PostList, PostEdit, PostCreate } from "./component/posts";
import {
  CategorysList,
  CategorysEdit,
  CategorysCreate,
} from "./component/categorys";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import CategoryIcon from "@material-ui/icons/Category";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource
      name="post"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      show={ShowGuesser}
      icon={PostIcon}
    />
    <Resource
      name="category"
      list={CategorysList}
      create={CategorysCreate}
      edit={CategorysEdit}
      icon={CategoryIcon}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      icon={UserIcon}
    />
  </Admin>
);

export default App;
