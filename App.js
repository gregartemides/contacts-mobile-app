import React from "react";
import App from "./js/App";

export default class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentWillMount() {
  	await Expo.Font.loadAsync({
  	  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  	  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  	});
  	this.setState({ fontLoaded: true });
  }

  render() {
	  return this.state.fontLoaded ? <App /> : null;
  }
}
