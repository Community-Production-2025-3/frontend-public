import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    fontSize: 18,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#7C3AED',
    opacity: 0.1,
  },
  leftContent: {
    flex: 1,
    marginLeft: 12,
  },
  rightContent: {
    marginRight: 8,
  },
  itemContentText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  itemTimeText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    letterSpacing: 0.3,
    includeFontPadding: false,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconShadow: {
    textShadowColor: 'rgba(124,58,237,0.15)',
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter_300Light',
    letterSpacing: 1.5,
    color: '#64748B',
    marginBottom: 12,
  },
  emptySubText: {
    fontSize: 15,
    color: '#94A3B8',
    fontFamily: 'Inter_300Light',
    letterSpacing: 0.5,
  },
  highlightText: {
    color: '#7C3AED',
    fontFamily: 'Inter_600SemiBold',
  },
  loadingIndicator: {
    marginTop: 80,
    transform: [{ scale: 1.2 }],
  },
  // エラー表示用のスタイル
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff5252',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
