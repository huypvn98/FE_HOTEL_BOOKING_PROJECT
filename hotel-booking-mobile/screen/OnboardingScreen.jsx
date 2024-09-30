import React from "react";
import { SafeAreaView, Image, StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WellcomeScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const slides = [
    {
      id: 1,
      image: require("../assets/hotel-presidente-4s.jpg"),
      title: "Easy way to book hotels with us",
      description: "It is a long established fact that a reader will be distracted by the readable content.",
    },
    {
      id: 2,
      image: require("../assets/184305239.jpg"),
      title: "Discover and find your perfect healing place",
      description: "Find your perfect place to heal your mind and soul",
    },
    {
      id: 3,
      image: require("../assets/Mobile-NWHBR-Exterior.jpg"),
      title: "Giving the best deal just for you",
      description: "We provide the best deal for you to stay in our hotel",
    }
  ];

  const Slide = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <Image
          source={item?.image}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        {/* Indicator */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: '#4a90e2',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        {/* Buttons */}
        {currentSlideIndex == slides.length - 1 ? (
          <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Login')}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, styles.transparentBtn]} onPress={skip}>
              <Text style={[styles.btnText, styles.transparentBtnText]}>Skip</Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity style={styles.btn} onPress={goToNextSlide}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={ref}
        data={slides}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slideContainer: {
    alignItems: 'center',
    width,
  },
  image: {
    height: '60%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
  footer: {
    height: height * 0.2,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  transparentBtn: {
    backgroundColor: 'transparent',
  },
  transparentBtnText: {
    color: '#4a90e2',
  },
});
