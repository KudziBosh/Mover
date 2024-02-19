import React, { useRef, useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { parameters, colors } from '../global/styles';
import { Icon, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { OriginContext, DestinationContext } from '../contexts/contexts';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

navigator.geolocation = require('react-native-geolocation-service');

const DestinationScreen = ({ navigation }) => {


  const { dispatchOrigin } = useContext(OriginContext);
  const { dispatchDestination } = useContext(DestinationContext)

  const textInput1 = useRef(4);
  const textInput2 = useRef(5);

  const [destination, setDestination] = useState(false)


  return (
    <View style={styles.view2}>
      <View style={styles.view1}>
        <Icon
          type="material-community"
          name="arrow-left"
          color={colors.grey1}
          size={32}
          onPress={() => navigation.goBack()}
        />
      </View>
      <TouchableOpacity>
        <View style={{ top: 25, alignItems: "center" }}>
          <View style={styles.view3}>
            <Avatar
              rounded
              avatarStyle={{}}
              size={30}
              source={require('../../assets/blankProfilePic.jpg')}
            />
            <Text style={{ marginLeft: 5 }}>For Someone</Text>
            <Icon
              type="material-community"
              name="chevron-down"
              color={colors.grey1}
              size={26}
            />
          </View>
        </View>
      </TouchableOpacity>

      {destination === false &&
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="Where to?"
          styles={autoComplete}
          listViewDisplayed="auto"
          debounce={400}
          currentLocation={true}
          showsUserLocation={true}
          followsUserLocation={true}
          fetchDetails={true}
          currentLocationLabel="Current location"
          //handle current location null error
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            dispatchOrigin({
              type: "ADD_ORIGIN",
              payload: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                name: details.name,
              },
            });
            // Check if the origin is set
            if (dispatchOrigin.latitude !== null) {
              console.log("Origin is set");
              console.log(details.geometry.location.lat);
            }

            setDestination(true);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          ref={textInput1}
          minLength={2}
          enablePoweredByContainer={false}
          autoFocus={true}
          returnKeyType={'search'}
        />
      }
      {destination === true &&
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="Where From?"
          styles={autoComplete}
          listViewDisplayed="auto"
          debounce={400}
          currentLocation={true}
          fetchDetails={true}
          currentLocationLabel="current location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            dispatchDestination({
              type: "ADD_DESTINATION", payload: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                name: details.name
              }
            });
            // Check if the origin is set
            if (dispatchDestination.latitude !== null) {
              console.log("Destination is set");
              console.log(details.geometry.location.lat);
            }

            navigation.navigate("RequestScreen", { state: 0 })
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          ref={textInput2}
          minLength={2}
          enablePoweredByContainer={false}
          autoFocus={true}
          returnKeyType={'search'}
        />
      }
    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: parameters.statusBarHeight
  },

  view1: {
    position: "absolute",
    top: 25,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    zIndex: 10
  },

  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    height: 60,
    zIndex: 10
  },

  view2: {
    backgroundColor: colors.white,
    zIndex: 4,
    paddingBottom: 10,
    marginTop: parameters.statusBarHeight / 2,
    height: SCREEN_HEIGHT
  },

  view24: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20
  },

  view25: {
    flexDirection: 'row',
    alignItems: "baseline"
  },

  flatlist: {
    marginTop: 20,
    zIndex: 17,
    elevation: 8
  },
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.grey6,
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white
  },
  textInputContainer: {
    flexDirection: 'row',
  },
};