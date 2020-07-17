/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  unstable_enableLogBox,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Mlist} from './components/reddit'
// import { Mlist } from './components/reddit'

// const App: () => React$Node = () => {



const App = () => {
    return (
        <View
            // contentI/nsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {/* {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                )} */}
            <StatusBar barStyle="dark-content" />
            <Mlist style/>
        </View>

        // <Mlist style/>

    );
};

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
});

export default App;
