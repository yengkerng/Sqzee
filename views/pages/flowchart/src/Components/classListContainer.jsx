require('../index.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var ClassList = require('./classList');

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
           return {
             showResults: false,
             buttonText: '+'
               };
   },
   onClick: function() {
           this.state.showResults ? this.setState({showResults: false}) : this.setState({showResults: true});
           this.state.buttonText == '+' ? this.setState({buttonText: '-'}) : this.setState({buttonText: '+'});
   },

  render: function() {
     //var classes = [{name:"JOUR-205"}, {name:"CPE-300"}, {name:"IME-314"}, {name:"COMS-101"}];
     var classes = ["JOUR-205", "CPE-300",
     "IME-314", "COMS-101", "BUS-310", "MATH-142", "CHEM-124"]

      return (
        <div className="classlistContainer">
         <h2 style={styles.header}>Add Classes</h2>
         <button id="expandButton" onClick={this.onClick}>{this.state.buttonText}</button>
         {this.state.showResults ? <ClassList createElement={this.props.addClass}list={classes} nameArray={this.props.nameArray}/> : null}
        </div>

      );
    }

});

// ReactDOM.render goes here:
module.exports = ClassListContainer;
