import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PUREBLACK, PUREWHITE } from '../../Constants/Colors'
import axios from 'axios'
import { GlobalSize, fontSize } from '../../Constants/ResponsiveFont'
import { accessToken } from '../../Constants/APIKey'

const MovieDetails = () => {

    const [MovieData, setMovieData] = useState([])
    const [IsLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getMovieDetails() // To fetch the details
    }, [])

    const getMovieDetails = () => {

        const url = 'https://api.themoviedb.org/3/movie/550?language=en-US';

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(function (response) {
                // handle success
                setMovieData(response?.data)
                setIsLoading(false);
            })
            .catch(function (error) {
                // handle error
                setIsLoading(false);
                console.log(error);
            })

    }


    return (
        <SafeAreaView style={styles.container}>
            {IsLoading ? (
                <View style={[styles.container, { marginTop: GlobalSize(350) }]}>
                    <ActivityIndicator size="large" color={PUREBLACK} />
                </View>
            ) : (
                <View style={styles.movieCard}>

                    <Text style={styles.textNm}>{MovieData?.original_title}</Text>
                    <Text style={styles.textDesc}>{MovieData?.overview}</Text>
                    <Text style={styles.textNm}>Rating : {MovieData?.popularity}</Text>

                    <Text style={styles.textNm}>Production Companies</Text>
                    {MovieData?.production_companies?.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.textDesc}>{item?.name}</Text>
                            </View>
                        )
                    })}

                </View>)}
        </SafeAreaView>
    )
}

export default MovieDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    movieCard: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(300),
        padding: GlobalSize(30),
        elevation: 2,
        borderRadius: GlobalSize(10)
    },
    textNm: {
        fontSize: fontSize(16),
        color: PUREBLACK,
        fontWeight: '700',
        marginBottom: GlobalSize(10)
    },
    textDesc: {
        fontSize: fontSize(12),
        color: PUREBLACK,
        marginBottom: GlobalSize(10)
    }
})