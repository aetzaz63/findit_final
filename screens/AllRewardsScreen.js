import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import API_CONFIG from '../config';

const AllRewardsScreen = () => {
  const [rewardedItems, setRewardedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRewardedItems = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.API_URL}/lostitems/rewards`);
        setRewardedItems(response.data);
      } catch (error) {
        console.error('Error fetching rewarded items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewardedItems();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('LostItemDetailScreen', { itemId: item._id })}
    >
      
      <View style={styles.info}>
        <Text style={styles.title}>{item.itemName || 'Unnamed Item'}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.reward}>Reward: Rs {item.reward}</Text>
        <Text style={styles.meta}>Location: {item.location}</Text>
        <Text style={styles.meta}>Date: {new Date(item.date).toDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#3d0c45" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={{ width: 24 }} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3d0c45" />
        </View>
      ) : (
        <FlatList
          data={rewardedItems}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default AllRewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3d0c45',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3d0c45',
  },
  desc: {
    fontSize: 13,
    color: '#555',
  },
  reward: {
    fontSize: 14,
    color: '#d79e00',
    fontWeight: 'bold',
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
});
