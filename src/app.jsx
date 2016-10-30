import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from 'redux/store';
import { Provider } from 'react-redux';

import SingleCitation from 'components/single-citation';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div>
        <SingleCitation id='1' />
      </div>
    );
  }
}

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.querySelector('#app'));
