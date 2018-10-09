import { Icon, Pagination, Timeline } from 'antd'
import QueueAnim from 'rc-queue-anim'
import React from 'react'
import { Link } from 'react-router-dom'
import './style.less'
import { connect } from 'react-redux'
import actions from '../../store/actions/acticles'

class TimeFile extends React.Component {
  constructor() {
    super();
        this.state = {
            pageIndex: 1,
            pageSize: 15,
            timeFile: true
        }
  }
    componentDidMount() {
      this.props.RequestArticles(this.state);
    }
    onChange = (page, pageSize) => {
        this.setState(
        {
            pageIndex: page,
            pageSize
        },
        () => {
          this.props.RequestArticles(this.state);
        }
        )
    }
    timeView = () => {
      const articles = this.props.articles
    const timeItems = []
    const colorArr = ['red', 'blue', 'green']
    articles.forEach((item, index, arr) => {
      const timeStr = item.create_at.substring(
        0,
        item.create_at.lastIndexOf('-')
      )
      if (
        index === 0 ||
        timeStr !==
          arr[index - 1].create_at.substring(
            0,
            arr[index - 1].create_at.lastIndexOf('-')
          )
      ) {
        timeItems.push({
          key: timeStr,
          type: 'time'
        })
        timeItems.push({
          _id: item._id,
          color: colorArr[index % 3],
          title: item.title,
          type: 'item'
        })
      } else {
        timeItems.push({
          _id: item._id,
          color: colorArr[index % 3],
          title: item.title,
          type: 'item'
        })
      }
    })
    return (
      <Timeline>
        {timeItems.map((article, index) => {
          return article.type === 'time' ? (
            <Timeline.Item
              className="item"
              key={article.key}
              color="blue"
              dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
              <QueueAnim
                animConfig={[
                  { opacity: [1, 0], translateX: [0, 150] },
                  { opacity: [1, 0], translateX: [0, -150] }
                ]}
                duration={1500}>
                <div key={index}>
                  <p className="time">{article.key}</p>
                </div>
              </QueueAnim>
            </Timeline.Item>
          ) : (
            <Timeline.Item key={article._id} color={article.color}>
              <QueueAnim
                animConfig={[
                  { opacity: [1, 0], translateX: [0, 150] },
                  { opacity: [1, 0], translateX: [0, -150] }
                ]}
                duration={1500}>
                <div key={article._id}>
                  <Link to={`/article/${article._id}`}>
                    <p className="title">{article.title}</p>
                  </Link>
                </div>
              </QueueAnim>
            </Timeline.Item>
          )
        })}
      </Timeline>
    )
  }

render() {
    const { total } = this.props
    const { pageIndex, pageSize } = this.state
    return (
      <div className="time-file">
        {this.timeView()}
        <div className="Pagination">
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={total}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}
export default connect(state=>state, actions)(TimeFile)  
