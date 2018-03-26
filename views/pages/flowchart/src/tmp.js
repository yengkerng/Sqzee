import HorizontalScroll from 'react-horizontal-scroll'

var Class = require('./Components/classObjects');
var Board = require('./Components/board');
var ClassListContainer = require('./Components/classListContainer');
var WidthProvider = require('react-grid-layout').WidthProvider;

var ReactGridLayout = require('react-grid-layout');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
ReactGridLayout = WidthProvider(ReactGridLayout);

require('./index.scss');

var url = require("file-loader!./gradient8.jpg");
var divStyle = {
   backgroundImage: 'url(' + url + ')'
};

let counter = 0;
const originalLayout = getFromLS('layout') || [];

var App = React.createClass({
  mixins: [PureRenderMixin],


  getDefaultProps() {
    return {
      className: "layout",
      cols: 5,
      rowHeight: 90,
      width: 1200,
      onLayoutChange: function() {},
    };
  },
  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS('layout', layout);
    this.setState({layout});
    this.props.onLayoutChange(layout); // updates status display
  },

  resetLayout() {
    this.setState({
      arr: [],
      layout: []
    });
  },

   getInitialState: function(){
      return {arr: [], layout: JSON.parse(JSON.stringify(originalLayout))};
   },

   addClass: function(name) {
          var newArray = this.state.arr.slice();
          newArray.push({name:name});
          this.setState({arr:newArray}, function () {
            //console.log(this.state.arr);
          });
   },

   removeClass: function(name) {

      var val = name.target.value;
      var newArray = this.state.arr.slice();

      for (var k in newArray) {
        if (newArray[k].name == val) {
          newArray.splice(k, 1);

        }
      }

      this.setState({arr:newArray}, function () {
        console.log(this.state.arr);
      });

  },

  render: function() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'b', x: 0, y: 0, w: 1.6, h: 1.6},
      {i: 'c', x: 0, y: 0, w: 1.6, h: 1.6},
    ];

  return (
      <div className="wrapper" style={divStyle}>
         <div id="headerContainer">
            <h1 id="appHeader">Sqzee Flowchart</h1>
            <button onClick={this.resetLayout}>Reset Layout</button>
            <div className="addClassesList">
               <ClassListContainer addClass={this.addClass}/>
            </div>
         </div>
         <div class="flowchartContainer">
         <div className="horizontalContainer">
            <Board year="Dragging Area">
               <ReactGridLayout ref="rgl" {...this.props} layout={this.state.layout} onLayoutChange={this.onLayoutChange} className="layout"
                >
                 {this.state.arr.map((item, index) => (
                        <div key={item.name} data-grid={{w: 1.6, h: 1.6, x: 0, y: 0, isResizable: false}}>
                          <Class name={item.name} removeClass={this.removeClass}/>
                        </div>
                 ))}
               </ReactGridLayout>
            </Board>

               <Board year="Winter 2017"></Board>
               <Board year="Spring 2017"></Board>
               <Board year="Fall 2017"></Board>
               <Board year="Winter 2018"></Board>
               <Board year="Spring 2018"></Board>

               <Board year="Fall 2018"></Board>
               <Board year="Winter 2019"></Board>
               <Board year="Spring 2019"></Board>
            </div>
         </div>
      </div>
   )
  }
});

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
    } catch(e) {/*Ignore*/}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-7', JSON.stringify({
      [key]: value
    }));
  }
}

module.exports = App;

ReactDOM.render(<App/>, document.getElementById('container'));
