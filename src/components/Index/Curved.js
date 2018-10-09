import React from "react";
import { Card } from 'antd'
import { Chart, Geom, Axis,Tooltip,Legend} from "bizcharts";
import DataSet from "@antv/data-set";


class Curved extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      data:props.data,
    }
  };


  render() {
   const  onTooltipChange = (event) => {
    const { items } = event
    items.forEach((item) => {
      if (item.name === 'say') {
        item.name = '说说'
      } else if (item.name === 'collect') {
        item.name = '收藏'
      } else {
        item.name = '文章'
      }
    })
  }
    const   itemFormatter = (text) => {
      if (text === 'say') {
        return '说说'
      } else if (text === 'collect') {
        return '收藏'
      } else {
        return '文章'
      }
    }
    const data = this.state.data
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["article", "say","collect"],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <Card className="card-chart" hoverable={true} bordered={false}>
        <Chart height={400} data={dv} scale={cols} forceFit onTooltipChange={onTooltipChange} >
        <p className="title">博客各月份更新数据统计</p>
          <Legend itemFormatter={itemFormatter}    />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => val
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </Card>
    );
  }
}
export default Curved;
