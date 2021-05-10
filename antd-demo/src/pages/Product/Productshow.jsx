import React, { Component } from 'react'
import { Card ,Select,Button,Input, Table,} from 'antd';
import {Switch,Redirect,Route,Link} from 'react-router-dom'
import ProductAdd from './ProductAdd'
import ProductUpdata from './ProductUpdata'
import ProductDetail from './ProductDetail'


import Linkbutton from '../../components/link-button/link-button';
import { reqproduct,reqsearch,noSale} from '../../api';

export default class Productshow extends Component {
    state={
        product:[],
        pageNum:1, //请求的页数
        pageSize:4,//每页展示的记录数    
        total:0, //总共的数据    
        loading:true,
        searchName:"",   //搜索关键字
        searchType:"productName",

    }
    render() {

        const {product,pageSize,total,pageNum,loading,searchName,searchType}=this.state
        const title=<span>
                        <Select value={searchType} onChange={(value)=>{this.setState({searchType:value})}}>
                            <option value={'productName'}>按名称搜索</option>
                            <option value={'productDesc'}>按描述搜索</option>
                        </Select>
                        <Input placeholder="关键字" style={{width:"100px",margin: "0 10px "}} value={searchName}
                        allowClear={true}
                        onChange={(e)=>{this.setState({searchName:e.target.value})}}
                        ></Input>
                        <Button type="primary"  onClick={()=>{this.getproduct(pageNum,pageSize)}}>搜索</Button>
                    </span>
        const extra= <span onClick={()=>{this.props.history.push("/admin/product/add",{})}}>添加</span>
          const columns = [
              
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=> "￥"+price 
            },
            
              {
                width:90,
                title: '状态',
                render:(data)=>{
                    
                    return (
                        <span>
                            <Button type="primary" onClick={()=>{
                                this.noSale(data)
                            }}>{data.status===2? "上架":"下架"}</Button>
                            <span>{data.status===2? "已下架" :" 在售"}</span>
                        </span>
                    )
                }
              },
              {
                width:80,
                title: '操作',
                render:(product)=> <span>
                                <a 
                                    style={{color:"#f00"}}
                                    href="#" onClick={(e)=>{
                                    e.preventDefault()
                                    this.props.history.push("/admin/product/detail",product)
                                }}>详情</a>
                                <p onClick={()=>{this.props.history.push('/admin/product/add',product)}}>修改</p>
                            </span>
              },
          ];
        return (
            <div>
                <Card title={title} extra={extra} >
                </Card>
                <Table dataSource={product} columns={columns}
                    rowKey={product._id}
                    pagination={{defaultPageSize:pageSize,
                        total:total,
                        onChange:(pageNum,pageSize)=> {
                            // 为了实现后边页数可以上架下架功能。
                            this.getproduct (pageNum,pageSize)
                            this.setState({pageNum,pageSize})
                        }
                    }}
                    loading={loading}
                />;
            </div>
        )
    }
    //封装请求商品列表
    getproduct= async(pageNum,pageSize)=>{
        const {searchName,searchType}=this.state
        let result
        if(searchName){
            result=await reqsearch({pageNum,pageSize,searchType,searchName})
            console.log(result)
        }else{
            result=await reqproduct(pageNum,pageSize)
            // console.log(result)
        }
        this.setState({loading:true})
        if(result.status===0){
            this.setState({product:result.data.list,total:result.data.total})
        }
        this.setState({loading:false})
    }
    //商品下架功能实现
    noSale= async(data)=>{
        const {_id,status}=data
        // const result=await noSale({productId:_id,status})
        const result = await noSale({productId:_id,status:status===1?2:1})
        if(result.status===0){

        //切换页面也能实现该功能
        const {pageNum,pageSize}=this.state
        console.log(pageNum)
        this.getproduct(pageNum,pageSize)
        }
        console.log(result)
    }
    componentDidMount(){
        const {pageNum,pageSize}=this.state
        this.getproduct(pageNum,pageSize)
    }
}





