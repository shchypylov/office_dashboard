import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import {Router} from 'react-router-dom';
import "./styles/normalize.css"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import reducers from "./reducers"
import history from "./history"


const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware()
);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.getElementById('root')
);

