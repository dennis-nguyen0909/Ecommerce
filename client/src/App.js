import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage/HomePage";
import { routes } from "./routes";
import { Header } from "./component/Header/Header";
import { Default } from "./component/Default/Default";
function App() {

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
