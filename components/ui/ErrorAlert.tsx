import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorAlertProps {
  message: string | null;
  onDismiss?: () => void;
  style?: object;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onDismiss,
  style,
}) => {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.messageContainer}>
        <Ionicons name="alert-circle" size={24} color="#FF3B30" />
        <Text style={styles.message}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEFEF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  message: {
    marginLeft: 8,
    color: '#333',
    flex: 1,
    fontSize: 14,
  },
  dismissButton: {
    padding: 4,
  },
});
