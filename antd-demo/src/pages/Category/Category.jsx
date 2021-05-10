import React, { Component } from 'react'
import { Card, Table, Space, message, Modal, Button, Form, Input, Select } from 'antd';
import Linkbutton from '../../components/link-button/link-button';
import { reqCategory } from '../../api'
import { reqUpdateCategory,reqAddCategory } from '../../api'
import Updatecategory from './updatecategory'
import Addcategory from './addcategory'
import {connect} from 'react-redux'
const { Option } = Select;
 class Home extends Component {
    state = {
        category: [],      //一级分类
        loading: true,
        subCategory: [],  //二级分类
        parentId: "0",      //默认一级分类
        name: "",           //分类的名称
        _id:"",
        visible:false,
        addvisible:false
    }

    //封装初始化
    initColumns = () => {
        this.columns = [
            {

                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                width: 300,
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                render: (text, recode) => (
                    <Space size="middle">
                        <a onClick={()=>this.setVisible(text,recode)}>修改分类</a>
                         <Linkbutton onClick={()=>this.showSubCategory(text,recode)}>查看子分类</Linkbutton>
                    </Space>
                ),
            },
        ];
    }
    //初始化列表
    componentWillMount() {
        this.initColumns()
    }
    //封装异步请求
    getCategory = async () => {
        //  为什么要用变量先存起来？
        const { parentId } = this.state
        const list = await reqCategory(parentId)
        console.log(list)
        this.setState({ loading: false,visible:false, })
        if (list.status === 0) {
            //二级列表
            const category = list.data
            if (parentId === "0") {
                this.setState({ category })
            } else {
                this.setState({ subCategory: category })
            }


        } else {
            message.error("出错啦")
        }

    }
    //发送异步请求
    componentDidMount() {
        
        this.getCategory()
        //通过dispatch将所需要的信息分发给store
        this.props.add(this.state.parentId)
    }
    //点击修改分类显示modal
    setVisible=(text,recode)=>{
        console.log(recode)
        this.setState({visible:true,name:recode.name,_id:recode._id})
    }
    //通过组件获得一级列表的id,并查看子分类
    showSubCategory = (text, recode) => {
        console.log(text,recode)
        
        
        

        this.setState({ parentId: recode._id, name: recode.name }, () => {
            this.getCategory()
            //通过dispatch将所需要的信息分发给store
            this.props.add(this.state.parentId)
            this.props.name(recode)
        })
        console.log(this.state)
    }
    //点击返回并显示一级菜单
    showCategory = () => {
        this.setState({
            parentId: "0",
            name: "",
            parent_id:"0"
        })
        this.props.add("0")
    }
    //子组件点击进行修改父组件的状态
    Updatecategory=(visible)=>{
        this.setState({
            visible:visible,
        })
    }

    //点击添加显示添加子modal
    showaddcategory=()=>{
        this.setState({addvisible:true})
    }
    //通过子元素传输的表示控制添加子组件的显示于隐藏
    controlAddvisible=(addvisible)=>{
        this.setState({addvisible})
    }
    render() {
        //引入动态数据
        const { category, parentId, subCategory, name, categoryName } = this.state
        //    const title= "一级菜单"
        const title = this.state.parentId === "0" ? "一级菜单" : <p><Linkbutton onClick={this.showCategory}>一级菜单</Linkbutton> {name}</p>
        return (


            <Card title={title} extra={<Linkbutton onClick={this.showaddcategory}>添加</Linkbutton>} style={{ height: "100%" }}>

                <Table
                    dataSource={parentId === "0" ? category : subCategory} columns={this.columns} bordered
                    loading={this.state.loading}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                >

                </Table>                
                <Updatecategory 
                    //修改页面的显示
                    visible={this.state.visible}
                    //将修改分类的名称传到修改组件
                    name={this.state.name}
                    
                    _id={this.state._id}
                    getCategory={this.getCategory}
                    Updatecategory={this.Updatecategory}
                ></Updatecategory>
                <Addcategory 
                addvisible={this.state.addvisible}
                // 传输回调函数，用来专门修改父组件的state
                controlAddvisible={this.controlAddvisible}
                ></Addcategory>
            </Card>
        )
    }
    
}
function mapStateToProps(state){
    return {state}
}

function mapDispatchToProps(dispatch){
    return {
        add:function(c){dispatch({type:"add",data:{c}})},
        name:function(c){dispatch({type:"name",data:{c}})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)