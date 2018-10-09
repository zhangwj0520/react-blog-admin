import { Icon, Menu } from 'antd'
import * as React from 'react'
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class BlogMenu extends React.Component {
  // 匹配当前路由，保持菜单选中
   static getDerivedStateFromProps(nextProps, state) {
    const { pathname, menuList } = nextProps
    if (state.pathname === pathname) {
      return null
    }
    let nextState = {}
    menuList.forEach(items => {
      if (Array.isArray(items.children)) {
        items.children.forEach(item => {
          if (item.url === pathname) {
            nextState = {
              key: item.key,
              openKeys: items.key
            }
          }
        })
      } else {
        if (items.url === pathname) {
          nextState = { key: items.key }
        }
      }
    })
    nextState = { ...nextState, pathname }
    return nextState
  }
   state = {
    key: '1',
    openKeys: '',
    pathname: '/'
  }
   onMenuItem = (item) => {
    this.props.handleTag(item)
    this.setState({ key: item.key })
  }

   onOpenChange = (openKeys) => {
    this.setState({ openKeys: openKeys[openKeys.length - 1] })
  }

  // 递归生成菜单
   renderMenu = (menuList)=> {
    return menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} className="big-icon-font" />
                <span>{item.label}</span>
              </span>
            }>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <MenuItem key={item.key} onClick={() => this.onMenuItem(item)}>
            <Link to={item.url || ''}>
              <Icon type={item.icon} className="big-icon-font" />
              <span>{item.label}</span>
            </Link>
          </MenuItem>
        )
      }
    })
  }

   render() {
    const { openKeys, key } = this.state
    return (
      <Menu
        theme={this.props.theme ? 'dark' : 'light'}
        mode="inline"
        onOpenChange={this.onOpenChange}
        selectedKeys={[key]}
        openKeys={[openKeys]}>
        {this.renderMenu(this.props.menuList)}
      </Menu>
    )
  }
}

export default BlogMenu