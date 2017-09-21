import React from 'react'

import NavBar from '../../header/containers/NavBar'

export default React.createClass({
  render: function() {
    return (
      <div className="react">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});
