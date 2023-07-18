/* eslint-disable react/no-array-index-key */
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes as Routers, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as RouterPath from './RouterPath'
import Routes from './Routes'
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
// import AppAction from '../redux/app/action'
import LoginAction from '../redux/login/action'
// import { Navigator } from "../Navigator";

// import { Switch } from '@mui/material'
function MainRouter() {
  
  const dispatch = useDispatch()

  const token = Cookies.get('token')

  useEffect(() => {
    dispatch({
      type: LoginAction.GET_USER_DETAIL,
    })
}, [token])
  return (
    <Router>
      <ToastContainer />
      <Routers>
        {Routes.map((route, index) => {
          return (
            <Route key={route.id} path={route.path} element={route.component} />
          )
        })}
      </Routers>
    </Router>
  )
}
export default MainRouter
