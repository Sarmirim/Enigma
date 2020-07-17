import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from "react-native";
import {CurrentTheme} from '../colorScheme'


function HeaderTabs(props) {
    let [sty, setSty] = useState(false);
    return (
        <View style={styles.container}>
        <TouchableOpacity 
            onPress={()=>{setSty(false); console.log(sty)}}
            style={ sty ? styles.test1: styles.Tab }
            // style={styles.Tab}
        >
            <Text style={styles.allText}>{`POSTS`}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            onPress={()=>{ console.log("touch"); setSty(true); console.log(sty);}}
            // onPress={() => props.navigation.navigate("Popular")}
            style={ sty ? styles.Tab : styles.test1 }
            // style={styles.popularTab}
        >
            <Text style={styles.popularText}>{`COMMENTS`}</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,1)",
        flexDirection: "row",
        justifyContent: "center",
    },
    Tab: {
        width: 142,
        alignSelf: "stretch",
        justifyContent: "center",
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderBottomColor: "#0000ff",
        padding: 10
    },
    allText: {
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontFamily: "ibm-plex-sans-regular",
        alignSelf: "center"
    },
    popularText: {
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontFamily: "ibm-plex-sans-regular",
        alignSelf: "center"
    },
    test1: {
        width: 142,
        alignSelf: "stretch",
        justifyContent: "center",
    },
});

export {HeaderTabs};