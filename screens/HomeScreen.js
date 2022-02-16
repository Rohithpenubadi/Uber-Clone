import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Navoptions from '../components/Navoptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';
import { setDestination, setOrigin } from '../slices/navSlices';
import { useDispatch } from 'react-redux';


const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain"
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    minLength={3}
                    styles={{
                        container: {
                            flex: 0,
                            zIndex: 10000
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    query={{
                        key: process.env.GOOGLE_MAPS_KEY,
                        language: 'en'
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    onFail={error => console.error(error)}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
                <Navoptions />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
