import {
  Avatar,
  Card,
  Col,
  Icon,
  Progress,
  Row,
  Timeline,
  Collapse
} from 'antd'
import React from 'react'
import CountUp from 'react-countup'
import Bar from './Bar'
import Curved from './Curved'
import LastArticle from './LastArticle'
import {connect} from 'react-redux'
import action from '../../store/actions/info'
import LastSay from './LastSay'
import './style.less'

const Panel = Collapse.Panel;
const classify = ["社会", "爱情", "友情"];
const text = ["只有人们的社会实践，才是人们对于外界认识的真理性的标准。真理的标准只能是社会的实践。", "这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。", "友谊是灵魂的结合，这个结合是可以离异的，这是两个敏感，正直的人之间心照不宣的契约。"];
const author = [" —— 毛泽东", " —— 歌德", " —— 伏尔泰"];

class Index extends React.Component {
  componentDidMount() {
    //this.isLogin()
  }
  isLogin = () => {
    const token = localStorage.getItem('token')

    if (token && token !== 'undefined') {
      this.props.history.push('/admin')
    } else {
      this.props.history.push('/admin/login')
    }
  }
  componentWillMount() {
    this.props.RequestInfo()
  }

  Panel() {
    let panel = text.map(function (item, index) {
      return (
        <Panel header={classify[index]} key={index}>
          <div>{item}</div>
          <p className="author">{author[index]}</p>
        </Panel>
      )
    });
    return panel;
  }

