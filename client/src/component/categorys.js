import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Create,
    Edit,
    SimpleForm,
    SelectInput,
    TextInput,
    DeleteButton,
} from 'react-admin';


const CategorysTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};


export const CategorysList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="Category_name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const CategorysEdit = props => (
    <Edit title={<CategorysTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="Category_name" />
        </SimpleForm>
    </Edit>
);

const choices = [
    { id: 'C01'},
    { id: 'C02'},
    { id: 'C03'},
    { id: 'C04'},
    { id: 'C05'},
    { id: 'C06'},
    { id: 'C07'},
    { id: 'C08'},
    { id: 'C09'},
    { id: 'C10'},
];

export const CategorysCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput source="id" choices={choices} optionText="id" optionValue="id" />
            <TextInput source="Category_name" />
        </SimpleForm>
    </Create>
);