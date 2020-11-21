import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput, ActivityIndicator } from "react-native";
import {HeaderSearch} from './HeaderSearch'
import {HeaderOptions} from './HeaderSort'
import {HeaderTabs} from './HeaderTabs'

function RHeader(props) {
  return (
    <View style={styles.container}>
        <HeaderSearch/>
        {/* <HeaderOptions/> */}
        {/* <HeaderTabs/> */}
    {/* <Image 
        source={{uri: 'http://www.clicktorelease.com/code/gif/1.gif'}} 
        style={{width: 100, height: 100 }}
        />
        <Image 
        source={{uri: 'https://v.redd.it/smzeszqu3y951/DASH_96.mp4'}}
        /> */}
        
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        // alignSelf: 'center',
    }
});
  
export {RHeader};
