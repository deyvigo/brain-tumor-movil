import axios, { AxiosError } from 'axios'
import { IClassificationData } from '../models/ClassificationResult'

const BASE_URL = 'http://192.168.0.11:5000'

interface ReactNativeFile {
  uri: string
  name: string
  type: string
}

export async function classifyImage(imageUri: string): Promise<IClassificationData> {
  const formData = new FormData()

  const filename = imageUri.split('/').pop() || 'image.png'
  const ext = filename.split('.').pop()

  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'

  formData.append('image', {
    uri: imageUri,
    name: filename,
    type: mimeType,
  } as any)

  try {
    const response = await axios.post<IClassificationData>(
      `${BASE_URL}/api/clasificar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        throw new Error(
          `Error del servidor: ${axiosError.response.status}`
        )
      } else if (axiosError.request) {
        throw new Error(
          'No se pudo conectar con el servidor. Verifica que la IP sea correcta y el servidor esté corriendo.'
        )
      }
    }
    throw error
  }
}