import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.less'
import RouterMap from './router/RouterMap'

ReactDOM.render(<LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <RouterMap />
    </Provider>
  </LocaleProvider>,
document.getElementById('root'));