import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const TopicCreate = (props) => {
  return (
    <Create title='Create a Topic' {...props}>
      <SimpleForm>
        <TextInput source='id' />
      </SimpleForm>
    </Create>
  )
}

export default TopicCreate
