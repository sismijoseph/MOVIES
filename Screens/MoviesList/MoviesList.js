import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PUREBLACK, PUREWHITE } from '../../Constants/Colors'
import { GlobalSize, fontSize, height, width } from '../../Constants/ResponsiveFont'
import axios from 'axios';
import { accessToken } from '../../Constants/APIKey';


    const MoviesList = ({ navigation }) => {

        const [searchValue, setSearchValue] = useState(null)
        const [MovieData, setMovieData] = useState([])
        const [IsLoading, setIsLoading] = useState(true)
    
        useEffect(() => {
            getMovieData(); // To fetch the movie listing API
        }, []);
    
        const getMovieData = () => {
       
            const url = 'https://api.themoviedb.org/3/movie/159/lists?language=en-US&page=1';
    
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(function (response) {
                    // handle success
                    setMovieData(response?.data?.results);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    // handle error
                    setIsLoading(false);
                    console.log(error);
                });
        }
    
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={styles.subContainer}
                    onPress={() => navigation.navigate('MovieDetails')}>
                    <View>
                        <Text style={styles.textNm}>{item?.name}</Text>
                        <Text style={styles.textDesc}>{item?.description ? item?.description : "Lorem Ipsum is simply dummy text of the type specimen book."}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {IsLoading ? (
                            <View style={[styles.container,{marginTop:GlobalSize(350)}]}>
                                <ActivityIndicator size="large" color={PUREBLACK} />
                            </View>
                        ) : (
                            <View>
                                <View style={styles.alignView}>
                                    <TextInput
                                        style={styles.textInput}
                                        value={searchValue}
                                        placeholder='Search'
                                        placeholderTextColor={PUREBLACK}
                                        onChangeText={(text) => setSearchValue(text)} />
                                </View>
    
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FlatList
                                        data={MovieData}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={renderItem} />
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

export default MoviesList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSearch: {
        fontSize: fontSize(22),
        color: PUREWHITE
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(30),
        marginBottom: GlobalSize(20)
    },
    textInput: {
        color: PUREWHITE,
        fontSize: fontSize(14),
        width: width(280),
        height: height(50),
        backgroundColor: PUREWHITE,
        elevation: 2,
        borderRadius: GlobalSize(25),
        paddingLeft: GlobalSize(20),
    },
    subContainer: {
        width: width(280),
        backgroundColor: PUREWHITE,
        elevation: 2,
        borderRadius: 10,
        marginBottom: GlobalSize(10),
        margin: 1,
        padding: 15
    },
    textNm: {
        fontSize: fontSize(16),
        fontWeight: '700',
        color: PUREBLACK
    },
    textDesc: {
        color: PUREBLACK,
        fontSize: fontSize(12)
    }
})