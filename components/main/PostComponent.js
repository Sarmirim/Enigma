import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Share, Modal, Dimensions, Linking } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {CurrentTheme} from '../colorScheme'
import {timeAgo, KMBformat, checkValidUrl} from './helpers'

const _PostComponent = (props) =>{
    console.log("PostComponent " + props.author);
    const [modalVisible, setModalVisible] = useState(null)
    const [imageExist, setImageExist] = useState({url: null, thumbnail: null})
    console.log(imageExist.url, imageExist.thumbnail, props.thumbnail)

    useEffect(() => {
        console.log("useEffect");
        setImageExist(checkValidUrl(props.url, props.thumbnail))
      }, []); //()=>{checkValidUrl(props.url, props.thumbnail)}

    const onShare = async (text) => {
        console.log("onShare")
        console.log(text)
        try {
        const result = await Share.share({
            message: text,
        })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared 
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed IOS only
        }
        } catch (error) {
            alert(error.message);
        }
    }

    const ImageResolver = () =>{
        return imageExist.url ? <Image     
            // onLoad={()=>{checkValidUrl(props.url)}} 
            // onError={()=>{console.log("error"); setImageExist(false)}} 
            style={styles.cardItemImagePlace} 
            blurRadius={props.over_18 ? 60 : 0} source={{uri: props.url}}>
        </Image> : <View>
            <Image style={styles.cardItemImagePlace} source={{uri: props.thumbnail}}/>   
            <Text numberOfLines={1} style={{
                paddingHorizontal: 20,
                color: CurrentTheme.PrimaryText,
                alignSelf: "flex-start",
                marginBottom: 0,
                fontSize: 15
            }}>
                {`>> ${props.url}`}
            </Text>
            </View>
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
            }}>
                <View style={styl.centeredView}>
                    <View style={styl.modalView}>
                        <TouchableOpacity onPress={() => {
                                setModalVisible(!modalVisible)
                        }}>
                            <Image source={{
                                uri: props.url}}
                                resizeMode={'contain'}
                                style={{height:'100%'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={()=>{
                    console.log("IMAGE")
                    imageExist.url ? setModalVisible(true) : Linking.openURL(props.url)                  
            }}>
                {imageExist.thumbnail ? <ImageResolver /> : null}
             </TouchableOpacity>

            <View style={props.over_18 ? styles.nsfwpostWrapper : styles.postWrapper}>
                <View style={styles.postHeader}>
                    <View style={styles.headerGroup}>
                        <Text style={styles.subreddit}>
                            {`r/${props.subreddit}`}
                        </Text>
                        <Text style={styles.postDetails}>
                            {`Posted by u/${props.author} • ${timeAgo(props.created_utc)}`}
                        </Text>
                    </View>
                </View >

                <View style={styles.postTitle}>
                    <Text style={styles.contentText}>
                        {props.contentText}
                    </Text>
                </View>

                <View style={styles.postAction}>
                    <View style={styles.voteWrapper}>
                        <EntypoIcon name="arrow-up" style={styles.upvoteIcon}></EntypoIcon>
                        <Text style={styles.upvotesText}>{KMBformat(props.upvotesText)}</Text>
                        <EntypoIcon
                        name="arrow-down"
                        style={styles.downvoteIcon}
                        ></EntypoIcon>
                    </View>

                    <TouchableOpacity style={styles.commentWrapper}>
                        <Text style={styles.commentText}>{KMBformat(props.commentText)}</Text>
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
                        </View>
                    </View>                   
                </View>
            </View>
        </View>
    );
}

// test version od style
const styl = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
    },
    modalView: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 0,
    },
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: CurrentTheme.PrimaryBackground,
        display: "flex",
        justifyContent: "space-around",
    },
    cardItemImagePlace: {
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
    },
    postDetails: {
        color: "#808080",
        fontSize: 12,
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

export const PostComponent = React.memo(_PostComponent)
