import * as React from "react";
import { List, Datagrid, TextField, EmailField,PasswordInput,DeleteButton, SimpleForm,TextInput,Edit,Create,EditButton } from 'react-admin';

export const UserList = props => (
    <List {...props}>
      <Datagrid>
        <TextField source='name' />
        <EmailField source='email' />
        <EditButton basePath='/users' />
        <DeleteButton basePath='/users' />
      </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create title='Create a User' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <TextInput source='email' />
        <PasswordInput source="password" initiallyVisible />
      </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit title='Edit User' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='name' />
        <TextInput source='email' />
        <PasswordInput source="password" initiallyVisible />
      </SimpleForm>
    </Edit>
);