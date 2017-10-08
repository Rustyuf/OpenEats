import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AuthStore from '../../account/stores/AuthStore'
import MiniBrowse from '../../browse/components/MiniBrowse'
import RecipeScheme from '../components/RecipeScheme'
import * as RecipeActions from '../actions/RecipeActions'

require("./../css/recipe.scss");

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.getAuthUser()
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
    this.props.recipeActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe != this.props.match.params.recipe) {
      nextProps.recipeActions.load(nextProps.match.params.recipe);
      window.scrollTo(0, 0);
    }
  }

  _onChange = () => {
    this.setState({user: this.getAuthUser()});
  };

  getAuthUser = () => {
    return AuthStore.getUser();
  };

  render() {
    let data = this.props.recipes.find(t => t.id == this.props.match.params.recipe);

    if (data) {
      let showEditLink = (this.state.user !== null && this.state.user.id === data.author);
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <RecipeScheme
                data={ data }
                showEditLink={ showEditLink }
                user={ this.state.user }
              />
            </div>
            <div className="col-md-3">
              <MiniBrowse format="col-md-12 col-sm-6 col-xs-12" qs="?limit=4" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container"/>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  recipeActions: bindActionCreators(RecipeActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
