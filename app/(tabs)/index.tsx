import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Stack, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  
  return (
    <LinearGradient
      colors={['#7fff6c', 'rgba(127, 255, 108, 0.3)', '#ffffff']}
      locations={[0.4, 0.5, 0.6]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <Stack.Screen 
          options={{ 
            headerShown: false
          }} 
        />
        
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View className="px-5 pt-5 pb-2.5">
            <Text className="text-3xl text-black" style={{ fontFamily: 'Inter_900Black' }}>
              FoodLens
            </Text>
          </View>

          {/* Hero Section */}
          <View className="p-5 items-center pb-[60px]">
            <Text className="text-3xl text-black mb-2.5 text-center" style={{ fontFamily: 'Inter_700Bold' }}>
              Smart Food Analysis
            </Text>
            <Text className="text-lg text-gray-700 text-center mb-8 px-5" style={{ fontFamily: 'Inter_400Regular' }}>
              Get instant nutritional information from your food photos using AI
            </Text>
            <Link href="/analyze" asChild>
              <TouchableOpacity className="bg-[#03080A] py-4 px-8 rounded-full flex-row items-center gap-2 shadow-lg">
                <Text className="text-white text-lg mr-2.5" style={{ fontFamily: 'Inter_600SemiBold' }}>
                  Analyze Food
                </Text>
                <MaterialCommunityIcons name="scan-helper" size={20} color="white" />
              </TouchableOpacity>
            </Link>
          </View>

          {/* Features Section */}
          <View className="p-5">
            <Text className="text-2xl mb-5 text-center text-black" style={{ fontFamily: 'Inter_600SemiBold' }}>
              Features
            </Text>
            
            {/* Feature Cards */}
            <View className="gap-4">
              {[
                {
                  title: 'Instant Analysis',
                  description: 'Get detailed nutritional information in seconds using advanced AI',
                  icon: '🔍'
                },
                {
                  title: 'Comprehensive Data',
                  description: 'Calories, macros, portion sizes, and more for any food',
                  icon: '📊'
                },
                {
                  title: 'Easy to Use',
                  description: 'Just take a photo or upload an existing one from your gallery',
                  icon: '📸'
                },
                {
                  title: 'Dietary Info',
                  description: 'Identify allergens and dietary preferences automatically',
                  icon: '🥗'
                }
              ].map((feature, index) => (
                <View
                  key={index}
                  className="bg-white/90 p-5 rounded-2xl flex-row items-center gap-4 shadow-md mb-3"
                >
                  <Text className="text-4xl">{feature.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-lg mb-1 text-black" style={{ fontFamily: 'Inter_600SemiBold' }}>
                      {feature.title}
                    </Text>
                    <Text className="text-gray-700 leading-5" style={{ fontFamily: 'Inter_400Regular' }}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}