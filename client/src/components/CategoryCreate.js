import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const CategoryCreate = (props) => {
  return (
    <Create title='Create a Category' {...props}>
      <SimpleForm>
        <TextInput source='id' />
        <TextInput source='Category_name' />
      </SimpleForm>
    </Create>
  )
}

export default CategoryCreate
