import * as React from "react"
import {render} from "react-dom"
import {createStore, Store} from "redux"
import {Provider} from "react-redux"

import App from "./App"
import reducer from "./store/reducer"

const store: Store<AppState, AppAction> & {
    dispatch: DispatchType
} = createStore(reducer);

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);