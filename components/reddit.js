import React, { useState, useEffect, useCallback } from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList, Image, ActivityIndicator,
        Button, TouchableOpacity, RefreshControl, Share } from 'react-native';
import { PostComponent } from './main/PostComponent'
import {RHeader} from './header/Header'
import {CurrentTheme} from './colorScheme'
// import {createStore} from 'redux'

// TODO optimize useStates 
export let Mlist = () => {
    // states
    const [isRefreshing, setRefreshing] = useState(null);
    const [isLoading, setLoading] = useState(null);

    // reddit json api
    const [data, setData] = useState([]);
    // const [text, setText] = useState(``);
    
    // url variables
    const limit = 7;
    const sort = 'top'
    const subreddit = 'all'
    const sortTime = `t=all&` // all time: t=all&     this year: t=year&     this month: t=month&     this week: t=week&     this day: t=day&     now: t=hour&
    const [link, setLink] = useState(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&raw_json=1`)

    // FlatList
    // const [momentum, setMomentum] = useState(true);

    // etc
    const startLink = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&${sortTime}raw_json=1`
    let newlink 

    useEffect(() => {
        console.log("firstFetch")
        fetch(startLink)
            .then((response) => response.json())
            .then((json) => {
                setData(json.data.children)
                setLink(startLink + "&after=" + json.data.after)
                newlink = startLink + "&after=" + json.data.after
                console.log("JSON DATA: " + json.data.children)
                console.log("new "+  json.data.after)
                console.log("children length: " + json.data.children.length)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setRefreshing(false)
                setLoading(false)
            });
        return () => {
            setData([])
        }
    }, []);

    let onRefresh = () => {
        console.log("onRefresh")
        setRefreshing(true)
        // setData([]);
        fetch(startLink)
        .then((response) => response.json())
        .then((json) => {
            setData(json.data.children);
            setLink(startLink + "&after=" + json.data.after)
            console.log("JSON DATA: " + json.data.children)
            console.log("new "+  json.data.after)
            console.log("children length: " + json.data.children.length)
            newlink = startLink + "&after=" + json.data.after;
        })
        .catch((error) => console.error(error))
        .finally(() => {
            console.log("finally");
            setRefreshing(false);
            setLoading(false);
        });
    }

    // let _onMomentumScrollBegin = () => {
    //     setMomentum(false);
    //     console.log("scroll");
    // }
    
    // which one (fetch || axios || ??)
    let loadMore = () => {
        console.log("loadMore")
        // setLoading(true);
        fetch(link)
        .then((response) => response.json())
        .then((json) => {
            setData(data.concat(json.data.children))
            setLink(startLink + "&after=" + json.data.after)
            newlink = startLink + "&after=" + json.data.after
            console.log("JSON DATA: " + json.data.children)
            console.log("new "+  json.data.after)
            console.log("children length: " + json.data.children.length)
        })
        .catch((error) => console.error(error))
        .finally(() => {
            setLoading(false)
        })
    }

    let renderHeader = () => {
        return <RHeader/>
    };

    let renderSeparator = () => {
        return <View style={{height: 7, backgroundColor: "#1a1a1c",}}/>;
    };

    let renderFooter = () => {
        return isLoading ? null :
        <View style={{paddingVertical: 0, borderTopWidth: 5, borderColor: "#CED0CE"}}>
            <ActivityIndicator color="#0000ff"  animating size="large" />
        </View>
    };

    let renderPost = ({item})=>{
        return <>
            <PostComponent
                Subreddit={item.data.subreddit}
                PostDetails=''
                ContentText={item.data.title}
                UpvotesText={item.data.ups}
                CommentText={item.data.num_comments}
                Author={item.data.author} 
                url={item.data.url}
                created_utc={item.data.created_utc}
                over_18={item.data.over_18}
                permalink={item.data.permalink}
            >
            </PostComponent>
        </>
    }
    return (
        <FlatList
            data={data}
            keyExtractor={({ data }, index) => data.id+index} // added (+index) for unique key
            refreshControl={
                <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => onRefresh()}
                />
            }
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            renderItem={renderPost}                    
                // showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                // onMomentumScrollBegin={() => _onMomentumScrollBegin()}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: CurrentTheme.SecondaryBackground,
        justifyContent: "center",
    },
});