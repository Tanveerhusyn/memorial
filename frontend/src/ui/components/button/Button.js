import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import the CSS file for the component
import { ThreeDots } from 'react-loader-spinner';

const Button = ({ onClick, icon, text, showDropdown,bgColor,isLoading,disabled }) => {
  return (
    <button disabled={disabled} style={{background:`${disabled?"#9e9e94":bgColor?bgColor:'#5c5470'}`, display:`${disabled?"none":"flex"}`}} onClick={onClick} className="button">
     {
      !isLoading && (
        <>
          {icon && <span className="icon">{icon}</span>}
      <span className="text">{text}</span>
      {showDropdown && <span className="dropdown">
      <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 1.38L6 5.38L1.5 1.38"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
        </span>}
        </>
      ) || 
      <ThreeDots
      height="30"
      width="50"
      radius="9"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
     }
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool
};

export default Button;
