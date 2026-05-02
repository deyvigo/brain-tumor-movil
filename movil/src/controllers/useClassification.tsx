import { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import ClassificationResult from "../models/ClassificationResult"
import { classifyImage } from "../services/apiService"

interface UseClassificationReturn {
  imageUri: string | null
  result: ClassificationResult | null
  loading: boolean
  error: string | null
  pickImage: () => Promise<void>
  reset: () => void
}

export default function useClassification(): UseClassificationReturn {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const pickImage = async (): Promise<void> => {
    try {
      const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!permResult.granted) {
        setError('Se requiere permiso de galería')
        return
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8
      })

      if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
        const uri = pickerResult.assets[0].uri
        setImageUri(uri)
        setError(null)
        setResult(null)
        await classify(uri)
      }
    } catch (err) {
      setError('Error al seleccionar imagen')
      console.error(err)
    }
  }

  const classify = async (uri: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await classifyImage(uri)
      setResult(new ClassificationResult(data))
    } catch (err: any) {
      setError(err.message || 'Error desconocido al clasificar')
    } finally {
      setLoading(false)
    }
  }

  const reset = (): void => {
    setImageUri(null)
    setResult(null)
    setError(null)
  }

  return {
    imageUri,
    result,
    loading,
    error,
    pickImage,
    reset
  }
}