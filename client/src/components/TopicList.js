import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const topicList = (props) => {
  console.log(props)
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <EditButton basePath='/topics' />
        <DeleteButton basePath='/topics' />
      </Datagrid>
    </List>
  )
}

export default topicList
