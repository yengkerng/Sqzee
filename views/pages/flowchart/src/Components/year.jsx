require('../index.scss');

let Draggable = require('react-draggable');
var Board = require('./board');

var React = require('react');

var Year = React.createClass({
  render: function() {
      return (
        <div id={this.props.year} className="year">
           <div className="yearTitleContainer">
               <span className="yearTitle">Year {this.props.year}</span>
               <hr className="lineTitle"></hr>
           </div>

           <div className="boardContainer">
               <Board year="Fall"></Board>
               <Board year="Winter"></Board>
               <Board year="Spring"></Board>
           </div>
        </div>
      );
    }
});

// ReactDOM.render goes here:
module.exports = Year;
