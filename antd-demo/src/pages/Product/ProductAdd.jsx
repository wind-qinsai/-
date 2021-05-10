import React, { Component } from 'react'
import { Card, Button, Form, Input, InputNumber, Select, Upload, message, Cascader } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { reqCategory } from '../../api'
import PicturesWall from './picture'
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
}


export default class ProductAdd extends Component {

  //初始化状态
  state = {
    loading: false,
    options: []
  };

  onFinish = (values) => {
    console.log('value',values)
  }

  //异步加载数据
  loadData = async (selectedOptions) => {
    //目标选项
    console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    //异步加载二级或者下一级
    const subcategory = await this.getCategory(targetOption.value)
    console.log(subcategory)
    //判断当前分类是否还有子分类
    if (subcategory && subcategory.data.length > 0) {
      //加载完毕
      targetOption.loading = false;
      targetOption.children = subcategory.data.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: false,
      }))
    }else{//说明当前没有下一级分类
      // console.log(targetOption)
      targetOption.isLeaf=true
      targetOption.loading = false; 
    }

    //修改状态  为什么要解构赋值
    this.setState({ options: [...this.state.options] })
  }

 
  componentWillMount(){
    //用来区分用户点击的是添加还是修改，如果是修改则product是有值得，否则是空对象，这样避免报错
    const product=this.props.location.state
    //使用！！进行强制转换，并保存是否修改得标识,如果是true则是修改
    this. isupdate=!!product
    console.log(this.isupdate)
    this.product=product||{}
    this. categoryIds=[]
    if(this.isupdate){
      const {pCategoryId,categoryId}=this.props.location.state
      
      //如果只存在一级分类
      if(pCategoryId==='0'){
        this.categoryIds.push(pCategoryId)
      }else{//如果存在一级/二级
        this.categoryIds.push(pCategoryId)
        this.categoryIds.push(categoryId)
      }
      console.log(this.categoryIds)
    }
    //问题：为什么级联选择器只能选择出第一级options，点击了一级option，生成了二级列表，子分类此时就会自动加载上去。
    //根源：是因为对应得二级列表没有加载，没有生成option，如果加载一级列表得时候，同时生成了二级列表，那么就会一同加载
    //解决：

  }
  render() {
    const title = (<span><span  onClick={()=>this.props.history.push('/admin/product/show')}  style={{ cursor: 'pointer' }}>👈</span>{this.isupdate? '修改商品':'添加商品'}</span>)
    const Item = Form.Item
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <Card title={title} extra={<a href="#">More</a>}>
        <Form {...layout} onFinish={this.onFinish}>

          <Item label='商品名称'
            name="name"
            required
            initialValue={this.product.name}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item label='商品描述'
            name="desc"
            initialValue={this.product.desc}
            required rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input.TextArea placeholder="请输入商品描述"></Input.TextArea>
          </Item>
          <Item label='商品价格'
            name="price"
            initialValue={this.product.price}
            required
            rules={[
              {
                required: true,
                transform: (value) => (1 * value),
                type: 'number',
                min: 0,
                message: "请重新输入正确价格",
              }
            ]}
          >
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>

          <Item label='商品分类'
            name="categoryIds"            
            required rules={[{
              required: true,
              message:"shabi meixie "
            }]}>
            <Cascader 
            defaultValue={this.categoryIds}
            options={this.state.options} 
            loadData={this.loadData} />
            <a href="">{console.log(this.categoryIds)}</a>
          </Item>

          <Item label='商品图片' required rules={[{
            required: true
          }]}>
            <PicturesWall></PicturesWall>
          </Item>


          <Item label='商品描述' required rules={[{
            required: true
          }]}>
            <Input placeholder="请输入商品"></Input>
          </Item>
          <Button type="submit" htmlType="submit">提交</Button>
        </Form>
      </Card>
    )
  }
  //异步请求数据
  getCategory = async (parentId) => {
    const {pCategoryId,categoryId} = this.props.location.state

    const result = await reqCategory(parentId)
    if (result.status === 0) {
      //进行判断 如果是一级列表
      if (parentId === 0) {
        const c = result.data.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: false,
        }))
   //解决没有二级列表得问题
        //首先要得到二级列表信息
        if(this.isupdate){
        const subresult= await this.getCategory(pCategoryId)
        console.log(this.isupdate)
        //生成二级列表
      const  childOptions=subresult.data.map(c=>({
          value: c._id,
          label: c.name,
          isLeaf: false,
        }))
        //找到对应得一级列表
         
      const  targetOption =c.find((c) => c.value===pCategoryId)
       //将二级列表关联上对应得一级列表
       targetOption.children=childOptions
       console.log(targetOption)
      }


        //修改状态
        this.setState({ options: c })
      } else {//如果是二级列表
        return reqCategory(parentId)
      }
    }
  }

  componentDidMount() {
    const parentId = 0
    this.getCategory(parentId)
  }
}
