import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const PostList = (props) => {
  
  return (
    <List {...props} sort={{ field: 'publishedAt', order: 'ASC' }}>
      <Datagrid>
        <TextField source='title' />
        <TextField source='Category' />
        <DateField source='publishedAt' />
        <EditButton basePath='/posts' />
        <DeleteButton basePath='/posts' />
      </Datagrid>
    </List>
  )
}

export default PostList
