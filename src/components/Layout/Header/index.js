import { Dropdown, Icon, Layout, Menu, Popover, Badge } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import './style.less'
import { connect } from 'react-redux'
const { Header } = Layout
const SubMenu = Menu.SubMenu;

class BlogHeader extends React.Component {
  onClick = () => {
    localStorage.clear();
    this.props.push('/admin/login')
  }
  render() {
    const { collapsed, toggle, children, isMobile } = this.props
    const userName = JSON.parse(localStorage.getItem("userName"))
    const menu = (
      <Menu>
        <Menu.Item key="logout"  onClick={this.onClick}>
          退出登录
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className="header">
        {isMobile ? (
          <Popover content={children} placement="bottomRight" trigger="click">
            <Icon className="trigger" type="bars" onClick={toggle} />
          </Popover>
        ) : (
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          )}
         <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="schedule">
                        <Link to="/admin/calendars">
                            <Badge count={0} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>
                                <Icon type="schedule" style={{fontSize:16, color: '#1DA57A' }}/>
              </Badge>
              <span>日历</span>
                        </Link>
                       
                    </Menu.Item>
                   
                </Menu>
        
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className="user">
            <Icon type="user" style={{ marginRight: 5, fontSize: 20 ,color: '#1DA57A' }} />
            <span>{userName}</span>
          </div>
        </Dropdown>
      </Header>
    )
  }
}

export default connect(state=>state)(BlogHeader) 