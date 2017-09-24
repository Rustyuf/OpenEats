import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './common/reducer'
import thunkMiddleware from 'redux-thunk'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Load default locale data;
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
addLocaleData([...en, ...es, ...de]);

const messages = require('../locale/'+process.env.LOCALE+'.json');

import App from './base/components/App'
import Footer from './base/components/Footer'
import NotFound from './base/components/404'
import Login from './account/components/Login'
import News from './news/components/News'
import {default as list} from './list/containers/App'
import Browse from './browse/components/Browse'
import { RecipeForm } from './recipe_form/components/RecipeForm'
import { ImportForm } from './recipe_form/components/ImportForm'
import Recipe from './recipe/components/Recipe'
import AuthStore from './account/stores/AuthStore'
import { browserSupportsAllFeatures, loadPolyFills } from './common/polyfill'

// Load in the base CSS
require("../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");
require("./base/css/core.css");
require("./base/css/print.css");

const requireAuth = (nextState, replace) => {
  if (!AuthStore.isAuthenticated()) {
    replace('/browse');
  }
};

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: News },
    childRoutes: [
      { path: 'news', component: News },
      { path: 'login', component: Login },
      { path: 'browse', component: Browse },
      { path: 'list', component: list, onEnter: requireAuth ,
        childRoutes: [
          { path: ':listId', component: list, onEnter: requireAuth },
        ]
      },
      { path: 'recipe',
        childRoutes: [
          { path: 'create', component: RecipeForm, onEnter: requireAuth },
          { path: 'import', component: ImportForm, onEnter: requireAuth },
          { path: 'edit/:id', component: RecipeForm, onEnter: requireAuth },
          { path: ':recipe', component: Recipe }
        ]
      },
      { path: '*', component: NotFound }
    ]
  }
];

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

const main = (
    <IntlProvider locale={ process.env.LOCALE } messages={ messages }>
  <Provider store={store}>
      <div>
        <div id="content">
          <Router
            history={ browserHistory }
            routes={ routeConfig }
          />
        </div>
        <Footer />
      </div>
  </Provider>
    </IntlProvider>
);

const entryPoint = () => {
  render(main, document.getElementById('app'))
};

if (browserSupportsAllFeatures()) {
  // Browsers that support all features run `entryPoint()` immediately.
  entryPoint();
} else {
  // All other browsers loads polyfills and then run `entryPoint()`.
  loadPolyFills(entryPoint);
}
