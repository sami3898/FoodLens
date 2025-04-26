import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
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
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen 
          options={{ 
            headerShown: false
          }} 
        />
        
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={{ 
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
          }}>
            <Text style={{ 
              fontSize: 32,
              fontWeight: '900',
              color: '#000',
            }}>
              FoodLens
            </Text>
          </View>

          {/* Hero Section */}
          <View style={{ 
            padding: 20,
            alignItems: 'center',
            paddingBottom: 60,
          }}>
            <Text style={{ 
              fontSize: 32,
              fontWeight: 'bold',
              color: '#000',
              marginBottom: 10,
              textAlign: 'center'
            }}>
              Smart Food Analysis
            </Text>
            <Text style={{ 
              fontSize: 18,
              color: '#333',
              textAlign: 'center',
              marginBottom: 30,
              paddingHorizontal: 20,
            }}>
              Get instant nutritional information from your food photos using AI
            </Text>
            <Link href="/analyze" asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: '#03080A',
                  paddingVertical: 16,
                  paddingHorizontal: 32,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}>
                <Text style={{ 
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600',
                  marginRight: 10,
                }}>
                  Analyze Food
                </Text>
                <MaterialCommunityIcons name="scan-helper" size={20} color="white" />
              </TouchableOpacity>
            </Link>
          </View>

          {/* Features Section */}
          <View style={{ padding: 20 }}>
            <Text style={{ 
              fontSize: 24,
              fontWeight: '600',
              marginBottom: 20,
              textAlign: 'center',
              color: '#000'
            }}>
              Features
            </Text>
            
            {/* Feature Cards */}
            <View style={{ gap: 15 }}>
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
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 20,
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                  }}>
                  <Text style={{ fontSize: 40 }}>{feature.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 5,
                      color: '#000'
                    }}>
                      {feature.title}
                    </Text>
                    <Text style={{ 
                      color: '#333',
                      lineHeight: 20,
                    }}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}