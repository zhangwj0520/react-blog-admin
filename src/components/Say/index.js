import {Modal, Pagination, Timeline, message} from 'antd'
import {connect} from 'react-redux'
import action from '../../store/actions/say'
import React from 'react'
import './style.less'
const Item = Timeline.Item
const confirm = Modal.confirm

class Say extends React.Component {
  componentDidMount() {
    this.props.RequestSAY({ pageIndex: 1, pageSize: 5 })
  }
  deleteSay = (id) => {
    confirm({
      onOk: () => {
        if (localStorage.getItem('identity') === '"manager"') {
          this.props.DeleteSAY(id)
        } else {
          message.warning('游客无权删除说说')
        }
      },
      title: '确定删除这条说说?'
    })
  }
  onChange = (pageIndex, pageSize) => {
    this.props.RequestSAY({pageIndex, pageSize})
  }
  onShowSizeChange = (pageIndex, pageSize) => {
    //console.log(pageIndex, pageSize);
    this.props.RequestSAY({pageIndex, pageSize})
  }
  render() {
    //console.log(this.props);
    let { say, payload } = this.props.say
    let {pageIndex, pageSize } = payload
    let newSay = say.reverse();
    const total=this.props.info.sayNumber
    return (
      <div className="time-line-wrp">
        <Timeline className="time-line">
          {newSay && newSay.map(item => (
            <Item key={item._id}>
              <div className="item" onClick={() => this.deleteSay(item._id)}>
                <div dangerouslySetInnerHTML={{
                  __html: item.say
                }} />
                <span className="posted">
                  发表于：{new Date(item.create_at).toLocaleString()}
                </span>
              </div>
            </Item>
          ))}
        </Timeline>
        <div className="pagination">
          <Pagination
            pageSizeOptions={['5','10','15','20']}          
            current={Number(pageIndex)}
            pageSize={Number(pageSize)}
            total={total}
            showSizeChanger={true}
            onChange={this.onChange}
            onShowSizeChange={this.onShowSizeChange} />
        </div>
      </div>
    )
  }
}

export default connect(state => state, action)(Say);