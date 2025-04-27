import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function Analyze() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [image, setImage] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const toggleFlash = () => {
    setFlash(current => current === 'on' ? 'off' : 'on');
  };

  const toggleCameraFacing = () => {
    setFacing(current => current === 'back' ? 'front' : 'back');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0]);
      setAnalysis(null); // Reset analysis when new image is picked
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const analyzeImage = async () => {
    if (!image) {
      alert('Please take a photo first');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: {
            inlineData: {
              data: image.base64,
              mimeType: 'image/jpeg',
            }
          }
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.data);
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert('Failed to analyze image: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 1,
        });
        setImage(photo);
        setAnalysis(null); // Reset analysis when new photo is taken
      } catch (error) {
        console.error('Error taking picture:', error);
        alert('Failed to take picture');
      }
    }
  };

  if (image) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setImage(null)}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={analyzeImage}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </Text>
          </TouchableOpacity>
        </View>
        {analysis && (
          <View style={styles.analysisContainer}>
            <Text style={styles.analysisText}>{JSON.stringify(analysis, null, 2)}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        ref={cameraRef}
        flash={flash}
      >
        <View style={styles.overlay}>
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="close" size={30} color="white" />
          </TouchableOpacity>

          {/* Scanner Icon and Upload Button */}
          <View style={styles.scannerContainer}>
            <MaterialCommunityIcons name="scan-helper" size={100} color="white" />
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={pickImage}
            >
              <MaterialCommunityIcons name="image-plus" size={24} color="white" />
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            {/* Flash Toggle */}
            <TouchableOpacity 
              style={styles.flashButton}
              onPress={toggleFlash}
            >
              <MaterialCommunityIcons 
                name={flash === 'on' ? 'flash' : 'flash-off'} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>

            {/* Capture Button */}
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handleCapture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>

            {/* Camera Flip Button */}
            <TouchableOpacity 
              style={styles.flashButton}
              onPress={toggleCameraFacing}
            >
              <MaterialCommunityIcons 
                name="camera-flip" 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    backgroundColor: '#7fff6c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  analysisContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  analysisText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
}); 