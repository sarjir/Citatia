import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SingleCitation from 'single-citation';

class App extends Component {
  render() {
    return (
      <div>
        <SingleCitation />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
