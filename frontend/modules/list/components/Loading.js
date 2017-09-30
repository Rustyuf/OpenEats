"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import Spinner from 'react-spinkit';

const Error = ({message}) => {
  return (
    <div className="spinner">
      <h3 className="no-results">{ message }</h3>
      <Spinner className="spinner-obj" spinnerName="circle" noFadeIn />
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default injectIntl(Error)
