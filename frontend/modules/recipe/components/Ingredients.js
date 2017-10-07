import React from 'react'
import PropTypes from 'prop-types'

const Ingredients = ({ data }) => {
  let ingredients = data.map(function(ingredient) {
    return (
      <li className="ingredient" key={ ingredient.id }>
        { (ingredient.quantity !== 0)
            ? <span className="quantity">{ ingredient.quantity } </span>
            : null
        }
        { (ingredient.measurement)
            ? <span className="measurement">{ ingredient.measurement } </span>
            : null
        }
        { (ingredient.title)
            ? <span className="title">{ ingredient.title }</span>
            : null
        }
      </li>
    );
  });

  return (
    <ul className="ingredients" >
      { ingredients }
    </ul>
  );
};

Ingredients.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default Ingredients;
