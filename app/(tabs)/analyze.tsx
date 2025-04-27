import { View, Text, TouchableOpacity, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const PermissionView = ({ onRequestPermission }: { onRequestPermission: () => void }) => {
  return (
    <LinearGradient
      colors={['#7fff6c', 'rgba(127, 255, 108, 0.3)', '#ffffff']}
      locations={[0.4, 0.5, 0.6]}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <SafeAreaView className="absolute top-0 left-0 right-0">
        <TouchableOpacity 
          className="absolute right-5 top-20 z-10"
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="close" size={30} color="#03080A" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="bg-white/90 p-8 rounded-3xl w-full max-w-sm shadow-xl">
        <MaterialCommunityIcons 
          name="camera-off" 
          size={48} 
          color="#03080A" 
          className="self-center mb-4"
        />
        <Text className="text-xl text-center text-black mb-3" style={{ fontFamily: 'Inter_700Bold' }}>
          Camera Permission Required
        </Text>
        <Text className="text-base text-gray-600 text-center mb-6" style={{ fontFamily: 'Inter_400Regular' }}>
          We need access to your camera to analyze food photos. Your privacy is important to us.
        </Text>
        <TouchableOpacity 
          className="bg-[#03080A] py-4 px-8 rounded-full items-center shadow-lg"
          onPress={onRequestPermission}
        >
          <Text className="text-white text-base" style={{ fontFamily: 'Inter_600SemiBold' }}>
            Grant Camera Access
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const PreviewView = ({ 
  image, 
  onRetake, 
  onAnalyze, 
  loading, 
  analysis 
}: { 
  image: any;
  onRetake: () => void;
  onAnalyze: () => void;
  loading: boolean;
  analysis: any;
}) => {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <Image
          source={{ uri: image.uri }}
          className="w-full h-full"
        />
        <View className="absolute bottom-10 left-5 right-5 flex-row justify-around">
          <TouchableOpacity 
            className="bg-[#7fff6c] px-6 py-4 rounded-xl"
            onPress={onRetake}
          >
            <Text className="text-black text-base" style={{ fontFamily: 'Inter_600SemiBold' }}>
              Retake
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`bg-[#7fff6c] px-6 py-4 rounded-xl ${loading ? 'opacity-50' : ''}`}
            onPress={onAnalyze}
            disabled={loading}
          >
            <Text className="text-black text-base" style={{ fontFamily: 'Inter_600SemiBold' }}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </Text>
          </TouchableOpacity>
        </View>
        {analysis && (
          <View className="absolute top-10 left-5 right-5 bg-black/70 p-5 rounded-xl">
            <Text className="text-white text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
              {JSON.stringify(analysis, null, 2)}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const CameraViewComponent = ({ 
  onCapture,
  onPickImage,
  flash,
  onToggleFlash,
  facing,
  onToggleFacing,
  cameraRef
}: {
  onCapture: () => void;
  onPickImage: () => void;
  flash: FlashMode;
  onToggleFlash: () => void;
  facing: CameraType;
  onToggleFacing: () => void;
  cameraRef: React.RefObject<CameraView>;
}) => {
  const statusBarHeight = Platform.OS === 'ios' ? 0 : RNStatusBar.currentHeight || 0;

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <CameraView
        ref={cameraRef}
        facing={facing}
        flash={flash}
        style={{ flex: 1 }}
      >
        {/* Close Button */}
        <SafeAreaView style={{ position: 'absolute', top: statusBarHeight, left: 0, right: 0, zIndex: 10 }}>
          <TouchableOpacity 
            className="absolute right-5 top-20"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="close" size={30} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Scanner Icon and Upload Button */}
        <View className="absolute inset-0 justify-center items-center">
          <MaterialCommunityIcons name="scan-helper" size={100} color="white" />
          <TouchableOpacity 
            className="flex-row items-center bg-white/20 px-5 py-3 rounded-full space-x-2 mt-5"
            onPress={onPickImage}
          >
            <MaterialCommunityIcons name="image-plus" size={24} color="white" />
            <Text className="text-white text-base" style={{ fontFamily: 'Inter_600SemiBold' }}>
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <SafeAreaView className="absolute bottom-0 left-0 right-0">
          <View className="flex-row justify-between items-center px-8 pb-10">
            {/* Flash Toggle */}
            <TouchableOpacity 
              className="w-11 h-11 rounded-full bg-white/20 justify-center items-center"
              onPress={onToggleFlash}
            >
              <MaterialCommunityIcons 
                name={flash === 'on' ? 'flash' : 'flash-off'} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>

            {/* Capture Button */}
            <TouchableOpacity 
              className="w-[70px] h-[70px] rounded-full bg-white/30 justify-center items-center"
              onPress={onCapture}
            >
              <View className="w-[54px] h-[54px] rounded-full bg-white" />
            </TouchableOpacity>

            {/* Camera Flip Button */}
            <TouchableOpacity 
              className="w-11 h-11 rounded-full bg-white/20 justify-center items-center"
              onPress={onToggleFacing}
            >
              <MaterialCommunityIcons 
                name="camera-flip" 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
};

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
      setAnalysis(null);
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
        setAnalysis(null);
      } catch (error) {
        console.error('Error taking picture:', error);
        alert('Failed to take picture');
      }
    }
  };

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

  // Loading state
  if (!permission) {
    return null;
  }

  // Permission not granted
  if (permission.granted) {
    return <PermissionView onRequestPermission={requestPermission} />;
  }

  // Image preview mode
  if (image) {
    return (
      <PreviewView
        image={image}
        onRetake={() => setImage(null)}
        onAnalyze={analyzeImage}
        loading={loading}
        analysis={analysis}
      />
    );
  }

  // Camera mode
  return (
    <CameraViewComponent
      onCapture={handleCapture}
      onPickImage={pickImage}
      flash={flash}
      onToggleFlash={toggleFlash}
      facing={facing}
      onToggleFacing={toggleCameraFacing}
      cameraRef={cameraRef}
    />
  );
} 