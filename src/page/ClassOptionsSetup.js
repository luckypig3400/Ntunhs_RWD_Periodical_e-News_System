import React from 'react'
import {Button, Input, List,Item}from 'semantic-ui-react'


function ClassOptionsSetup(){
    const ClassOptions = [
        { key: '頭條新聞', text: '頭條新聞', value: '頭條新聞' },
        { key: '特別報導', text: '特別報導', value: '特別報導' },
        { key: '學術專區', text: '學術專區', value: '學術專區' },
    ]

    for(var i=0;i<JSON.stringify(ClassOptions.length);i++){
        console.log(JSON.stringify(ClassOptions[i]));
    }

    
    return (
        <>
            <Input action='新增' placeholder='輸入分類名稱...' />
            <List divided verticalAlign='middle'>
                <List.Item>
                    <List.Content floated='left'>
                        <Button>刪除</Button>
                    </List.Content>
                    <List.Content floated='right' style={{padding:'10px'}}>{JSON.stringify(ClassOptions[0].text)}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Content floated='left'>
                        <Button>刪除</Button>
                    </List.Content>
                    <List.Content floated='right' style={{padding:'10px'}}>{JSON.stringify(ClassOptions[1].text)}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Content floated='left'>
                        <Button>刪除</Button>
                    </List.Content>
                    <List.Content floated='right' style={{padding:'10px'}}>{JSON.stringify(ClassOptions[2].text)}</List.Content>
                </List.Item>
            </List>
        </>
    )
}

export default ClassOptionsSetup