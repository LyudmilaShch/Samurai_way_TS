import ReactDOM from "react-dom";
import SamuraiJsApp from "./App";
import React from 'react';

test('rendering without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJsApp />, div);
    ReactDOM.unmountComponentAtNode(div)
})

