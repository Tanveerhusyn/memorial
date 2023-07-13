import React from 'react';
import './Card.css';

const Card = ({ children,Width }) => {
  const styleObj = {
    width: Width
  }
  return (
    <div style={styleObj} className="card">
      {children}
    </div>
  );
};


const CardHeader = ({ children, textAlign }) => {
  const headerStyle = {
    justifyContent: getTextAlignment(textAlign)
  };

  return <div className="card-header" style={headerStyle}>{children}</div>;
};

const CardContent = ({ children, textAlign }) => {
  const contentStyle = {
    justifyContent: getTextAlignment(textAlign)
  };

  return <div className="card-content" style={contentStyle}>{children}</div>;
};

const CardAction = ({ children, textAlign }) => {
  const actionStyle = {
    justifyContent: getTextAlignment(textAlign)
  };

  return <div className="card-action" style={actionStyle}>{children}</div>;
};

const getTextAlignment = (textAlign) => {
  switch (textAlign) {
    case 'center':
      return 'center';
    case 'right':
      return 'flex-end';
    default:
      return 'flex-start';
  }
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Action = CardAction;

export default Card;
