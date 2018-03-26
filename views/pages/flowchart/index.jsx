var Class = require('./Components/classObjects');
var Board = require('./Components/board');
var ClassListContainer = require('./Components/classListContainer');
var ReactGridLayout = require('react-grid-layout');

require('./index.scss');

var App = React.createClass({
   getInitialState: function(){
      return {arr: []}
   },

   addClass: function() {
          var newArray = this.state.arr.slice();
          newArray.push({name:'Cofano'});
          this.setState({arr:newArray})
   },

  render: function() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'b', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'c', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'd', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'e', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'f', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'g', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'h', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'i', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'j', x: 0, y: 0, w: 1.6, h: 1.6}
    ];
    return (
      <div>
      <h1>Sqzee Flowchart</h1>
      <Board year="Dragging Area">
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={90} width={1200}>
        <div key={'a'}> <Class name='CPE-101'/></div>
        <div key={'b'}> <Class name='CPE-357'/></div>
        <div key={'c'}> <Class name='MATH-143'/></div>

        {
           this.state.arr.map((index, item) => (
               <div key={'d'}><Class name={item.name}/></div>
        ))
        }

      </ReactGridLayout>
      </Board>

      <Board year="Winter 2017"></Board>
      <Board year="Spring 2017"></Board>
      <Board year="Fall 2017"></Board>
      <Board year="Winter 2018"></Board>
      <div className="addClassesList">
         <ClassListContainer addClass={this.addClass} />
      </div>
      </div>
   )
  }
});

ReactDOM.render(<App/>, document.getElementById('container'));
