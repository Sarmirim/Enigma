import React, { Component } from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
// import Icon from "react-native-vector-icons/EvilIcons";
import {HeaderOptions} from './HeaderSort'
import {CurrentTheme} from '../colorScheme'


function HeaderSearch(props) {
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.searchHeader}>
                <TextInput 
                    // onChange={testtext=>{console.log(testtext);}}
                    // defaultValue={"text"}
                    placeholder="Search" 
                    placeholderTextColor = {CurrentTheme.SecondaryText}
                    style={styles.searchInput}>

                </TextInput>
            </View>

            <HeaderOptions/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 10
    },
    searchHeader: {
        backgroundColor: CurrentTheme.SecondaryBackground,
        flexDirection: "row",
        borderRadius: 15,
        flex: 1,
    },
    searchInput: {
        flex: 1,
        color: CurrentTheme.PrimaryText,
        paddingHorizontal: 10,
        fontSize: 15,
    }
});

export {HeaderSearch};
