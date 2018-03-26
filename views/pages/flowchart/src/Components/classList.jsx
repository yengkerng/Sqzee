require('../index.scss');
import SearchInput, {createFilter} from 'react-search-input'

var React = require('react');
var mainPage = require('../index.jsx');


const FILTERS = ['name'];

var ClassList = React.createClass({

  getInitialState: function() {
    return { searchTerm: '' }
  },

  HiItems: function(items) {
   //console.log(items)
  },

  render: function() {
    //console.log(this.props.list);

    var newArray = []
    for(var x = 0; x < this.props.list.length; x++) {
      newArray.push({id: x, name: this.props.list[x]});
    }

    const filtered = newArray.filter(createFilter(this.state.searchTerm, FILTERS));
    //console.log("hello youtube!!" + this.props.nameArray);
    for (var x in filtered) {
      for (var y in this.props.nameArray) {
          if (filtered[x].name == this.props.nameArray[y].name) {
            filtered.splice(x, 1);
          }
      }
    }
     var createElement = this.props.createElement;
      return (
         <ul className="classList">
         <SearchInput className="search-input" onChange={this.searchUpdated} />
         <br></br>
            {filtered.map(listValue => {
               return (
                 <div className='key' key={listValue.id}>
              <div className='classname' onClick={() => createElement(listValue.name)}>{listValue.name}</div>
              </div>
               )
             })}
         </ul>

      );
    },

    searchUpdated (term) {
       this.setState({searchTerm: term})
    }

});

// ReactDOM.render goes here:
module.exports = ClassList;
