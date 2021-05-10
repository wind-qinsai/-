import React, { Component } from 'react'
import { Modal, } from 'antd';
import { reqUpdateCategory } from '../../api/index'
import { connect } from 'dva';
export default class Updatecategory extends Component {
    state = { 
        visible: this.props.visible ,
        name:"",
        _id:"",
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
//封装发送请求
Updatecategory= async()=>{
    const {name,_id}=this.state
    const update=await reqUpdateCategory(_id,name)
    console.log(update)
    if(update.status="0"){
        this.props.getCategory()
        this.props.Updatecategory(false)
    }
}
    handleOk = e => {
        console.log(e);
        this.Updatecategory()
        
    };

    handleCancel = e => {
        console.log(e);
        
        this.props.Updatecategory(false)
    };
//获得更新的名字
    updatename= e=>{
        this.setState({name:e.target.value})
    }
    render() {
        
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>修改分类的名称</p>
                    <input type="text" value={this.state.name}
                    onChange={this.updatename}
                    />
                </Modal>
            </div>
        )
    }

    //为什么不需要了？？
    componentWillReceiveProps(props){
        const {visible,name,_id}=props
        this.setState({visible,name,_id:_id,getCategory:this.props.getCategory})
        console.log('gengxin',props)
    }
}