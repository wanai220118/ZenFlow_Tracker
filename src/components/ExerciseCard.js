import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseCard = ({ exercise, onPress }) => {
  const imageSource = exercise.image || require('../../assets/images/placeholder.jpg');
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{exercise.name}</Text>
          {exercise.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{exercise.category}</Text>
            </View>
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {exercise.description}
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF5',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2DBD0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E2DBD0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#628B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: '#FFFDF5',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#628B35',
    lineHeight: 20,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  arrow: {
    fontSize: 32,
    color: '#628B35',
    fontWeight: '300',
  },
});

export default ExerciseCard;

