let Draggable = require('react-draggable');

var Class = require('./Components/classObjects');
var Board = require('./Components/board');
require('./index.scss');

var App = React.createClass({

  render() {
    return (
      <div>
        <h1>Sqzee Flowchart</h1>
        <Board year ="Fall 2016">
        <Class name='sara'/>
        <Class name='Cofano'/>
        <Class name='Pirvu'/>
        </Board>
        <Board year="Winter 2017">
        <Class name='Tan'/>
        <Class name='Pirvu'/>
        </Board>
        <Board year="Spring 2017">
        <Class name='Tan'/>
        <Class name='Cofano'/>
        </Board>
        <Board year="Fall 2017">
        <Class name='Tan'/>
        <Class name='Cofano'/>
        </Board>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('container'));
