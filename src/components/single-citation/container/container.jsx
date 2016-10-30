import { connect } from 'react-redux';
import SingleCitation from '../single-citation';

const mapStateToProps = ({ citations }, { id }) => {
  const {
    citation,
    author,
    date,
    image,
    actions
  } = citations.find(citation => citation.id === id);

  return {
    citation,
    author,
    date,
    image,
    actions
  };
};

export default connect(mapStateToProps)(SingleCitation);
