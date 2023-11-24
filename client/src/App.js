import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./routes";
import { Default } from "./component/Default/Default";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, [])
  // const fetchApi = async () => {
  //   const res = await axios.get(`http://localhost:8080/api/product/get-all-product?page=1&limit=2&filter=name&filter=1`);
  //   return res.data;
  // }
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log("Query : ", query);
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
