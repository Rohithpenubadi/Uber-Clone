import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, selectDestination , setTravelTimeInformation} from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLE_MAPS_KEY } from '@env'
import NavFavourites from './NavFavourites';
import { useSelector, useDispatch } from 'react-redux';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
        })
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async() => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${process.env.GOOGLE_MAPS_KEY}`
            await fetch(URL)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }
        getTravelTime();
    }, [origin, destination, process.env.GOOGLE_MAPS_KEY])

    return (
        <MapView
            ref={mapRef}
            mapType="mutedStandard"
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={process.env.GOOGLE_MAPS_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    title="origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
            <NavFavourites/>
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
