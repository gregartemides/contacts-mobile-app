import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Body,
  List,
  ListItem,
  Left,
  Button,
  Right,
  Icon,
  Font
} from "native-base";

import styles from "./styles";

class ContactList extends Component {

  constructor(props) {
    super(props);

    // FIXME - dynamically determine the network address
    /*const ifs = require('os').networkInterfaces();
    const result = Object.keys(ifs)
      .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
      .filter(x => x)[0].address;
    console.log(result);*/

    this.config = {
      apiUrl: "https://quiet-thicket-36443.herokuapp.com/api/contacts"
    }
    this.state = {
      contacts: [],
      rowHasChanged: false,
      fontLoaded: false
    };
  }

  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  toFormData(contact) {
    let array = [];
    for (let prop in contact) {
      array.push(`${prop}=${this.fixedEncodeURIComponent(contact[prop])}`);
    }
    return array.join('&');
  }

  async fetchContacts() {
    console.log(this.config.apiUrl);
    try {

      let response = await fetch(this.config.apiUrl);
      let responseJson = [];
      try {
        responseJson = await response.json();
      } catch (error) {
        console.log(error);
        responseJson = [];
      }
      this.setState({ contacts: responseJson });
    } catch (error) {
      console.log(error);
    }
  }

  async putContact(contact) {
    let formData = this.toFormData(contact);
    try {
      await fetch(this.config.apiUrl, {
        method: 'PUT',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formData
      });
      this.fetchContacts();
    } catch (error) {
      console.log(error);
    }
  }

  async postContact(contact) {
    try {
      await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: this.toFormData(contact)
      });
      this.fetchContacts();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteContact(contact) {
    try {
      await fetch(this.config.apiUrl, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: this.toFormData(contact)
      });
      this.fetchContacts();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.fetchContacts();
  }

  updateContact = (contact) => {
    // new or update
    if (!contact._id) {
      this.postContact(contact);
    } else {
      this.putContact(contact);
    }
  }

  handleDeleteContact = (contact) => {
    this.deleteContact(contact);
  }

  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Contacts</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.fetchContacts()}>
              <Text>Reload</Text>
            </Button>
            <Button transparent onPress={() => this.props.navigation.navigate('ContactDetail', {
                contact: {
                  key: null,
                  Name: '',
                  Phone: ''
                },
                updateContact: this.updateContact
              })}>
              <Text>New</Text>
            </Button>
          </Right>

        </Header>

        <Content>
          <List
            dataArray={this.state.contacts}
            rowHasChanged={() => true}
            renderRow={contact =>
              <ListItem button onPress={() => this.props.navigation.navigate('ContactDetail', {
                contact: contact,
                updateContact: this.updateContact,
                deleteContact: this.handleDeleteContact
              })}>
                <Text>{contact.Name}</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}


export default ContactList;
