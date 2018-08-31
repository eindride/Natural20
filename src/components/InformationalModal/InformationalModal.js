import React from 'react';
import PropTypes from 'prop-types';

import './_informationalModal.scss';

const Title = ({ content }) => (
  <h2 className="imodal__title">{content}</h2>
);

const Subtitle = ({ content }) => (
  <h3 className="imodal__subtitle">{content}</h3>
);

const Paragraph = ({ content }) => (
  <p className="imodal__p">{content}</p>
);

const List = ({ content }) => (
  <ul className="imodal__ul">
    {content.map(el => (
      <li className="imodal__li">
        <span className="imodal__li-title">{el.title}</span>
        {el.content}
      </li>
    ))}
  </ul>
);

class InformationalModal extends React.Component {
  mapContent = el => {
    const { type, content } = el;

    switch (type) {
      case 'title':
        return <Title content={content} />;
      case 'subtitle':
        return <Subtitle content={content} />;
      case 'paragraph':
        return <Paragraph content={content} />;
      case 'list':
        return <List content={content} />;
      default:
        return null;
    }
  };

  render() {
    const { isOpen, toggleFunc, content } = this.props;
    return (
      <div className={`imodal__overlay ${!isOpen ? ' imodal__hidden' : ''}`}>
        <div className="imodal__container">
          <button className="imodal__close-button" onClick={toggleFunc}>x</button>
          {content && content.map(this.mapContent)}
          <hr className="imodal__separator" />
        </div>
      </div>
    );
  }
}

InformationalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
  content: PropTypes.shape().isRequired,
};

Title.propTypes = {
  content: PropTypes.shape().isRequired,
};
Subtitle.propTypes = {
  content: PropTypes.shape().isRequired,
};
Paragraph.propTypes = {
  content: PropTypes.shape().isRequired,
};
List.propTypes = {
  content: PropTypes.shape().isRequired,
};
export default InformationalModal;
