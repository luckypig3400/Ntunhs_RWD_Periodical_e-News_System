import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const CategoryList = (props) => {
  console.log(props)
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='Category_name' />
        <EditButton basePath='/Categorys' />
        <DeleteButton basePath='/Categorys' />
      </Datagrid>
    </List>
  )
}

export default CategoryList
