import React, { Component } from "react";
import { Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";

import styles from "./styles";

class ContactDetail extends Component {

  constructor(props) {
    super(props);
    this.contact = props.navigation.state.params.contact;
  }

  handleButtonPress(e) {
    e.preventDefault();
    this.props.navigation.state.params.updateContact(this.contact)
    this.props.navigation.goBack();
  }

  deleteContact(e) {
    e.preventDefault();
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete!',
          onPress: () => {
            this.props.navigation.state.params.deleteContact(this.contact)
            this.props.navigation.goBack();
          }
        },
      ],
      { cancelable: false }
    );

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Contact Details</Title>
          </Body>
          <Right>
            {this.contact._id &&
              <Button transparent onPress={(e) => this.deleteContact(e)}>
                <Text>Delete</Text>
              </Button>
            }
          </Right>
        </Header>
        <Content keyboardShouldPersistTaps="always">

          <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              <Input
                onChangeText={(text) => this.contact.Name = text}
              >{this.contact.Name}</Input>
            </Item>
            <Item fixedLabel last>
              <Label>Phone</Label>
              <Input
                onChangeText={(text) => this.contact.Phone = text}
              >{this.contact.Phone}</Input>
            </Item>
          </Form>

          <Button block
            style={{ margin: 15, marginTop: 50 }}
            onPress={(e) => this.handleButtonPress(e)}
          >
            <Text>{this.contact._id ? 'Update' : 'Save'}</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default ContactDetail;
