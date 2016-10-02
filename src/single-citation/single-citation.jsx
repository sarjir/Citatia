import React, { PropTypes, Component } from 'react';
import styles from './styles/single-citation.less';

class SingleCitation extends Component {
  static propTypes = {
    citation: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
  };

  static defaultProps = {
    citation: 'Jag suger, men du sväljer',
    author: 'Sara Jirholm',
    date: '2016-09-12',
    image: '/home/sara/Documents/Development/citatApp/src/images/H6YPV8J8TU.jpg',
  };

  static className = 'singleCitation-singleCitation';

  getClassName = () => {
    return SingleCitation.className;
  };

  render() {
    return (
      <div
        className={ styles.background }
      >
        <div
          className={ styles.wrapper }
        >
          <img
            className={ styles.userImage }
            src='/Users/Sara/Documents/Webbutveckling/Citatia/src/images/user.jpg'
          />
          <div
            className={ styles.citation }
          >
            <h1>
              "{ this.props.citation }"
            </h1>
            <div
              className={ styles.description }
            >
              <span>{ this.props.author }</span>
              <span>{ this.props.date }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCitation;
