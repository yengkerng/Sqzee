require('../index.scss');

import axios from 'axios';

var React = require('react');
var ClassList = require('./classList');

class classObjects extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      units: "",
      description: "",
      loading: true,
      error: null
    };
  }

  componentDidMount(){

    console.log(this.props.name)
    axios.get(`https://www.sqzee.com/class/classinfo/${this.props.name}`)
      .then(res => {
        //const rating = res.data.class_info.rating;
        const units = res.data.class_info.units;
        const description = res.data.class_info.name;

        this.setState({
          units,
          description,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading:false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div> Loading.. </div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    const { error } = this.state;

    const sqzeeLink = 'https://www.sqzee.com/class/' + this.props.name
    this.props.description = this.state.description
    this.props.units = this.state.units
    var className = this.props.name.split("-")

    if(error) {
      return this.renderError();
    }
    return (
      <div className="box">
         <div id="deleteButtonContainer">
            <button id="deleteButton" onClick={this.props.removeClass} value={this.props.name}>x</button>
         </div>
         <div id="classTitleContainer">
            <a id="classTitle" href={sqzeeLink}>{className[0] + " " + className[1]}</a>
         </div>
         <div id="classDescription">
            {this.state.description}
         </div>
         <div id="classUnits">
            Units : {this.state.units}
         </div>
       </div>
    );
  }

  render() {
    const { loading } = this.state;

      return (
        <div>
        {loading ? this.renderLoading() : this.renderPosts()}
        </div>
      );
    }
}

module.exports = classObjects;
