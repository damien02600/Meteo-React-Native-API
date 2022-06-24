import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {keyWeather} from './utils';

export class Weather extends Component {
  // Je définit Null par défaut
  state = {
    lat: null,
    lon: null,
    data: null,
  };

  // J'apelle la fonction componentDidMount, qui me demande l'autorisation de la localisation
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
      // J'obtient l'emplacement actuelle
      Geolocation.getCurrentPosition(
          (position) => {
          console.log(position);
          // ( lat: position.coords.latitude,) qui équivaut à positionner les coordonnées de latitude
          // La position fait référence au paramétre (position)
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


// Je récupére les données de l'API 
  getWeather = async () => {
    // Si le state n'est pas égal à NUll,
    if (this.state.lat != null) {
    // alors je récupére les données de l'API
    // Pour récupérer ma clé API je créer un fichier "utils.js", puis le l'apelle via le nom de la constante est, le nom de la clé
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${keyWeather.apiKey}`,
      );

// Je passe la réponse que je recois
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

// Si les données ne sont pas égal à Null
// Alors j'affiche cette écran
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
        // Ecran de chargement
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
