export interface IClassificationData {
  prediction: string
  image_name: string
  probs: Record<string, number | string>
}

export interface IProbDetail {
  name: string
  value: number
  percentage: string
}

export type TumorClass = 'GLIOMA' | 'MENINGIOMA' | 'NOTUMOR' | 'PITUITARY'

export default class ClassificationResult {
  public prediction: string
  public imageName: string
  public probs: Record<string, number | string>

  constructor(data: Partial<IClassificationData>) {
    this.prediction = data.prediction || ''
    this.imageName = data.image_name || ''
    this.probs = data.probs || {}
  }

  get predictedClass() {
    return this.prediction
      .replace('Prediction: ', '')
      .trim()
  }

  get probsArray(): IProbDetail[] {
    return Object.entries(this.probs).map(([name, value]) => {
      const numValue = typeof value === 'string' ? parseFloat(value) : value
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: numValue,
        percentage: (numValue * 100).toFixed(1),
      }
    })
  }

  getColorForClass(className: string) {
    const colors: Record<TumorClass | string, string> = {
      GLIOMA: '#E74C3C',
      MENINGIOMA: '#F39C12',
      NOTUMOR: '#27AE60',
      PITUITARY: '#3498DB',
    }
    return colors[className as TumorClass] || '#95A5A6'
  }

  get description() {
    const desc: Record<TumorClass | string, string> = {
      GLIOMA: 'Tumor originado en celulas gliales.',
      MENINGIOMA: 'Tumor en las meninges.',
      NOTUMOR: 'No se detecta tumor.',
      PITUITARY: 'Tumor en la glandula pituitaria.',
    }
    return desc[this.predictedClass as TumorClass] || 'Clasificación desconocida.'
  }
}