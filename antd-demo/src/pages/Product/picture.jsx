import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqdelateimg} from '../../api'
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  export default class PicturesWall extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    };
  
    handleCancel = () => this.setState({ previewVisible: false });
  
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,  
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),  //大图得图片名字
      });
    };
    //file 当前操作的文件  filelist 当前得文件列表
    handleChange = async({file, fileList }) => 
    {   
        //一旦上传成功修改filelist得name。
        if(file.status==='done'){
            if(file.response.status===0){
                const {name,url}=file.response.data
                message.success("成功了")
                file.name=name
                file.url=url
                // console.log(file===fileList[fileList.length-1])
            }else{
                message.error("失败了")
            }   
        }else if (file.status==="removed"){
            console.log(file)
            const name=file.name
            const result=await reqdelateimg({name})
            if(result.status===0){
                message.success("删除图片成功")
            }else{
                message.error("删除图片失败")
            }
        }

        this.setState({ fileList })
    };
    
    render() {
      const { previewVisible, previewImage, fileList, previewTitle } = this.state;
      const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      return (
        <>
          <Upload
            action="/manage/img/upload"
            accept="image/*"
            listType="picture-card"
            fileList={fileList}  //所有已上传图片对象得数组
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            name='image' //请求参数名
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </>
      );
    }
  }
  
