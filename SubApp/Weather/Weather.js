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
  // Je créer une fonction pour obtenir l'emplacement,
  // A l'intérieur je mets les autorisation android requis.
  // async va transformer la fonction en promesse
  getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    // Je créer une condition, pour savoir si j'ai la permin ssion ou non.
    // Si la const 'granted' est égal au autorisation, alors je donne ma localisation
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

  round=(temp)=>{
let a=Math.trunc(temp*100 + 0.5);
let finalTemp= a/100;
return finalTemp
  };

  render() {
const {data} = this.state;


    if (data != null) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#465675',
            alignItems:'center',
          }}>
          <Text style={styles.title}>Météo</Text>
          <View>
            <Text style={styles.data}>Température :{this.round(data.main.temp - 272.15)} °C</Text>
            <Text style={styles.data}>Pressions :{data.main.pressure} hPa</Text>
            <Text style={styles.data}>Humidité :{data.main.humidity} %</Text>
            <Text style={styles.data}>Température min :{this.round(data.main.temp_min - 272.15)} °C</Text>
            <Text style={styles.data}>Température max :{this.round(data.main.temp_max - 272.15)} °C</Text>
            <Text style={styles.data}>Vent :{data.wind.speed} </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
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
    fontWeight: 'bold',
color: '#F2F3F5'
  },
  data: {
    fontSize: 25,
    color: '#F2F3F5'
  },
});
