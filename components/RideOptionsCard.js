import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlices';
import 'intl';
import 'intl/locale-data/jsonp/en';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  }
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {


  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);


  return (
    <SafeAreaView style={[tw`bg-white flex-grow`, { overflow: "scroll" }]}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigationCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride -
          {Math.round(travelTimeInformation?.distance?.value * 0.001)} Kms
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between px-0 items-center
              ${id === selected?.id && "bg-gray-200"}
            `}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                margin: 10
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Duration</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "GBP"
                }).format(
                  (travelTimeInformation?.duration?.value *
                    SURGE_CHARGE_RATE * multiplier) / 100
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}> Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
