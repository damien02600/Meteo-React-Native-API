import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {keyWeather} from './utils';

export class Weather extends Component {
  state = {
    lat: null,
    lon: null,
    data: null,
  };

  componentDidMount() {
    this.getLocation();
  }
  getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
          (position) => {
          console.log(position);
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          this.getWeather();
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };



  getWeather = async () => {
    if (this.state.lat != null) {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${keyWeather.apiKey}`,
      );


      const data = await response.json();
      this.setState({
        data: data,
      });
    }
  };

  render() {
const {data} = this.state;


    if (data != null) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <Text style={styles.title}>Weather</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={styles.title}>Chargement ...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
  },
});
