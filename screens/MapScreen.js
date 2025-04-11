import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [items, setItems] = useState([]); // Dynamic storage of items

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // TODO: Fetch actual lost & found item locations from backend
      setItems([
        { id: 1, title: 'Lost Item', latitude: currentLocation.coords.latitude + 0.002, longitude: currentLocation.coords.longitude + 0.002 },
        { id: 2, title: 'Found Item', latitude: currentLocation.coords.latitude - 0.002, longitude: currentLocation.coords.longitude - 0.002 },
      ]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {items.map((item) => (
            <Marker
              key={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              title={item.title}
            />
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#007bff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
