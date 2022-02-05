import React from 'react'
import { Edit, SimpleForm, TextInput ,PasswordInput} from 'react-admin'

const UserEdit = (props) => {
  return (
    <Edit title='Edit User' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='name' />
        <TextInput source='email' />
        <PasswordInput source="password" initiallyVisible />
      </SimpleForm>
    </Edit>
  )
}

export default UserEdit
