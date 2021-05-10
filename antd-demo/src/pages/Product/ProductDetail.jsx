import { Card,Icon,List} from 'antd'
import React, { Component } from 'react'
import {reqcategoryname} from '../../api'
import   './detail.css'
import img1 from '../login/images/lisa.jpg'
export default class Productdetail extends Component {
    state={
        pCategoryId:"",  //父类的名称
        categoryId:""   //子类的名称
    }
   
    render() {
        const Item=List.Item
        const {desc,detail,imgs,name,price,}=this.props.location.state
        const {categoryId,pCategoryId}=this.state
        const title=(<span onClick={()=>{this.props.history.push('/admin/product')}} style={{cursor: "pointer"}}>👈<span>商品详情</span></span>)
        return (
            <Card title={title} size='small'>
                <List>
                    <Item>
                        <p><span className="detail-left">商品名称：</span><span>{name}</span></p>
                    </Item>
                    <Item>
                        <p><span className="detail-left">商品描述：</span><span>{desc}</span></p>
                    </Item>
                    <Item>
                        <p><span className="detail-left">商品价格：</span><span>{price}元</span></p>
                    </Item>
                    <Item>
                        <p><span className="detail-left">所属分类：</span><span>{pCategoryId}--＞{categoryId}</span></p>
                    </Item>
                    <Item>
                        <p><span className="detail-left">商品图片：</span>
                        {/* 图片展示功能未实现 */}
                        <img src={img1} alt="" className="detail-img"/>
                        <img src={img1} alt="" className="detail-img"/>
                        </p>
                    </Item>
                    <Item className="detail-product">
                        <p><span className="detail-left detail-left-product">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                        </p>
                    </Item>
                </List>
            </Card>
        )
    }
    getCategoryName=async()=>{
        const {categoryId,pCategoryId,}=this.props.location.state

        //获取父类的名字
        const presult=reqcategoryname(pCategoryId)
        //获取父类的名字
        const result =reqcategoryname(categoryId)
        //使用promise.all处理多个高并发  (只有所有的promise的状态变成fulfilled，names才会变成fulfilled，并且返回值以数组的形式返回给names。)
        const names=await Promise.all([presult,result])
        this.setState({pCategoryId:names[0].data.name,categoryId:names[1].data.name})
        console.log(names)
    }
    componentDidMount(){
        //用于获取商品属于那一分类，然后设置   《所属分类》  5fe500cecc325b1aceb361ef     5fe500e4cc325b1aceb361f1
        this.getCategoryName()
    }

}
