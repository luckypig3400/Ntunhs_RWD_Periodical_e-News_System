import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

const CategoryEdit = (props) => {
  return (
    <Edit title='Edit Topic' {...props}>
      <SimpleForm>
        <TextInput source='Category_name' />
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit
