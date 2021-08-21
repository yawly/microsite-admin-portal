import React from "react";
import { Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";

import messages from "../i18n/Translations.jsx";

import NoMatchPage from "../pages/nomatch/NoMatchPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

const { LOCALE_DEFAULT } = APP_ENV || 'en';

const RouteContent = ({ locale, children, ...props }) => {
  
  return (
    <IntlProvider locale={locale || LOCALE_DEFAULT || 'en'}
                  defaultLocale={LOCALE_DEFAULT || 'en'}
                  messages={messages[locale || LOCALE_DEFAULT || 'en']}>
      <Switch { ...props }>
        <Route exact path='/' component={ DashboardPage } />

        { 
          React.Children.map(children, (child) => {
            return React.isValidElement(child)
              ? React.cloneElement(child, {
                  ...child.props,
                  path: '/' + (locale || '') + child.props.path
                })
              : child;
          })
        }

      </Switch>
    </IntlProvider>
  );
}

export default RouteContent
