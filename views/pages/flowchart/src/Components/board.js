require('../index.scss');

let Draggable = require('react-draggable');

var React = require('react');

var board = React.createClass({
  render: function() {
      return (
        <div id={this.props.id} className="board">
           <div className="boardTitleContainer">
               <h1 className="quarterTitle">{this.props.year}</h1>
               <hr></hr>
               <br></br>
           </div>
           <br></br>
           {this.props.children}
        </div>
      );
    }
});

// ReactDOM.render goes here:
module.exports = board;
