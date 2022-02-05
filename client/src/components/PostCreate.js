import React from 'react'
import { Create, SimpleForm, TextInput, DateInput} from 'react-admin'
import RichTextInput from 'ra-input-rich-text';
import 'react-quill/dist/quill.snow.css';

const PostCreate = (props) => {
  return (
    <Create title='Create a Post' {...props}>
      <SimpleForm>
        <TextInput source='title' />
        <TextInput source='topic' />
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
          ['image']                                       // remove formatting button
        ]}/>
      </SimpleForm>
    </Create>
    
  )
}

export default PostCreate
