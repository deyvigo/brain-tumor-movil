import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import ClasificacionResult from '../models/ClassificationResult';

interface ResultCardProps {
  result: ClasificacionResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  // Obtenemos el color basado en la lógica del modelo
  const color: string = result.getColorForClass(result.predictedClass);

  // Estilos dinámicos
  const dynamicCardStyle: ViewStyle = { borderLeftColor: color };
  const dynamicTextStyle: TextStyle = { color };

  return (
    <View style={[styles.card, dynamicCardStyle]}>
      <Text style={[styles.prediction, dynamicTextStyle]}>
        {result.prediction}
      </Text>
      <Text style={styles.description}>
        {result.description}
      </Text>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 5,
    // Sombra para Android
    elevation: 2,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  prediction: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});