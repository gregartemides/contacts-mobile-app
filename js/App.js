/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import ContactList from "./components/contacts/ContactList";
import ContactDetail from "./components/contacts/ContactDetail";

const AppNavigator = StackNavigator(
	{
		ContactList: { screen: ContactList },
		ContactDetail: {screen: ContactDetail },
	},
	{
		initialRouteName: "ContactList"
	}
);

export default class App extends React.Component {
	render() {
		return (
			<Root>
				<AppNavigator />
			</Root>
		);
	}
}
