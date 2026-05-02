import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { IProbDetail } from '../models/ClassificationResult';

interface ProbabilityChartProps {
  probs: IProbDetail[];
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ probs }) => {
  const colors: string[] = [
    '#E74C3C', // Glioma
    '#F39C12', // Meningioma
    '#27AE60', // No Tumor
    '#3498DB'  // Pituitary
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Probabilidades por Clase
      </Text>
      
      {probs.map((item, index) => {
        // Calculamos el estilo de la barra de forma dinámica
        const barStyle: ViewStyle = {
          width: `${item.value * 100}%`,
          backgroundColor: colors[index % colors.length],
        };

        return (
          <View key={item.name} style={styles.barRow}>
            <Text style={styles.label} numberOfLines={1}>
              {item.name}
            </Text>
            
            <View style={styles.barBg}>
              <View style={[styles.barFill, barStyle]} />
            </View>
            
            <Text style={styles.percent}>
              {item.percentage}%
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProbabilityChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    // Sombra para Android
    elevation: 2,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: 90,
    fontSize: 13,
    color: '#555',
  },
  barBg: {
    flex: 1,
    height: 20,
    backgroundColor: '#EEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  percent: {
    width: 50,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
});