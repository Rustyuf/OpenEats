import React from 'react'
import PropTypes from 'prop-types'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

import { Input } from '../../common/form/FormComponents'

const RecipeHeader = ({ cookTime, prepTime, servings, info, updateServings, intl }) => {
  const messages = defineMessages({
    servings: {
      id: 'recipe.servings',
      description: 'Servings',
      defaultMessage: 'Servings',
    },
    prep_time: {
      id: 'recipe.prep_time',
      description: 'Preparation time',
      defaultMessage: 'Prep time',
    },
    cooking_time: {
      id: 'recipe.cooking_time',
      description: 'Cooking time',
      defaultMessage: 'Cooking time',
    },
    minutes: {
      id: 'recipe.minutes',
      description: 'minutes',
      defaultMessage: 'minutes'
    },
  });

  return (
    <div className="panel panel-default">
      <table className="table table-bordered">
        <thead>
          <tr className="active">
            <th>{ intl.formatMessage(messages.servings) }</th>
            <th>{ intl.formatMessage(messages.prep_time) }</th>
            <th>{ intl.formatMessage(messages.cooking_time) }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input
                name="servings"
                type="number"
                size="servings-textbox print-hidden"
                change={ updateServings }
                value={ servings } />
              <p className="print-only">{ servings }</p>
            </td>
            <td>{ prepTime } { intl.formatMessage(messages.minutes) }</td>
            <td>{ cookTime } { intl.formatMessage(messages.minutes) }</td>
          </tr>
        </tbody>
      </table>
      <div className="panel-body">
        <p>{ info }</p>
      </div>
    </div>
  );
};

RecipeHeader.PropTypes = {
  cookTime: PropTypes.number.isRequired,
  prepTime: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired,
  updateServings: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecipeHeader);
