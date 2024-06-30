import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ images }) => {
    const flatlistRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);
  
    useEffect(() => {
      let interval = setInterval(() => {
        if (activeIndex === images.length - 1) {
          flatlistRef.current.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else {
          flatlistRef.current.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, 2000);
  
      return () => clearInterval(interval);
    });
  
    const getItemLayout = (data, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index: index,
    });
  
    const renderItem = ({ item, index }) => {
      return (
        <View>
          <Image
            source={{ uri: item }}
            style={{ height: 200, width: screenWidth }}
          />
        </View>
      );
    };
  
    const handleScroll = (event) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = scrollPosition / screenWidth;
      setActiveIndex(index);
    };
  
    const renderDotIndicators = () => {
      return images.map((_, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: index === activeIndex ? "green" : "red",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      });
    };
  
    return (
      <View>
        <FlatList
          data={images}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
        />
  
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {renderDotIndicators()}
        </View>
      </View>
    );
  };
  
  export default Carousel;
  