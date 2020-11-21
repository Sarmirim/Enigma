import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput, ActivityIndicator } from "react-native";
import {HeaderSearch} from './HeaderSearch'
import {HeaderOptions} from './HeaderSort'
import {HeaderTabs} from './HeaderTabs'

const RHeader = (props) => {
	return (
		<View style={styles.container}>
			<HeaderSearch setSort={props.setSort} setSubreddit={props.setSubreddit}/>   
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        // alignSelf: 'center',
    }
})
  
export {RHeader}
