import React , {useState, useEffect} from 'react';
import {StyleSheet , Image , View , Text , TextInput , TouchableOpacity} from 'react-native';
import  MapView , { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';
import { requestPermissionAsync , getCurrentPositionAsync }  from 'expo-location';
import * as Permissions from 'expo-permissions';
import { createAppContainer} from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main ({navigation}){

    const [users, setUsers] = useState([]);
    const [currentRegion , setCurrentRegion] = useState(null);
    const [ specs , setSpecs] = useState([]);

    useEffect(() => {
        async function loadInitialPosition(){
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            //  requestPermissionAsync();

            if (status){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy : true,
                });

                const {latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta : 0.04,
                    longitudeDelta : 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    async function loadUsers(){
        const {latitude , longitude } = currentRegion;
        if (!specs){
            let response = await api.get('/users');
            setUsers(response.data);
            console.log(response.data);
        }else{
            let response = await api.get('/search' , {
                params : {
                    latitude, 
                    longitude,
                    specs
                }
            })
            setUsers(response.data.users);
            console.log(users);
        }

        // console.log(response.data.users);

        
    }

    if (!currentRegion){
        return null;
    }

    return (
        <>
        <MapView onRegionChangeComplete={handleRegionChanged} 
        initialRegion = {currentRegion} style = {styles.map}>
           {users.map(user => (
            <Marker key={user._id} coordinate = {{
                longitude : user.location.coordinates[0],
                latitude :  user.location.coordinates[1],
            }}>
                <Image style={styles.avatar} source = {{
                    uri : user.avatar_url
                }}/>
                
                <Callout onPress= {
                    ()=> {
                        navigation.navigate('Profile' , { user : user.name})
                    } 
                }>
                    <View style={styles.callout}>
                        <Text style= {styles.userName}> {user.name}</Text>
                        <Text style= {styles.userBio}> {user.bio}</Text>
                        <Text style= {styles.userSpecs}>{user.specs.join(', ')} </Text>
                    </View>
                </Callout> 
            </Marker> 
           ))}
        </MapView>   
        
        <View style = {styles.searchForm}>
            <TextInput
                style = {styles.searchInput}
                placeholder = "Buscar usuarios por specs"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={specs}
                onChangeText={setSpecs}
                />

                <TouchableOpacity onPress ={loadUsers}
                    style = {styles.loadButton}>
                    <MaterialIcons name = "my-location" size = {20} color='#FFF' />
                </TouchableOpacity>
        </View>
        </>
        

    );
}

const styles = StyleSheet.create({
    map : {
        flex : 1
    },

    avatar : {
        width : 54,
        height : 54,
        borderRadius : 4,
        borderWidth : 4,
        borderColor : '#FFF'
    },
    callout : {
        width : 260,
        // height : 300,
        // flexWrap : "wrap"
    },
    userName : {
        fontWeight : 'bold',
        fontSize : 16,
    },

    userBio : {
        color : '#666',
        marginTop : 5,
    },

    userSpecs : {
        marginTop : 5,
    },

    searchForm : {
        position : 'absolute',
        top : 20,
        left : 20,
        right : 20,
        zIndex : 5,
        flexDirection : 'row',
    },

    searchInput : {
        flex : 1,
        height : 50,
        backgroundColor : '#FFF',
        color : '#333',
        borderRadius : 25,
        paddingHorizontal : 20,
        fontSize  : 16,
        shadowColor : '#000',
        shadowOpacity : 0.2,
        shadowOffset : {
            width : 4,
            height : 4,
        },
        elevation : 2,
    },

    loadButton : {
        width : 50,
        height : 50,
        backgroundColor : '#8E4Dff',
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 15,
    },

})

export default Main;