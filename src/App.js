import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Favorites from "./components/Favorites/Favorites";
import Header from "./components/Header/Header";

import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./App.css";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
