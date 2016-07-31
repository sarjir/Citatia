import React, { PropTypes, Component } from 'react';

class SingleCitation extends Component {
  static propTypes = {
    citation: PropTypes.string
  }

  static className = 'singleCitation-singleCitation';

  getClassName = () => {
    return SingleCitation.className;
  };

  render() {
    return (
      <div
        className={ this.getClassName() }
      >
        <h1>Single Citation</h1>
        <p>Description</p>
      </div>
    );
  }
}

export default SingleCitation;
