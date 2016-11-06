import React, { PropTypes, Component } from 'react';
import styles from './styles/single-citation.less';
import twemoji from 'twemoji';

class SingleCitation extends Component {
  static propTypes = {
    citation: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.string,
        reactors: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string
          })
        )
      }),
    ),
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
          onTouchTap={ this.handleOnTouchTap }
        >
          <span
            className={ styles.actionCount }
          >
            { `${action.reactors.length}` }
          </span>
          <div
            className={ styles.actionSymbol }
            key={ i }
            dangerouslySetInnerHTML={ {
              __html: `${twemoji.parse(action.action)}`
            } }
          >
          </div>
        </div>
      );
    });

    return actions;
  }

  handleOnTouchTap = (e) => {
    console.log(e);
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
              <span>{'“'}</span>
                {`${ this.props.citation }`}
              <span>{'​‌”'}</span>
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
