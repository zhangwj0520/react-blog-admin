import { Card } from 'antd'
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts'
import * as React from 'react'

const Bar = ({ accessData = [] }) => {
  return (
    <div className="card-chart card-acc">
      <Card hoverable={true} bordered={false}>
        <p className="title">博客各月份访问人数统计</p>
        <Chart
          height={350}
          data={accessData}
          forceFit={true}
          style={{ maxWidth: 750, paddingBottom:50}}>
          <Axis name="month" />
          <Axis name="value" />
          <Tooltip />
          <Legend />
          <Geom type="interval" position="month*value" color="month" />
        </Chart>
      </Card>
    </div>
  )
}

export default Bar