import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SubRecipes = ({ data }) => {
  let recipeLinks = data.map(function(recipeLink) {
    return (
      <li className="ingredient" key={ recipeLink.child_recipe_id }>
        { (recipeLink.quantity !== 0)
            ? <span className="quantity">{ recipeLink.quantity } </span>
            : null
        }
        { (recipeLink.measurement)
            ? <span className="measurement">{ recipeLink.measurement } </span>
            : null
        }
        { (recipeLink.title)
            ? <Link to={ "/recipe/" + recipeLink.child_recipe_id } className="title">{ recipeLink.title }</Link>
            : null
        }
      </li>
    );
  });

  return (
    <ul className="ingredients" >
      { recipeLinks }
    </ul>
  );
};

SubRecipes.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    child_recipe_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default SubRecipes;
