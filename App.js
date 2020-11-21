import React, { useState, useEffect } from 'react'
import {    SafeAreaView, StyleSheet, ScrollView, View, Text,
            StatusBar, FlatList, Image, ActivityIndicator, Button } from 'react-native'
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Main } from './components/reddit'

const App = () => {
    return (
        <View style={styles.scrollView}>
                {/* {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                )} */}
            <StatusBar barStyle='light-content' backgroundColor="black"/>
            <Main style/>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.black,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
})

export default App
