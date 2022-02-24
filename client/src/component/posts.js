import * as React from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";
import RichTextInput from "ra-input-rich-text";
import ResizeModule from "@botom/quill-resize-module";
import { useMediaQuery } from "@material-ui/core";
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
  SimpleList,
  required,
  DateInput,
  DeleteButton,
  FileField,
  FileInput,
  ShowButton,
} from "react-admin";
import axios from 'axios';
axios.defaults.withcredentials = true;

//提供Quill套件image、video改變大小用
Quill.register("modules/resize", ResizeModule);
Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);
Quill.register("modules/attachmentHandler", AttachmentHandler);

//判斷ListTitle
const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

//List搜尋
const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="CategoryID"
    label="Category"
    reference="category"
    allowEmpty
  >
    <SelectInput optionText="Name" />
  </ReferenceInput>,
];

export const PostList = (props) => {
  //RWD排版判斷
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={postFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
        />
      ) : (
        <Datagrid>
          <TextField source="id" sortBy="title" />
          {/*Posts.CaregoryID關聯categorys.Category_name*/}
          <ReferenceField
            label="Category"
            source="CategoryID"
            reference="categorys"
          >
            <TextField source="Category_name" />
          </ReferenceField>
          <TextField source="title" />
          <TextField source="publishedAt" />
          <EditButton />
          <DeleteButton />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <ReferenceInput
        label="Category"
        source="CategoryID"
        reference="categorys"
        validate={[required()]}
      >
        <SelectInput optionText="Category_name" />
      </ReferenceInput>
      <DateInput
        label="Published"
        source="publishedAt"
        validate={[required()]}
      />
      {/* <FileInput source="files" label="Related files" accept="application/pdf"multiple={true}  placeholder={<p>Drop your file here</p>}>
                    <FileField source="src" title="title" />
                </FileInput> */}
      <RichTextInput
        source="newsquill"
        options={{
          modules: {
            resize: {
              locale: {
                // 圖片、影片調整大小以及定位功能
                altTip: "Hold down the alt key to zoom",
                floatLeft: "Left",
                floatRight: "Right",
                center: "Center",
                restore: "Restore",
              },
            },
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["image"],
              ["video"],
              ["link"], // remove formatting button
            ],
            videoHandler: {
              upload: (file) => {
                // return a Promise that resolves in a link to the uploaded image
                return new Promise((resolve) => {
                  const fd = new FormData();
                  fd.append("video", file);
                  _onUpload(fd, resolve,'video');
                });
              },
            },
            imageHandler: {
              upload: file => {
                return new Promise((resolve) => {
                  const fd = new FormData();
                  fd.append("image", file);
                  _onUpload(fd, resolve,'image');
                });
              }
            },
          },
        }}
      />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <ReferenceInput
        label="Category"
        source="CategoryID"
        reference="categorys"
        validate={[required()]}
      >
        <SelectInput optionText="Category_name" />
      </ReferenceInput>
      <DateInput
        label="Published"
        source="publishedAt"
        validate={[required()]}
      />
      {/* <FileInput source="files" label="Related files" accept="application/pdf" multiple={true} placeholder={<p>Drop your file here</p>}>
                    <FileField source="src" title="title"/>
                </FileInput> */}
      {/*Quill套件，React-Admin套件提供*/}
      <RichTextInput
        source="newsquill"
        options={{
          modules: {
            resize: {
              locale: {
                // 圖片、影片調整大小以及定位功能
                altTip: "Hold down the alt key to zoom",
                floatLeft: "Left",
                floatRight: "Right",
                center: "Center",
                restore: "Restore",
              },
            },
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["image"],
              ["video"],
              ["link"], // remove formatting button
            ],
            videoHandler: {
              upload: (file) => {
                // return a Promise that resolves in a link to the uploaded image
                return new Promise((resolve) => {
                  const fd = new FormData();
                  fd.append("video", file);
                  _onUpload(fd, resolve,'video');
                });
              },
            },
            imageHandler: {
              upload: file => {
                return new Promise((resolve) => {
                  const fd = new FormData();
                  fd.append("image", file);
                  _onUpload(fd, resolve,'image');
                });
              }
            },
          },
        }}
      />
    </SimpleForm>
  </Create>
);

const _onUpload =  async(fd, resolve,type)=> {
  const baseURL = 'http://localhost:3090/periodical'
  const result = await axios.post(`${baseURL}/api/upload/${type}`,fd);
  resolve(`http://localhost:3090/${type}/${result.data.fileName}`);
};
