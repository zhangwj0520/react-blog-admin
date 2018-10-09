import React from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../components/App'

import loading from './loading'
class RouterMap extends React.Component {
  render() {

        const RouterList = [
          {
            component: () => import('../components/Articles'),
            path: '/admin/edit-article'
          },
          {
            component: () => import('../components/Say'),
            path: '/admin/edit-say'
          },
          {
            component: () => import('../components/AddSay'),
            path: '/admin/add-say'
          },
          {
            component: () => import('../components/AddArticle'),
            path: '/admin/add-article'
          },
          {
            component: () => import('../components/Layout/Header/Calendars'),
            path: '/admin/calendars'
          },
          // {
          //   component: () => import('../components/Charts/echart'),
          //   path: '/admin/echarts'
          // },
          {
            component: () => import('../components/Login'),
            path: '/admin/login'
          },
          {
            component: () => import('../components/Index'),
            path: '/admin'
          }        
        ]
      return (<Router>
          <App>
              <Switch>
                {RouterList.map(item => (
                  <Route
                    key={item.path}
                    exact={true}
                    path={item.path}
                    component={Loadable({
                      loader: item.component,
                      loading
                    })}
                  />
            ))}   
              </Switch>
          </App>
        </Router>)
    }
}
export default RouterMap;
 