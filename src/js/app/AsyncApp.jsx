import React from "react";

import { Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import LocaleSwitch from './router/LocaleSwitch.jsx';

import DashboardPage from "./pages/dashboard/DashboardPage.jsx";

export default () => {

  const locale = 'en';

  return (
  <div id="App">
    <CookiesProvider>
      <LocaleSwitch locale={ locale }>
        <Route exact path="/" component={ DashboardPage } />
        <Route exact path="/dashboard" component={ DashboardPage } />
      </LocaleSwitch>
    </CookiesProvider>
  </div>)
};
