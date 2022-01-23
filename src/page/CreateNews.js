import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Header, Form, Image, Button, Segment,Modal } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import ReactQuill from 'react-quill';
import EditorToolbar,{modules,formats} from './EditorToolbar'



function CreateNews(Period,NewsClass) {
    const [title,setTitle]=React.useState('')
    const [newsPeriodOptions,setNewsPeriodOptions]=React.useState('')
    const [quillValue,setQuillValue]=React.useState('')
    const [newsClassOptions,setNewsClassOptions]=React.useState('')
    const [isModalOpen,setIsModalOpen]=React.useState(false)
    const [currentDate, setNewDate] = React.useState(new Date());
    const onChange = (event, data) => setNewDate(data.value);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newCurrentDate=currentDate.toLocaleDateString(undefined, options)

    Period=200
    NewsClass='熱門話題'

    const PeriodOptions = [
        { key: Period-2, text: Period-2, value: Period-2 },
        { key: Period-1, text: Period-1, value: Period-1 },
        { key: Period, text: Period, value: Period },
        { key: Period+1, text: Period+1, value: Period+1 },
        { key: Period+2, text: Period+2, value: Period+2 },
      ]

    const ClassOptions = [
        { key: '頭條新聞', text: '頭條新聞', value: '頭條新聞' },
        { key: '特別報導', text: '特別報導', value: '特別報導' },
        { key: '學術專區', text: '學術專區', value: '學術專區' },
    ]
    

    return (
        <>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        selection
                        label='選擇期數'
                        options={PeriodOptions}
                        placeholder='選擇期數'
                        value={newsPeriodOptions}
                        onChange={(e,{value})=>setNewsPeriodOptions(value)}
                    />
                    <Form.Dropdown
                        selection
                        label='選擇分類'
                        options={ClassOptions}
                        placeholder='選擇分類'
                        value={newsClassOptions}
                        onChange={(e,{value})=>setNewsClassOptions(value)}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                        label='標題'
                        placeholder='請輸入標題' 
                        value={title} 
                        onChange={(e)=>{
                            setTitle(e.target.value)
                        }}>
                    </Form.Input>
                    <SemanticDatepicker locale="pt-BR" label='設定時間' onChange={onChange}/>
                </Form.Group>
                <EditorToolbar/>
                <ReactQuill theme='snow' value={quillValue} onChange={setQuillValue} modules={modules} formats={formats}/>
                <Form.Button style={{margin:'10px'}} onClick={()=>{setIsModalOpen(true)}}>預覽</Form.Button>
            </Form>
            <Modal open={isModalOpen} style={{padding:'5px'}}>
                <Header as='h1' style={{margin:'5px'}}>{title}</Header>
                <Header  as='h6' style={{margin:'5px'}}>第{newsPeriodOptions}期週刊．{newsClassOptions}．{newCurrentDate}</Header>
                <ReactQuill style={{margin:'10px'}} value={quillValue} readOnly={true} theme={'bubble'} />
                <Button style={{margin:'10px'}} onClick={()=>{setIsModalOpen(false)}}>關閉</Button>
            </Modal>
        </>
        
    )
}

export default CreateNews