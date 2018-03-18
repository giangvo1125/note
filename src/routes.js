import React from 'react'
import { Route, IndexRoute, Link, Redirect } from 'react-router'

//COMPONENT
import IndexComponent from './components/index'
import ContentComponent from './components/content'

//END COMPONENT

//HOC
import RequireAuth from './hoc/requireAuth'
//END HOC

const routes = (
  <Route path="/" component={IndexComponent}>
    <IndexRoute component={ContentComponent} />
  </Route>
)

export default routes