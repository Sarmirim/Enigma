// PROBLEMS ☺

// import React, { useState, useEffect, Component } from 'react';
// import {
//     SafeAreaView,
//     StyleSheet,
//     ScrollView,
//     View,
//     Text,
//     StatusBar,
//     FlatList,
//     Image,
//     ActivityIndicator,
//     unstable_enableLogBox,
//     Button,
//     TouchableOpacity,
//     RefreshControl
// } from 'react-native';
// import { PostComponent } from './main/PostComponent'
// import {RHeader} from './header/Header'




// export class Mlist extends Component {
//     // let [isRefreshing, setRefreshing] = useState(true);
//     // let [momentum, setMomentum] = useState(true);
//     // let [isLoading, setLoading] = useState(true);
//     // let [data, setData] = useState([]);
//     // let [after, setAfter] = useState("")
//     // const startLink = "https://www.reddit.com/r/animemes.json?limit=25&raw_json=1"
//     // let [link, setLink] = useState("https://www.reddit.com/r/all.json?limit=25&raw_json=1")
//     // let newlink = '';
//     constructor(props){
//         super(props);
//         this.state = {
//             scrolled: false,
//             loading: false,
//             data: [],
//             page: 1,
//             error: null,
//             refreshing: false,
//             original: `https://www.reddit.com/r/animemes.json?limit=3&raw_json=1`,
//             link: `https://www.reddit.com/r/animemes.json?limit=3&raw_json=1`
//         }
//     }

//     renderHeader = () => {
//         return <RHeader/>;
//       };

//     renderFooter = () => {
//         if (!this.state.loading) return null;
//         return (
//           <View
//             style={{
//               paddingVertical: 20,
//               borderTopWidth: 1,
//               borderColor: "#CED0CE"
//             }}
//           >
//             <ActivityIndicator animating size="large" />
//           </View>
//         );
//     };
    
//     renderSeparator = () => {
//         return (
//           <View
//             style={{
//               height: 5,
//               backgroundColor: "#CED0CE",
//             }}
//           />
//         );
//       };
    
//     componentDidMount(){
//         console.log("Mount");
//         this.loadMore();
//     }

//     loadMore = () => {
//         let  {page, link, original} = this.state;
//         this.setState({loading: true});
        
//         fetch(link)
//         .then((res) => res.json())
//         .then((json) => {
//             const newLink = original + "&after=" + json.data.after;
//             this.setState({
//                 data: page == 1 ? json.data.children : [...this.state.data, ...json.data.children],
//                 error: json.error || null,
//                 loading : false,
//                 refreshing: false,
//                 link: page==1 ? link : newLink
//             });
//             console.log(link);
//             console.log(`page number: ${page}`);
//         })
//         .catch((error) => console.error(error))
//         .finally(()=>{console.log("finally");})
//     }


//     handleRefresh = () => {
//         this.setState(
//             {
//                 page: 1,
//                 link: this.state.original,
//                 refreshing: true,
//             }, ()=>{
//                 this.loadMore();
//             }
//         )
//     }  

//     // handleLoadMore = ()=>{
//     //     this.setState(
//     //         {   
//     //             page: this.state.page + 1,
//     //         }, ()=>{
//     //                 if (this.state.scrolled) {
//     //                     console.log("mm");
//     //                     this.setState({
//     //                         scrolled: false
//     //                     })
//     //                 }
//     //                 console.log("loadmore");
//     //             console.log("load more start");
//     //             // this.loadMore();
//     //             // console.log("load more end");
//     //         }
//     //     )
//     // }

//     // onEndReached = () => {
//     //     console.log("hh");
//     //     if (this.state.scrolled) {
//     //         console.log("mm");
//     //       this.handleLoadMore();
//     //     //   this.state.scrolled = false;
//     //     }
//     //   };

//     // _onMomentumScrollBegin=() => {
//     //     this.setState({
//     //         scrolled: true
//     //     })
//     //     console.log("scroll");
//     // }

//     render(){
//         return (
//                 <FlatList
//                     // style={height='100%'}
//                     data={this.state.data}
//                     keyExtractor={({ data }, index) => data.id}
//                     // ItemSeparatorComponent={this.renderSeparator}
//                     // ListHeaderComponent={this.renderHeader}
//                     // ListFooterComponent={this.renderFooter}
//                     renderItem={({ item }) => (
//                         <View style={styles.container}>
//                             {
//                             item.data.url ? <Image source={{uri: item.data.url}} style={styles.cardItemImagePlace}>

//                             </Image> : null}
//                             {/* {item.data.url ? 
//                             <Image source={{uri: item.data.url}} style={styles.cardItemImagePlace}>

//                             </Image>: (<ActivityIndicator/>
//                             )} */}
//                             <PostComponent
//                                 Subreddit={item.data.subreddit}
//                                 PostDetails=''
//                                 ContentText={item.data.title}
//                                 UpvotesText={item.data.ups}
//                                 CommentText={item.data.num_comments}
//                                 Author={item.data.author}
//                                 style={styles.postComponent}>
//                             </PostComponent>
//                         </View>
//                     )}  
//                     showsVerticalScrollIndicator={true}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this.handleRefresh}
//                     // onMomentumScrollBegin={this._onMomentumScrollBegin}
//                     // onEndReachedThreshold={100}
//                     // onEndReached={console.log("aaaa")}


//                     // onMomentumScrollEnd={console.log("END")}
//                     // onEndReached={()=>{console.log("END"); this.handleLoadMore}}
//                     // onEndReached={this.onEndReached}// this.onEndReached();


                   
//                     // onEndReached={console.log("END")}
//                     // onEndReachedThreshold={1000}
//                     // onEndReachedThreshold={0.1}
                        
                    
//                 //  onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
//                 />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#808080",
//         justifyContent: "center",
//     },
//         cardItemImagePlace: {
//         backgroundColor: "#ccc",
//         flex: 1,
//         minHeight: 210
//     },
// });