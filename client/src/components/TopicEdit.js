import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

const TopicEdit = (props) => {
  return (
    <Edit title='Edit Topic' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
      </SimpleForm>
    </Edit>
  )
}

export default TopicEdit
