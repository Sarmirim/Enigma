import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, Text, useColorScheme, Pressable, TouchableOpacity, Appearance } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { CurrentTheme } from '../colorScheme'

function HeaderOptions(props) {
    const [modalVisible, setModalVisible] = useState(false);
    // const [sort, setSort] = useState('hot');
    
    // const click = (info)=>{
    //     setSort(info)
    //     console.log(info);
    //     const colorScheme = Appearance.getColorScheme();
    //     console.log(colorScheme);
    // }

    // THEME
    // const [theme, setTheme] = useState(true); 
    // useEffect(() => {
    //     const colorScheme = Appearance.getColorScheme();
    //     console.log(colorScheme);
    //     setTheme(colorScheme)
    //     // return colorScheme === "dark" ? darkStyle : lightStyle;
    // }, [])

    return (
        <View style={styles.container}>
            <Pressable style={styles.sortContainer} onPress={() => {
                setModalVisible(true); // console.log(colorScheme);
            }}>
                <Text style={styles.sortBy}>
                    <MaterialIconsIcon color='#0000ff' name="sort"
                        style={styles.layoutIcon}/>
                            {/* Sort {'\u0024'} */}
                </Text>
            </Pressable>

            <Modal animationType="none" transparent={true}
                visible={modalVisible} onRequestClose={
                    () => {setModalVisible(!modalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={()=>{props.setSort("hot")}}
                            style={styles.navBarLeftButton}>
                            <MaterialIconsIcon style={[styles.layoutIcon, {color: CurrentTheme.SpecialText}]}
                                name="whatshot"/>
                            <Text style={styles.modalText}>{`  Hot`}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{props.setSort("new")}}
                            style={styles.navBarLeftButton}>
                            <MaterialIconsIcon style={styles.layoutIcon} name="new-releases"/>
                            <Text style={styles.modalText}>{`  New`}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{props.setSort("top")}}
                            style={styles.navBarLeftButton}>
                            <MaterialIconsIcon style={styles.layoutIcon} name="assessment"/>
                            <Text style={styles.modalText}>{`  Top`}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{props.setSort("rising")}}
                            style={styles.navBarLeftButton}>
                            <MaterialIconsIcon style={styles.layoutIcon} name="trending-up"/>
                            <Text style={styles.modalText}>{`  Rising`}</Text>
                        </TouchableOpacity>

                        <Pressable style={styles.closeButton}
                        onPress={() => { setModalVisible(!modalVisible);}}>
                            <Text title="Close" style={styles.closeText}>{`Close`}</Text >
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    navBarLeftButton: {
        // borderColor: "white",
        // borderWidth: 5,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },    
    modalText: {
        color: CurrentTheme.PrimaryText,
        fontSize: 40
    },
    container: {
        // display: 'flex',
        // alignSelf: "center",
    },
    sortContainer: {
        // alignItems: "center",
        // justifyContent: "center",
    },
    sortBy: {
        color: CurrentTheme.PrimaryText,
        borderRadius: 15,
        // padding: 10,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    modalView: {
        backgroundColor: CurrentTheme.PrimaryBackground,
        borderRadius: 15,
        padding: 20,
    },
    layoutIcon:{
        fontSize: 40,
        color: CurrentTheme.ThirdText
    },
    closeButton: {
        backgroundColor: CurrentTheme.ThirdBackground,
        marginTop: 5,
        borderRadius: 15,
        padding: 10,
    },
    closeText: {
        color: CurrentTheme.PrimaryText,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30,
    },
})

export { HeaderOptions }
