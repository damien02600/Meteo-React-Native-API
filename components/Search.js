import React from "react";
import { TextInput, View, Text, Button } from 'react-native';


export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          city: 'Montpellier'
        }
      }

setCity (city) {
    this.setState({city})
}

    render ()  {
        return (
            <View>
            <TextInput
            onChangeText={(text) => this.setCity(text)}
            style={{height:40, borderColor: 'gray', borderWidth: 1}}
            value={this.state.city}
            />
            <Button onPress={() => this.submit()} title="Rechercher une ville"/>
            </View>
        )
    }
}