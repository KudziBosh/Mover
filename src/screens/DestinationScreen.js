import React, {useRef,useContext,useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { parameters, colors } from '../global/styles';
import { Icon, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { OriginContext, useO } from '../contexts/contexts';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

navigator.geolocation = require('react-native-geolocation-service');

const DestinationScreen = ({navigation}) => {

    const dispatchOrigin = useContext(OriginContext);
    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    return (
        <View style = {styles.view2}>
                <View style ={styles.view1}> 
                    <Icon 
                        type ="material-community"
                        name ="arrow-left"
                        color ={colors.grey1}
                        size ={32}
                        onPress ={()=>navigation.goBack()} 
                    />
                </View>
                <TouchableOpacity>
                    <View style ={{top:25,alignItems:"center"}}>
                        <View style ={styles.view3}>
                            <Avatar 
                                rounded
                                avatarStyle ={{}}
                                size ={30}
                                source = {require('../../assets/blankProfilePic.jpg')}
                                />
                            <Text style ={{marginLeft:5}}>For Someone</Text>
                            <Icon 
                                type ="material-community"
                                name ="chevron-down"
                                color ={colors.grey1}
                                size ={26}
                                />
                        </View>
                    </View>
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                    nearbyPlacesAPI='GooglePlacesSearch'
                    placeholder='Where to?'
                    styles={autoComplete}
                    listViewDisplayed='auto'
                    debounce={400}
                    currentLocation={true}
                    fetchDetails={true}
                    currentLocationLabel='Current location'
                    onPress= {(data,details = null)=>{
                        dispatchOrigin({type:"ADD_ORIGIN",payload:{
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            address:details.formatted_address,
                            name:details.name
                        }})
    
                        navigation.goBack()
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY ,
                        language: 'en',
                    }}
                    ref={textInput1}
                    minLength={2}
                    enablePoweredByContainer={false}
                    autoFocus={true}
                    returnKeyType={'search'}

                />
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
        paddingTop:parameters.statusBarHeight
    },
    
    view1:{
        position:"absolute",
        top:25,
        left:12,
        backgroundColor:colors.white,
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10, 
        zIndex: 10
        
    },
    
    view3:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:2,   
        marginBottom:10,
        backgroundColor: colors.white,
        height:60,
        zIndex: 10
    },
    
    view2:{backgroundColor:colors.white,
            zIndex:4,
            paddingBottom:10,
            marginTop:parameters.statusBarHeight/2,
            height:SCREEN_HEIGHT
        },
    
        view24:{
            flexDirection:"row",
            justifyContent:"space-between",
         marginVertical:15,
            paddingHorizontal:20   
        }, 
        
        view25:{
            flexDirection:'row',
         alignItems:"baseline"
        },
        
        flatlist:{
            marginTop:20,
            zIndex:17,
            elevation:8
        },    
    
    });
    
    
    const autoComplete = {
    
        textInput:{
            backgroundColor: colors.grey6,
            height: 50,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            borderWidth:1,
            marginHorizontal:15,
        },
        container: {
             paddingTop:20,
            flex: 1,
            backgroundColor:colors.white
                },
        
        textInputContainer: {
            flexDirection: 'row',
        },
}// Add closing parenthesis here