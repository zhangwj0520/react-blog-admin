import { Button, Form,message } from 'antd'
import  React from 'react'
import {connect} from 'react-redux'
import action from '../../store/actions/say'
import Editor from '../common/Editor'
const FormItem = Form.Item

class AddSay extends React.Component {
   handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(localStorage.getItem('identity'))
        if (localStorage.getItem('identity') ==='"manager"') {
          this.props.AddSAY(values);
          this.props.history.push('/admin/edit-say')
        } else {
          message.warning('游客无权发表说说')
        }
      }
    })
  }
   render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem>
            {getFieldDecorator('say', {
              rules: [{ required: true, message: '不能为空!' }]
            })(<Editor placeholder="记录自己的心情" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
              发表说说
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(state=>state,action)(Form.create()(AddSay));
