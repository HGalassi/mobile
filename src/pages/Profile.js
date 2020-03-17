import React from 'react';
import {View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile ({navigation}){
    const user = navigation.getParam('user')
    console.log('user received ' + user);
    console.log('user concat '  + `https://www.facebook.com/${user}`);

    return <WebView style = {{flex : 1}} 
    source = {{ uri : `https://www.facebook.com/${user}`}}>
    </WebView>
}

export default Profile;