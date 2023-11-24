import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./routes";
import { Default } from "./component/Default/Default";

import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import { isJsonString } from "./untils";
import * as UserService from './services/UserService'
import axios from "axios";
function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const { decoded, storage } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storage)
    }

  }, [])
  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserService.getDetailUser(id, access_token); // lấy thông tin user từ token và id
    dispatch(updateUser({ ...res?.response.data, access_token: access_token }))
    // truyền data mà res trả về vào redux
    // thì bên userSlide sẽ nhận được state và action trong đó action.payload là data user
  }
  const handleDecoded = () => {
    let storage = localStorage.getItem('access_token');
    let decoded = {}
    if (storage && isJsonString(storage)) {
      storage = JSON.parse(storage)
      decoded = jwtDecode(storage) // jwt sẽ giải mã token và trả về payload gồm dữ liệu đã giải

    }
    return { storage, decoded }
  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded, storage } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      // nếu time token bé hơn time hiện tại / 1000 lấy ra milisecond giây
      const data = await UserService.refreshToken();
      console.log(data, "data")
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  })
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((item) => {
            const Page = item.page
            const Layout = item.isShowHeader ? Default : Fragment
            return (
              <Route key={item.path} path={item.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
