import { Form, Input, Modal, Select ,message} from 'antd'
import React from 'react'
import Editor from '../common/Editor'
import {connect} from 'react-redux'
import action from '../../store/actions/acticles'
const Option = Select.Option
const FormItem = Form.Item

class Login extends React.Component {
  handleCancel = () => {
    this.props.toggleVisible(false)
  }
  handleOk = (e) => {
    e.preventDefault()
    const { form, toggleVisible, _id } = this.props
    form.validateFields((err, values) => {
      if (!err) {     
        if (localStorage.getItem('identity') === '"manager"') {
          this.props.EditArticle({ ...values, _id })
        toggleVisible(false)
        } else {
          message.warning('游客无权编辑')
          toggleVisible(false)
        }  

      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { content, type, tag, nature, title, abstract, visible } = this.props
    //const editorState = EditorState.createFrom(content)
    const selectBefore = getFieldDecorator('nature', { initialValue: nature })(
      <Select style={{ width: 70 }}>
        <Option value="原创">原创</Option>
        <Option value="转载">转载</Option>
      </Select>
    )
    return (
      <Modal
        width="80%"
        title="文章编辑"
        destroyOnClose={true}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <Form layout="inline">
          <FormItem hasFeedback={true} label="文章标题">
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{ required: true, message: '请填写文章标题!' }]
            })(
              <Input
                addonBefore={selectBefore}
                placeholder="请填写文章标题"
                style={{ width: 220 }}
              />
            )}
          </FormItem>
          <FormItem hasFeedback={true} label="文章标签">
            {getFieldDecorator('tag', {
              initialValue: tag && tag.title,
              rules: [{ required: true, message: '文章标签!' }]
            })(<Input placeholder="填写个文章标签吧" style={{ width: 200 }} />)}
          </FormItem>
          <FormItem hasFeedback={true} label="文章类型" style={{ width: 300 }}>
            {getFieldDecorator('type', {
              initialValue: type,
              rules: [{ required: true, message: '文章类型!' }]
            })(
              <Select style={{ width: 200 }}>
                <Option value="">请选择类型</Option>
                <Option value="typescript">typescript</Option>
                <Option value="javascript">javascript</Option>
                <Option value="react">react</Option>
                <Option value="node">node</Option>
                <Option value="css">css</Option>
              </Select>
            )}
          </FormItem>
          <FormItem hasFeedback={true} label="文章摘要">
            {getFieldDecorator('abstract', {
              initialValue: abstract,
              rules: [{ required: true, message: '文章摘要!' }]
            })(<Input placeholder="文章摘要!" style={{ width: 320 }} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('content', {
              initialValue: content,
              rules: [{ required: true, message: '文章摘要!' }]
            })(<Editor />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default connect(state=>state,action)(Form.create()(Login)) 