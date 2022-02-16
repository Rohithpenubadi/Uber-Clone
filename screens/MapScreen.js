import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationCard from '../components/NavigationCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';



const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu"/>
      </TouchableOpacity>
      <View>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name='NavigationCard'
              component={NavigationCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='RideOptionsCard'
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
