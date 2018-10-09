import { Button, Form, Icon, Input } from 'antd'
import {connect} from 'react-redux'
import action from '../../store/actions/user'
import React from 'react'
import './style.less'
const FormItem = Form.Item
class Login extends React.Component {
  static getDerivedStateFromProps(props) {
    const { history} = props
    if (localStorage.getItem('token')&&localStorage.getItem('token')!=='undefined') {
      history.push('/admin')
    }
    return null
  }
  state={}
   handleSubmit = (e) => {
    e.preventDefault()
     const { form} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.props.RequestToken(values) 
      }
    })
  }
   isLogin = () => {
     const token = localStorage.getItem('token')

    if (token && token !== 'undefined') {
      this.props.history.push('/admin')
    } else {
        this.props.history.push('/admin/login')
    }
  }
   componentDidMount() {
    this.isLogin()
  }
  render() {
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="logo">
          <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          <span>Blog ADMIN</span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback={true}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '账号不能为空!' }]
            })(
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: 'rgba(0,0,0,.5)', fontSize: 16 }}
                  />
                }
                placeholder="请输入账号"
              />
            )}
          </FormItem>
          <FormItem hasFeedback={true}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }]
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: 'rgba(0,0,0,.5)', fontSize: 16 }}
                  />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
        <p>
          <span>Username：guest</span>
          <span>Password：guest</span>
        </p>
      </div>
    )
  }
}
export default connect(state=>state,action)(Form.create()(Login));
