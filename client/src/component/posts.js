import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    SimpleList ,
    required,
    DateInput,
    DeleteButton,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import 'react-quill/dist/quill.snow.css';


const PostTitle = ({ record }) => {
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="CategoryID" label="Category" reference="categorys" allowEmpty>
        <SelectInput optionText="Category_name" />
    </ReferenceInput>,
];

export const PostList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={postFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="Category" source="CategoryID" reference="categorys">
                        <TextField source="Category_name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="publishedAt" />
                    <EditButton />
                    <DeleteButton/>
                </Datagrid>
            )}
        </List>
    );
}

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
                <TextInput source='title'  validate={[required()]}/>
                <ReferenceInput label="Category" source="CategoryID" reference="categorys" validate={[required()]}>
                    <SelectInput optionText="Category_name" />
                </ReferenceInput>
                <DateInput label='Published' source='publishedAt'  validate={[required()]}/>
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
                ]}
                />
            </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source='title'  validate={[required()]}/>
                <ReferenceInput label="Category" source="CategoryID" reference="categorys" validate={[required()]}>
                    <SelectInput optionText="Category_name" />
                </ReferenceInput>
                <DateInput label='Published' source='publishedAt'  validate={[required()]}/>
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
                ]}
                />
            </SimpleForm>
        </Create>
    );