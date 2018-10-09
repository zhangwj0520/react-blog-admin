import { Button, Form, Input, Select } from 'antd'
import {connect} from 'react-redux'
import action from '../../store/actions/acticles'
import * as React from 'react'
const Option = Select.Option
const FormItem = Form.Item

class Search extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log(values)
        const {payload} = this.props.articles
        this.props.SearchArticles({...payload,...values })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const selectBefore = getFieldDecorator('nature', { initialValue: '' })(
      <Select style={{ width: 70 }}>
        <Option value="">全部</Option>
        <Option value="原创">原创</Option>
        <Option value="转载">转载</Option>
      </Select>
    )
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem hasFeedback={true} label="文章标题">
          {getFieldDecorator('title')(
            <Input
              addonBefore={selectBefore}
              placeholder="搜索文章标题"
              style={{ width: 220 }}
            />
          )}
        </FormItem>
        <FormItem hasFeedback={true} label="文章类型" style={{ width: 300 }}>
          {getFieldDecorator('type', { initialValue: '' })(
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
        <FormItem>
          <Button type="primary" htmlType="submit" icon="search">
            查询
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default connect(state=>state,action)(Form.create()(Search));
