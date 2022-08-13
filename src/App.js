import React from "react";
import logo from './logo.svg';
import './App.css';
//import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      duration: "",
      day: "",
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      start: event.target.start,
      duration: event.target.duration,
      day: event.target.day
    });
  };

  render() {
    return (
      <>
        <input
          type="text"
          start={this.state.start}
          onChange={this.handleChange}
        />
        {/*This line renders the value to the screen. 
        Instead of rendering we should use the value 
        for the timeCalculator function's parameter*/}
        <h1>{this.state.start}</h1>
      </>
    );
  }
}

export default App;
