import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { adminRouter, clientRouter } from "./configs/router.config";
import GuardLogin from "./HOC/GuardLogin";
import GuardAdmin from "./HOC/GuardAdmin";
import TemplateCient from "./templates/client/TemplateCient";
import TemplateAdmin from "./templates/admin/TemplateAdmin";

function App() {
  const renderRouterClientList = () => {
    return clientRouter.map((router, index) => {
      const { Component, path, exact, checkLogin } = router;
      if (checkLogin) {
        return (
          <Route path={path} exact={exact} key={index}>
            <GuardLogin>
              <TemplateCient Component={Component} />
            </GuardLogin>
          </Route>
        );
      }

      return (
        <Route path={path} exact={exact} key={index}>
          <TemplateCient Component={Component} />
        </Route>
      );
    });
  };

  const renderRouterAdminList = () => {
    return adminRouter.map((router, index) => {
      const { Component, path, exact } = router;
      return (
        <Route path={path} exact={exact} key={index}>
          <GuardAdmin>
            <TemplateAdmin Component={Component} />
          </GuardAdmin>
        </Route>
      );
    });
  };

  return (
    <BrowserRouter>
      <Switch>
        {renderRouterClientList()}
        {renderRouterAdminList()}
        <Route path="">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
