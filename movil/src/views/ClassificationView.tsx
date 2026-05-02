// src/views/ClasificacionView.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import useClasificacion from '../controllers/useClassification';
import ResultCard from '../components/ResultCard';
import ProbabilityChart from '../components/ProbabilityChart';

const ClasificacionView: React.FC = () => {
  const {
    imageUri,
    result,
    loading,
    error,
    pickImage,
    reset
  } = useClasificacion();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Clasificador de Tumores
          </Text>
          <Text style={styles.subtitle}>
            Cerebrales (MRI)
          </Text>
        </View>

        {/* Image Preview */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Seleccione una imagen MRI
              </Text>
            </View>
          )}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={pickImage}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Clasificando...' : 'Seleccionar Imagen'}
          </Text>
        </TouchableOpacity>

        {result && !loading && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={reset}
            activeOpacity={0.6}
          >
            <Text style={styles.resetText}>
              Nueva Clasificación
            </Text>
          </TouchableOpacity>
        )}

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#00B4D8"
            style={{ marginTop: 20 }}
          />
        )}

        {/* Error Handling */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* Results Section */}
        {result && !loading && (
          <>
            <ResultCard result={result} />
            <ProbabilityChart
              probs={result.probsArray}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClasificacionView;

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#F0F4F8' 
  },
  scroll: { 
    padding: 20,
    paddingBottom: 40 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  subtitle: {
    fontSize: 16, 
    color: '#666',
    marginTop: 4,
  },
  imageContainer: {
    alignItems: 'center', 
    marginBottom: 16,
  },
  image: {
    width: 280, 
    height: 280,
    borderRadius: 16,
  },
  placeholder: {
    width: 280, 
    height: 280,
    borderRadius: 16,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
  },
  placeholderText: { 
    color: '#888', 
    fontSize: 14 
  },
  button: {
    backgroundColor: '#00B4D8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#00B4D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#A0E1ED',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetBtn: {
    marginTop: 12, 
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00B4D8',
    alignItems: 'center',
  },
  resetText: { 
    color: '#00B4D8', 
    fontSize: 14,
    fontWeight: '600'
  },
  errorBox: {
    backgroundColor: '#FDECEA',
    padding: 12, 
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#C0392B',
  },
  errorText: { 
    color: '#C0392B', 
    fontSize: 14 
  },
});