import { message } from 'antd'
import ajax from './ajax'
import jsonp from 'jsonp'
const BASE=''
export const reqlogin=(username,password)=> ajax(BASE+'/login',{username,password},'POST')
export const reqAdduser=(user)=> ajax(BASE+'/manage/user/add',user,'POST')
//获取一级或某个二级分类列表
export const reqCategory=(parentId)=> ajax(BASE+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory=({parentId,categoryName})=> ajax(BASE+'/manage/category/add',{parentId,categoryName},'POST')
//更新分类
export const reqUpdateCategory=(categoryId,categoryName)=> ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')
//请求商品分页展示
export const reqproduct=(pageNum,pageSize)=> ajax(BASE+'/manage/product/list',{pageNum,pageSize})
//搜索商品
export const reqsearch=({pageNum,pageSize,searchName,searchType})=>ajax(BASE+"/manage/product/search",
{   pageNum,
    pageSize,
    //使用变量来决定什么类型的搜索
    [searchType]:searchName
})
//通过数据的id来获取数据的名字
export const reqcategoryname=(categoryId)=> ajax(BASE+'/manage/category/info',{categoryId})
//商品下架功能
export const noSale=({productId,status})=>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')
//删除图片
export const reqdelateimg=({name})=>ajax(BASE+'/manage/img/delete',{name},'POST')
