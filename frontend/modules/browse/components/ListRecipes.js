import React from 'react'
import { Link } from 'react-router'

import Ratings from '../../recipe/components/Ratings';

require("./../css/list-recipes.scss");

export default React.createClass({
  render: function() {
    var format = this.props.format;
    var recipes = this.props.data.map((recipe) => {
      var link = '/recipe/' + recipe.id;
      return (
        <div className={ format } key={ recipe.id }>
          <div className="thumbnail recipe">
            <img src={ this.getRecipeImage(recipe) } alt="Recipe Image"/>
            <div className="caption">
              <h4><Link to={ link }>{ recipe.title }</Link></h4>
              <p className="desc">{ recipe.info }</p>
            </div>
            <div className="ratings">
              <p className="pull-right date">{ recipe.pub_date }</p>
              <Ratings stars={ recipe.rating }/>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="recipes">
        { recipes }
      </div>
    );
  },

  getRecipeImage: function(recipe) {
    if (recipe.photo_thumbnail) {
      return recipe.photo_thumbnail;
    } else {
      return '/images/default_recipe_image.png';
    }
  }
});
