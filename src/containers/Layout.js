import React, { useContext, Suspense, useEffect, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  let history = useHistory();

  const checkIsLogin = async () => {
    const admin = await sessionStorage.getItem("hajj-data-admin");
    if (!admin) {
      history.push("/");
    }
  };

  useEffect(() => {
    closeSidebar();
    checkIsLogin();
  }, [location]);

  return (
    <div
      className={`flex bg-gray-50 overflow-auto dark:bg-gray-900 `}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/add-data" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
