import { AppColors } from '@/constants/AppColors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  todoItem: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
  },
  todoInputContainer: {
    marginBottom: 12,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeButton: {
    borderRadius: 12,
    marginVertical: 15,
    backgroundColor: '#5F6A7A',
    color: 'white',
    marginBottom: 50,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  enabled: {
    backgroundColor: AppColors.constant.primary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 12,
  },
  lockedButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#D3D3D3',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    maxWidth: 320,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 5,
  },
});
