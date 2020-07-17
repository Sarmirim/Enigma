import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Share, Modal, Dimensions } from "react-native";
import { useState, useEffect } from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IoniconsIcon from "react-native-vector-icons/Ionicons";

import {CurrentTheme} from '../colorScheme'


const pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;
const abbrev = 'kmb';

function round(n, precision) {
    let prec = Math.pow(10, precision);
    return Math.round(n*prec)/prec;
}

function format(n) {
    let base = floor(log(abs(n))/log(1000));
    let suffix = abbrev[Math.min(2, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? round(n/pow(1000,base),2)+suffix : ''+n;
}

// const win = Dimensions.get('window');
// const ratio = win.width/541;

function time(value){
        // SARMIRIM/RIFTACH JAVA PROJECT CODE
        // Date current = Date.from(Instant.now());
        // long difference = (current.getTime() - (long)time*1000)/1000/60;
        // long years = 1;
        // if(difference>=518400){years = difference/518400;}

        // if(difference<0){}
        // else if(difference<60){text = difference + "m ago";}// minutes
        //     else if(difference/60<24){text = difference/60 + "h ago";}// hours
        //         else if(difference/1440<30){text = difference/1440 + "d ago";}// days
        //             else if(difference/43200<12){text = difference/43200 + "Mo ago";}// Months
        //                 else if(years<100){text = years + "Y ago";}//years
        //                     else if(years/100<100){text = years + "centuries ago (????)";}
        //                         else if(years/1000<9999999999L){text = "??????";}
        // else {text= "a few seconds ago";}

    let now = Math.round(new Date().getTime()/1000)
    console.log(now);
    var t = new Date(1970, 0, 1);
    let dif = now - value
    
    dif = new Date(dif * 1000 ).toISOString().substr(3, 16) // (this part hidden YEA){R-MM-DD(T)hh:mm:ss}
    // console.log(`${dif} ago`);
    // console.log(t);
    // console.log(Date(new Date(dif) - new Date(t)));
    return `${dif} ago`
}

let PostComponent = (props) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [imageExist, setImageExist] = useState(true);
    useEffect(() => {
        checkValidUrl(props.url)
      }, []); //()=>{checkValidUrl(props.url)}
    const onShare = async (text) => {
        console.log(text);
        try {
        const result = await Share.share({
            message: text,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
            alert(error.message);
        }
    };

    const checkValidUrl = (url)=>{
        //define some image formats 
        var types = ['jpg','jpeg','tiff','png','gif','bmp'];
        
        //split the url into parts that has dots before them
        var parts = url.split('.');
        
        //get the last part 
        var extension = parts[parts.length-1];
        
        //check if the extension matches list 
        if(types.indexOf(extension) !== -1) {
            setImageExist(true);
        } else{
            setImageExist(false);
        }
        // return false;
    }
    return (
        <View style={styles.container}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styl.centeredView}>
                    <View style={styl.modalView}>
                    <TouchableOpacity
                        // style={styl.openButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Image
                        // style={{
                        //     flex: 1,
                        //     alignSelf: 'stretch',
                        //     width: win.width,
                        //     height: win.height,}
                        // }
                        source={{uri: props.url}}
                        resizeMode={'contain'}
                        style={{height:'100%'}}
                        // style={{minHeight: 600,}}
                        //  style={styles.cardItemImagePlace}
                         />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

                {/* // props.url ? <Image blurRadius={0} source={{uri: props.url}}
                // style={styles.cardItemImagePlace}>
                // </Image> : null */}
            <TouchableOpacity onPress={()=>{console.log("IMAGE");
                setModalVisible(true);
            }}>
                <Image 
                // onLoad={()=>{checkValidUrl(props.url)}} 
                // onError={()=>{console.log("error"); setImageExist(false)}} 
                style={imageExist ? styles.cardItemImagePlace: null} 
                blurRadius={props.over_18 ? 60 : 0} source={{uri: props.url}}/>

             </TouchableOpacity>

            <View style={props.over_18? styles.nsfwpostWrapper : styles.postWrapper}>
                <View style={styles.postHeader}>
                    <View style={styles.headerGroup}>
                        <Text style={styles.subreddit}>
                            {`r/${props.Subreddit}`}
                        </Text>
                        <Text style={styles.postDetails}>
                            {`Posted by u/${props.Author} • ${time(props.created_utc)}`}
                        </Text>
                    </View>
                    {/* <MaterialCommunityIconsIcon
                        name="dots-vertical"
                        style={styles.moreIcon}
                    ></MaterialCommunityIconsIcon> */}
                </View >

                <View style={styles.postTitle}>
                    <Text style={styles.contentText}>
                        {props.ContentText}
                    </Text>
                </View>

                <View style={styles.postAction}>
                    <View style={styles.voteWrapper}>
                        <EntypoIcon name="arrow-up" style={styles.upvoteIcon}></EntypoIcon>
                        <Text style={styles.upvotesText}>{format(props.UpvotesText)}</Text>
                        <EntypoIcon
                        name="arrow-down"
                        style={styles.downvoteIcon}
                        ></EntypoIcon>
                    </View>
                    <TouchableOpacity style={styles.commentWrapper}>

                        <Text style={styles.commentText}>{`${format(props.CommentText)} `}</Text>
                        <MaterialCommunityIconsIcon
                            name="comment"
                            style={styles.commentIcon}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <View style={styles.options}>
                            <View style={styles.options}>
                                <TouchableOpacity onPress={()=>{onShare(`https://www.reddit.com${props.permalink}`)}}>
                                    <Text  style={styles.shareText}>{`POST   `}</Text>                                
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{onShare(`${props.url}`)}}>
                                    <Text style={styles.shareText}>{`   LINK    `}</Text>
                                </TouchableOpacity>
                                {/* <Text onPress={()=>{`POST   `; onShare("hi")}} style={styles.shareText}>{()=>{`POST   `; onShare("hi")}}</Text> */}
                                {/* <Text style={styles.shareText}>{`   --Share--   `}</Text> */}
                                {/* <Text style={styles.shareText}>{`   LINK    `}</Text> */}
                            </View>

                        <TouchableOpacity>
                            <MaterialCommunityIconsIcon
                                name="dots-vertical"
                                style={[styles.moreIcon]}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>

                            {/* <FontAwesomeIcon
                            name="share"
                            style={styles.shareIcon}
                            ></FontAwesomeIcon> */}
                            {/* <IoniconsIcon
                                name="md-arrow-dropdown"
                                style={styles.dropdownIcon}
                            ></IoniconsIcon>  */}

                            {/* <Ionicons
                                name="ellipsis-vertical-outline"
                                style={styles.moreIcon}
                            ></Ionicons> */}                     
                    </View>                   
                </View>
            </View>
        </View>
    );
}

const styl = StyleSheet.create({
    container: {
        alignItems: "center",
        // justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
    },
    modalView: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: "black",
        padding: 0,
    },
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: CurrentTheme.PrimaryBackground,
        display: "flex",
        justifyContent: "space-around",
        // color: CurrentTheme.PrimaryText
        // marginBottom: 5
    },
    cardItemImagePlace: {
        // backgroundColor: "#ccc",
        flex: 1,
        minHeight: 210
    },
    postWrapper: {
        alignSelf: "stretch",
    },
    nsfwpostWrapper:{
        alignSelf: "stretch",
        backgroundColor: "#941001",
    },
    postHeader: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: "column",
        alignSelf: "flex-start",
    },
    headerGroup: {
    },
    postTitle:{
        paddingVertical: 5,
    },
    subreddit: {
        color: CurrentTheme.PrimaryText,
        fontSize: 14,
        // letterSpacing: 1
    },
    postDetails: {
        color: "#808080",
        fontSize: 12,
        // letterSpacing: 1
    },
    moreIcon: {
        color: "grey",
        fontSize: 20
    },
    contentText: {
        paddingHorizontal: 20,
        color: CurrentTheme.PrimaryText,
        alignSelf: "flex-start",
        marginBottom: 0,
        fontSize: 15,
        // letterSpacing: 1
    },
    postAction: {
        paddingHorizontal: 20,
        paddingBottom: 5,
        fontSize: 20,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    voteWrapper: {
        flexDirection: "row",
    },
    upvoteIcon: {
        color: "#828384",
        alignSelf: "center"
    },
    upvotesText: {
        color: "#828384",
    },
    downvoteIcon: {
        color: "#828384",
        alignSelf: "center"
    },
    commentWrapper: {
        flexDirection: "row",
    },
    commentIcon: {
        color: "#828384",
        alignSelf: "center"
    },
    commentText: {
        color: "#828384",
    },
    options: {
        flexDirection: "row",
    },
    shareIcon: {
        color: "#828384",
        alignSelf: "center"
    },
    shareText: {
        color: "#828384",
    }
});

export {PostComponent};