  render() {
    const {
        //   accessData,
        ArticleNum,
        //   collectNumber,   data = [],
        lastArticle,
        //   lastCollect,
        lastSay,
        sayNumber,
        totalAccess
      } = this.props.info

      let data = [
          {
            article: 3,
            collect: 1,
            month: "1月",
            say: 3
          }, {
            article: 2,
            collect: 5,
            month: "2月",
            say: 2
          }, {
            article: 2,
            collect: 3,
            month: "3月",
            say: 2
          }, {
            article: 3,
            collect: 2,
            month: "4月",
            say: 3
          }, {
            article: 8,
            collect: 4,
            month: "5月",
            say: 3
          }, {
            article: 1,
            collect: 2,
            month: "6月",
            say: 5
          }, {
            article: 5,
            collect: 10,
            month: "7月",
            say: 6
          }, {
            article: 6,
            collect: 4,
            month: "8月",
            say: 6
          }, {
            article: 5,
            collect: 5,
            month: "9月",
            say: 2
          }, {
            article: 4,
            collect: 5,
            month: "10月",
            say: 9
          }, {
            article: 7,
            collect: 4,
            month: "11月",
            say: 5
          }, {
            article: 9,
            collect: 5,
            month: "12月",
            say: 8
          }
        ],
        accessData = [
          {
            month: "1月",
            value: 526
          }, {
            month: "2月",
            value: 125
          }, {
            month: "3月",
            value: 521
          }, {
            month: "4月",
            value: 236
          }, {
            month: "5月",
            value: 358
          }, {
            month: "6月",
            value: 799
          }, {
            month: "7月",
            value: 287
          }, {
            month: "8月",
            value: 1924
          }, {
            month: "9月",
            value: 1747
          }, {
            month: "10月",
            value: 338
          }, {
            month: "11月",
            value: 854
          }, {
            month: "12月",
            value: 111
          }
        ];

      const list = [
        {
          color: '#70ec9a',
          icon: 'team',
          title: '访问人次',
          value: totalAccess
        }, {
          color: '#8fc9fb',
          icon: 'file',
          title: '文章数量',
          value: ArticleNum
        }, {
          color: '#ff0d01b8',
          icon: 'heart-o',
          title: '收藏条数',
          value: 23
        }, {
          color: '#f69899',
          icon: 'message',
          title: '说说条数',
          value: sayNumber
        }
      ]

      return (
        <div className="index-page">
          <Row gutter={16}>
            {list.map((item, index) => (
              <Col
                key={index}
                xs={24}
                sm={{
                span: 12
              }}
                md={{
                span: 12
              }}
                xl={{
                span: 6
              }}
                xxl={{
                span: 6
              }}>
                <Card className="card" bordered={false} hoverable={true}>
                  <div className="card-item">
                    <Icon
                      type={item.icon}
                      style={{
                      color: item.color
                    }}
                      className="icon" />
                    <div className="card-right">
                      <p className="title">{item.title}</p>
                      <CountUp
                        start={0}
                        end={item.value}
                        separator=","
                        duration={3}
                        style={{
                        fontSize: 25
                      }} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={16}>
            <Col
              xs={24}
              sm={{
              span: 12
            }}
              md={{
              span: 12
            }}
              xl={{
              span: 8
            }}
              xxl={{
              span: 8
            }}>
              <Card className="card" bordered={false} hoverable={true}>
                <div>
                  <h3>项目进度</h3>
                  <div>React-bolg</div>
                </div>
                <div className='pro'>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div>ACQ1</div>
                      <Progress type="dashboard" percent={25} width={125} id='pro1' />
                    </Col>
                    <Col span={12}>
                      <div>SmartPress</div>
                      <Progress type="dashboard" percent={50} width={125} id='pro2' />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div>BUILD6</div>
                      <Progress type="dashboard" percent={75} width={125} id='pro3' />
                    </Col>
                    <Col span={12}>
                      <div>MSPA</div>
                      <Progress type="dashboard" percent={100} width={125} format={() => 'Done'} id='pro4' />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col >
            <Col
              xs={24}
              sm={{
              span: 12
            }}
              md={{
              span: 12
            }}
              xl={{
              span: 8
            }}
              xxl={{
              span: 8
            }}>
              <Card className="card" bordered={false} hoverable={true}>
                <div>
                  <h3>项目流程</h3>
                </div>
                <div className="timeline">
                  <Timeline>
                    <Timeline.Item color="green">
                      <div className="timeItem">创建项目 - 2018-09-01</div>
                      <div className="timeItem">搭建UI框架 - 2018-09-02</div>
                      <div className="timeItem">对接协议 - 2018-09-04</div>
                      <div className="timeItem">实现功能 - 2018-09-05</div>
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      <div className="timeItem">通信调试 - 2018-09-10</div>
                      <div className="timeItem">功能测试 - 2018-09-11</div>
                      <div className="timeItem">错误调试 - 2018-09-13</div>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <div className="timeItem">界面优化 - 2018-09-15</div>
                      <div className="timeItem">性能优化 - 2018-09-17</div>
                      <div className="timeItem">发布版本 - 2018-09-20</div>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </Card>
            </Col>

            <Col md={8}>
              <Card
                className="card" bordered={false} hoverable={true}>
                <div>
                  <h3>人生感悟</h3>
                </div>
                <div className="collapse">
                  <Collapse accordion defaultActiveKey={"0"}>
                    {this.Panel()}
                  </Collapse>
                </div>
              </Card>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col
              xs={24}
              sm={{
              span: 24
            }}
              md={{
              span: 24
            }}
              xl={{
              span: 12
            }}
              xxl={{
              span: 12
            }}>
              <Curved data={data} />
            </Col>
            <Col
              xs={24}
              sm={{
              span: 24
            }}
              md={{
              span: 24
            }}
              xl={{
              span: 12
            }}
              xxl={{
              span: 12
            }}>
              <Bar className="card-acc" accessData={accessData} />
            </Col>
          </Row>

          <Row gutter={16} className="last">
            <Col
              xs={24}
              sm={{
              span: 24
            }}
              md={{
              span: 12
            }}
              xl={{
              span: 12
            }}
              xxl={{
              span: 12
            }}>
              <LastArticle lastArticle={lastArticle} />
            </Col>
            <Col
              xs={24}
              sm={{
              span: 24
            }}
              md={{
              span: 12
            }}
              xl={{
              span: 12
            }}
              xxl={{
              span: 12
            }}>
              <LastSay lastSay={lastSay} />
            </Col>
          </Row>
        </div>
      )
    }
  }
  export default connect(state => state, action)(Index);