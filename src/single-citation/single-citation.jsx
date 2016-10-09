import React, { PropTypes, Component } from 'react';
import styles from './styles/single-citation.less';

class SingleCitation extends Component {
  static propTypes = {
    citation: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.string,
        count: PropTypes.number
      }),
    ),
  };

  static defaultProps = {
    citation: 'Jag suger, men du sväljer',
    author: 'Sara Jirholm',
    date: '2016-09-12',
    image: '/home/sara/Documents/Development/citatApp/src/images/H6YPV8J8TU.jpg',
    actions: [
      {
        action: '\u{1F44D}',
        count: 3
      },
      {
        action: '\u2764',
        count: 34
      },
      {
        action: '\u{1F602}',
        count: 234
      },
    ],
  };

  static className = 'singleCitation-singleCitation';

  getClassName = () => {
    return SingleCitation.className;
  };

  renderActions() {
    const actions = this.props.actions.map((action, i) => {
      return (
        <div
          className={ styles.singleAction }
        >
          <span
            className={ styles.actionCount }
          >
            { `${action.count}` }
          </span>
          <div
            className={ styles.actionSymbol }
            key={ i }
          >
            { `${action.action}` }
          </div>
        </div>
      );
    });

    return actions;
  }

  render() {
    return (
      <div>
        <div
          className={ styles.background }
        />
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
              {`"${ this.props.citation }"`}
            </h1>
            <div
              className={ styles.description }
            >
              <span>{ this.props.author }</span>
              <span>{ this.props.date }</span>
            </div>
            <div
              className={ styles.actions }
            >
              { this.renderActions() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCitation;
