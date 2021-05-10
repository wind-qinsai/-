import React from 'react'
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
// import menuList from '../../config/menuconfig'
import menuList from '../../config/menuconfig'

const { SubMenu } = Menu;

export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  gomenulist=(menuList)=>{
    return menuList.reduce((pre,item)=>{
      // console.log(pre,item)
      if(!item.children){
         pre.push((
          <Menu.Item key={item.key} icon={<item.icon/>}>
          <Link to={item.key} >{item.title}</Link>
          </Menu.Item>
        ))
      }else{
         pre.push((
          <SubMenu key={item.key} icon={<item.icon/>} title={item.title}>
            {this.gomenulist(item.children)}
          </SubMenu>
        ))
      }
      return pre
    },[])
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
        {this.gomenulist(menuList)}
        </Menu>

      </div>
    );
  }
}