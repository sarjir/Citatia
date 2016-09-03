import React, { PropTypes, Component } from 'react';
import styles from './styles/single-citation.less'

class SingleCitation extends Component {
  static propTypes = {
    citation: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string
  }

  static defaultProps = {
    citation: "Jag suger, men du sväljer",
    author: "Sara Jirholm",
    date: "2016-09-12",
    image: "/home/sara/Documents/Development/citatApp/src/images/H6YPV8J8TU.jpg"
  }

  static className = 'singleCitation-singleCitation';

  getClassName = () => {
    return SingleCitation.className;
  };

  render() {
    return (
      <div
        className={ styles.wrapper }
        style={ {backgroundImage: this.props.image} }
      >
        <h1>
          "{ this.props.citation }"
        </h1>
        <div
          className={ styles.description }
        >
          <p>{ this.props.author }, { this.props.date }</p>
        </div>
      </div>
    );
  }
}

export default SingleCitation;
