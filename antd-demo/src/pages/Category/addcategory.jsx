import React,{Component} from 'react';
import { Modal, Button, Input ,Form} from 'antd';
import {useEffect,useState} from 'react'
import {connect} from 'react-redux'
// import Form from 'antd/lib/form/Form';
 function Addcategory(props){
  console.log(props)
  const [visible,setVisible]=useState(props.addvisible)
  useEffect(()=>{
    setVisible(props.addvisible)
  },[props.addvisible])
  const [name,setName]=useState('')
  //分类名称
  // const [name,setName]=useState('一级分类')
  return (
            <Modal title="Basic Modal" visible={visible} 
              
              //设置一个回调函数，通过点击确定，修改模态框的显示与隐藏
              onOk={()=>{
                //发送ajax请求
                // const {c}=props.state.add.data  
                
                props.controlAddvisible(false)
              }}
              //点击cancel，关闭
              onCancel={()=>{props.controlAddvisible(false)}}
            >
              <p>添加分类名称</p>
              <Form.Item>
                <Input type="text" value={name} onChange={(e)=>{
                  setName(e.target.value)
                }}/>
              </Form.Item>
              
              <p>添加到分类</p>
              <Form.Item>
                <Input type="text" 
                value={props.state.name ? props.state.name.data.c.name : "一级菜单"}
              />
              </Form.Item>
            </Modal>
  )
}
function mapStateToProps(state){
    return {state}
  }


export default connect(mapStateToProps)(Addcategory)

