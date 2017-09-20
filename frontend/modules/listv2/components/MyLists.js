import React from 'react'
import { Link } from 'react-router'
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl'

let MyLists = ({title, lists}) => {
  const messages = defineMessages({
    no_lists: {
      id: 'my_lists.no_lists',
      description: 'No Lists to display',
      defaultMessage: 'No Lists to display',
    },
    new_list: {
      id: 'my_lists.new_list',
      description: 'Create a New List!',
      defaultMessage: 'Create a New List!',
    },
  });

  if (lists === null || lists.length === 0) {
    return (
      <div className="grocery-lists">
      <ul className="list-group">
        <a href="#" className="list-group-item disabled">
          { title }
        </a>
        <a href="#" className="list-group-item disabled">
          <FormattedMessage {...messages.no_lists}/>
        </a>
      </ul>
    </div>
    );
  }

  let items = lists.map(function(item) {
    let link = '/list/' + item.id;
    return (
      <Link to={ link } className="list-group-item" activeClassName="active" key={ item.id }>
        <span className="badge">{ item.item_count }</span>
        { item.title }
      </Link>
    );
  });

  return (
    <div className="grocery-lists">
      <ul className="list-group">
        <a href="#" className="list-group-item disabled">
          { title }
        </a>
        { items }
        <Link to={ '/list/' } className="list-group-item">
          <FormattedMessage {...messages.new_list}/>
        </Link>
      </ul>
    </div>
  );
};

export default injectIntl(MyLists)
