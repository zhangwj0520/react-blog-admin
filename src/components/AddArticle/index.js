import { Button, Form, Input, Select,message } from 'antd'
import Editor from '../common/Editor'
import React from 'react'
import {connect} from 'react-redux'
import action from '../../store/actions/acticles'
const Option = Select.Option
const FormItem = Form.Item

class AddArticle extends React.Component {  
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {               
              if (localStorage.getItem('identity') === '"manager"') {
                  this.props.AddArticle(values);
                  this.props.history.push('/admin/edit-article')
              } else {
                message.warning('游客无权编辑')
                }
            }
        })
    }
    render() {
        
        const { getFieldDecorator } = this.props.form
        const selectBefore = getFieldDecorator('nature', { initialValue: '原创' })(
            <Select style={{ width: 70 }}>
                <Option value="原创">原创</Option>
                <Option value="转载">转载</Option>
            </Select>
        )
        return (
            <div>
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem hasFeedback={true} label="文章标题">
                    {getFieldDecorator('title', {
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
                    rules: [{ required: true, message: '文章标签!' }]
                    })(<Input placeholder="填写个文章标签吧" style={{ width: 200 }} />)}
                </FormItem>

                <FormItem hasFeedback={true} label="文章类型" style={{ width: 300 }}>
                    {getFieldDecorator('type', {
                    initialValue: '',
                    rules: [{ required: true, message: '请选择文章类型!' }]
                    })(
                    <Select style={{ width: 200 }}>
                        <Option value="">请选择类型</Option>
                        <Option value="css">css</Option>
                        <Option value="javascript">javascript</Option>
                        <Option value="vue">vue</Option>
                        <Option value="react">react</Option>
                        <Option value="node">node</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem style={{float:'right'}}>
                    <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    发表文章
                    </Button>
                </FormItem> 
                <FormItem hasFeedback={true} label="文章摘要">
                    {getFieldDecorator('abstract', {
                    rules: [{ required: true, message: '文章摘要!' }]
                    })(<Input placeholder="文章摘要!" style={{ width: 1124 }} />)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('content', {
                    rules: [{ required: true, message: '文章内容' }]
                    })(<Editor />)}
                </FormItem>                   
            </Form>
        </div>
        )
    }        
}
export default connect(state=>state,action)(Form.create()(AddArticle));