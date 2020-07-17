import React, { useState, useEffect, useCallback } from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList, Image, ActivityIndicator,
        unstable_enableLogBox, Button, TouchableOpacity, RefreshControl, Share } from 'react-native';
import { PostComponent } from './main/PostComponent'
import {RHeader} from './header/Header'
import {CurrentTheme} from './colorScheme'

// TODO optimize useStates 
export let Mlist = () => {
    // states
    const [isRefreshing, setRefreshing] = useState(true);
    const [isLoading, setLoading] = useState(true);
    // reddit json api
    const [data, setData] = useState([]);
    // const [text, setText] = useState(``);
    // url variables
    const [limit, setLimit] = useState(5);
    const [sort, setSort] = useState('hot');
    const [subreddit, setSubreddit] = useState('all');
    const [sortTime, setSortTime] = useState(``); // t=all&
    const [link, setLink] = useState(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&raw_json=1`)
    // else
    const [momentum, setMomentum] = useState(true);

    // etc
    let startLink = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&${sortTime}raw_json=1`
    let newlink = '';

    useEffect(() => {
      fetch(startLink)
        .then((response) => response.json())
        .then((json) => {
            setData(json.data.children);
            console.log("JSON DATA: " + json.data.children);
            setLink(startLink + "&after=" + json.data.after);
            console.log(link);
            newlink = startLink + "&after=" + json.data.after;
            console.log("newlink" + newlink);
            console.log("children length: " + json.data.children.length);
        })
        .catch((error) => console.error(error))
        .finally(() => {
            setRefreshing(false);
            setLoading(false);
        });
    }, []);

    let onRefresh = useCallback(() => {
        setRefreshing(true)
        fetch(startLink)
        .then((response) => response.json())
        .then((json) => {
            setData(json.data.children);
            console.log("JSON DATA: " + json.data.children);
            setLink(startLink + "&after=" + json.data.after);
            console.log(link);
            newlink = startLink + "&after=" + json.data.after;
            console.log("children length: " + json.data.children.length);
        })
        .catch((error) => console.error(error))
        .finally(() => {
            setRefreshing(false);
            setLoading(false);
        });
    }, [data]);

    let _onMomentumScrollBegin = () => {setMomentum(false);
    console.log("scroll");}
    
    // TODO fetch || axios || ??
    let loadMore = () => {
        // setLoading(true);
        fetch(link
        //     ,{
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json'
        //       // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(data) // body data type must match "Content-Type" header
        //   }
          )
        .then((response) => response.json())
        .then((json) => {
            setData(data.concat(json.data.children));
            console.log("JSON DATA: " + json.data.children);
            setLink(startLink + "&after=" + json.data.after);
            newlink = startLink + "&after=" + json.data.after;
            console.log("load more" + newlink);
            console.log("new "+  json.data.after);
            console.log("children length: " + json.data.children.length);
        })
        .catch((error) => console.error(error))
        .finally(() => {
            setLoading(false);
        });
    }

    let renderHeader = () => {
        return <RHeader/>
    };

    let renderSeparator = () => {
        return (<View style={{height: 7, backgroundColor: "#1a1a1c",}}/>);
    };

    let renderFooter = () => {
        return isLoading ? null :
        <View style={{paddingVertical: 0, borderTopWidth: 5, borderColor: "#CED0CE"}}>
            <ActivityIndicator color="#0000ff"  animating size="large" />
        </View>
    };

    return (
        <FlatList
            data={data}
            keyExtractor={({ data }, index) => data.id}
            refreshControl={
                <RefreshControl
                refreshing={isRefreshing}
                onRefresh={()=>{onRefresh()}}
                />
            }
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    {/* {console.log(item.data.media.reddit_video.fallback_url)} */}
                    <PostComponent
                        Subreddit={item.data.subreddit}
                        PostDetails=''
                        ContentText={item.data.title}
                        UpvotesText={item.data.ups}
                        CommentText={item.data.num_comments}
                        Author={item.data.author}
                        style={styles.postComponent}
                        url={item.data.url}
                        created_utc={item.data.created_utc}
                        over_18={item.data.over_18}
                        permalink={item.data.permalink}
                    >
                    </PostComponent>
                </View>
            )}                    
                // showsVerticalScrollIndicator={false}
                onEndReached={() => {console.log("finish"); loadMore()}}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => _onMomentumScrollBegin()}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: CurrentTheme.SecondaryBackground,
        justifyContent: "center",
    },
});