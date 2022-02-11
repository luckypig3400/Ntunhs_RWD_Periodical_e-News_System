import React from 'react'
import {SimpleForm, TextInput, DateInput,SelectInput,ReferenceInput,required,Edit} from 'react-admin'
import RichTextInput from 'ra-input-rich-text';
import 'react-quill/dist/quill.snow.css';

const PostEdit = (props) => {
  return (
    <Edit title='Edit Post' {...props}>
      <SimpleForm>
        <TextInput source='title' />
        <ReferenceInput label="Category_name" source="Category_name" reference="Categorys" validate={[required()]}>
            <SelectInput optionText="Category_name" />
        </ReferenceInput>
        <DateInput label='Published' source='publishedAt' />
        <RichTextInput 
        source="newsquill" 
        toolbar={[
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],  
          ['image'],
          ['video'],
          ['link']                                       // remove formatting button
        ]}/>
      </SimpleForm>
    </Edit>
  )
}

export default PostEdit
