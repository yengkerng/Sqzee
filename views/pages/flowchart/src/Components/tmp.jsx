require('../index.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var ClassList = require('./classList');
var Class = require('./classObjects');

import Search from 'react-search'

var styles = {
   header: {
      textAlign: "center",
      display: "inline-block",
      marginBottom: 5,
      marginRight: 10
   }
};

var ClassListContainer = React.createClass({
   getInitialState: function() {
           return { showResults: false };
   },
   onClick: function() {
           this.state.showResults ? this.setState({showResults: false}) : this.setState({showResults: true});
   },
   HiItems: function(items) {
    console.log(items)
  },

  render: function() {
     var classes2 = [
       { id: 0 , value: "JOUR-205"},
       { id: 1, value:"CPE-300"},
       { id: 2, value:"IME-314"},
       { id: 3, value:"COMS-101"},
       { id: 4, value:"BUS-310"}
     ]
     var classes = ["JOUR-205","CPE-300"]

      return (
        <div className="classlistContainer">
         <h2 style={styles.header}>Add Classes</h2>
         <button id="expandButton" onClick={this.onClick}>+</button>
         <Search items={classes}
               placeholder='Pick your class'
               maxSelected={3}
               multiple={true}
               onItemsChanged={this.HiItems.bind(this)} />
         {this.state.showResults ? <ClassList createElement={this.props.addClass}list={classes.value} /> : null}
        </div>

      );
    }

});

// ReactDOM.render goes here:
module.exports = ClassListContainer;
