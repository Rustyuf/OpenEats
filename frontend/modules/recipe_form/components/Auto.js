import React from 'react'
import Autocomplete from 'react-autocomplete';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

class Auto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      val: this.props.value || '',
      data: this.props.data || [],
      allowFilter: this.props.allowFilter !== false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({data: nextProps.data});
    }
  }

  handleChange = event => {
    this.setState({val: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  };

  handleSelect = value => {
    this.setState({val: value});
    if(this.props.change) {
      this.props.change(this.props.name, value);
    }
  };

  matchStateToTerm = (state, value) => {
    if (this.state.allowFilter) {
      return (
          state.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else {
      return true;
    }
  };

  sortStates = (a, b, value) => {
    return (
      a.toLowerCase().indexOf(value.toLowerCase()) >
      b.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    )
  };

  renderItems = items => {
    return items.map((item) => {
      return item
    })
  };

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      loading: {
        id: 'autocomplete.loading',
        description: 'Loading message',
        defaultMessage: 'Loading...',
      },
      no_matches: {
        id: 'autocomplete.no_matches',
        description: 'No matches found message',
        defaultMessage: 'No matches for {value}'
      }
    });

    return (
      <div className={this.props.size} key={this.props.id}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <Autocomplete
          wrapperProps={{className: "form-group autocomplete", }}
          wrapperStyle={{}}
          value={this.state.val}
          inputProps={{name: this.props.name, className: "form-control", placeholder: this.props.placeholder}}
          items={this.state.data}
          getItemValue={(item) => item}
          shouldItemRender={this.matchStateToTerm}
          sortItems={this.sortStates}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          renderItem={(item, isHighlighted) => (
            <div
              className={isHighlighted ? 'item highlightedItem' : 'item'}
              key={item}
            >{item}</div>
          )}
          renderMenu={(items, value) => (
            <div className="menu">
                { this.state.loading ? (
                  <div className="item">{ formatMessage(messages.loading) }</div>
                ) : items.length === 0 ? (
                  <div className="item">{ formatMessage(messages.no_matches, {value: value}) }</div>
                ) : this.renderItems(items)}
              </div>
          )}
        />
      </div>
    )
  }
}

export default injectIntl(Auto)
