import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  transparent?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  transparent = true,
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.container, transparent && styles.transparent]}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#007AFF" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  transparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loadingBox: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
