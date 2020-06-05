import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return <p className="my-3 p-4 text-center aler alert-primary">{message}</p>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
