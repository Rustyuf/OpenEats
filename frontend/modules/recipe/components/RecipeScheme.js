import React from 'react'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

import IngredientGroups from './IngredientGroups'
import SubRecipes from './SubRecipes'
import Directions from './Directions'
import RecipeHeader from './RecipeHeader'
import RecipeFooter from './RecipeFooter'
import InfoPanel from './InfoPanel'

require("./../css/recipe.scss");

class RecipeScheme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data.id !== nextProps.data.id) {
      return true;
    } else if (this.state.data.servings !== nextState.data.servings) {
      return true;
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  updateServings = (key, value) => {
    if (key === 'servings') {
      if (value > 0) {
        let data = this.state.data;

        let multiplier = value / this.state.data.servings;

        data.ingredient_groups.map((ingredient_group) => {
          ingredient_group.ingredients.map((ingredient) => {
            if (ingredient) {
              ingredient.quantity = this.round(ingredient.quantity * multiplier);
            }
            return ingredient
          });
        }, this);

        data.subrecipes.map((ingredient) => {
          if (ingredient) {
            ingredient.quantity = this.round(ingredient.quantity * multiplier);
          }
        }, this);

        this.setState({
          data: { ...data, servings: value }
        })
      }
    }
  };

  round = (number) => {
    let factor = Math.pow(10, 3);
    return Math.round(number * factor) / factor;
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      ingredients: {
        id: 'recipe.ingredients',
        description: 'Ingredients',
        defaultMessage: 'Ingredients',
      },
      directions: {
        id: 'recipe.directions',
        description: 'Directions',
        defaultMessage: 'Directions',
      },
    });

    return (
      <div className="recipe-details">
        <div className="panel panel-success">
          <RecipeHeader
            photo={ this.state.data.photo }
            rating={ this.state.data.rating }
            title={ this.state.data.title }
          />
          <div className="recipe-schema" itemType="http://schema.org/Recipe">
            <div className="row">
              <div className="mobile-image">
                <img className="img-responsive" src={ this.state.data.photo } />
              </div>
              <div className="col-sm-7 col-sm-push-5 col-xs-12">
                <p className="print-only print-image">
                  <img className="img-responsive" src={ this.state.data.photo_thumbnail } />
                </p>
                <InfoPanel
                  cookTime={ this.state.data.cook_time }
                  prepTime={ this.state.data.prep_time }
                  servings={ this.state.data.servings }
                  info={ this.state.data.info }
                  updateServings={ this.updateServings }
                />
              </div>
              <div className="col-sm-5 col-sm-pull-7 col-xs-12">
                <h4>{ formatMessage(messages.ingredients) }</h4>
                <SubRecipes data={ this.state.data.subrecipes }/>
                <IngredientGroups data={ this.state.data.ingredient_groups }/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h4>{ formatMessage(messages.directions) }</h4>
                <Directions data={ this.state.data.directions }/>
              </div>
            </div>
          </div>
          <RecipeFooter
            id={ this.state.data.id }
            source={ this.state.data.source }
            username={ this.state.data.username }
            updateDate={ this.state.data.updateDate }
            showEditLink={ this.props.showEditLink }
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(RecipeScheme);
