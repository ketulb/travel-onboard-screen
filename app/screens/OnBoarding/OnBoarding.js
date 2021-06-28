import React from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native'

import { images, theme } from '../../constants';
const { onboarding1, onboarding2, onboarding3 } = images;
const { COLORS, FONTS, SIZES } = theme;

const onBoardings =  [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding3
    }
];

const OnBoarding = () => {

    const [completed, setCompleted] = React.useState(false);
    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1 ) {
                setCompleted(true);
            }
        });

        return () => scrollX.removeListener(); 
    }, []);
    // render
    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item ,index) => {
                    <View
                        key={index}
                        style={{ width: SIZES.width}}
                    >
                        {/* image */}
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={item.img}
                                resizeMethod='cover'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </View>

                        {/* text */}
                        <View 
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: 40,
                                right: 40 
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.gray,
                                    textAlign: 'center'
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    textAlign: 'center',
                                    marginTop: SIZES.base,
                                    color: COLORS.gray
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>

                        {/* Button */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 150,
                                height: 60,
                                backgroundColor: COLORS.blue,
                                justifyContent: 'center',
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                paddingLeft: 20
                            }}
                            onPress={() => { console.log('Button on Pressed ')}}
                        >
                            <Text style={{ ...FONTS.h1, color: COLORS.white }}>{ completed ? "Let's Go" : "Skip"}</Text>
                        </TouchableOpacity>
                    </View>
                    
                })}
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return(
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index-1, index, index+1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index-1, index, index+1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: 'clamp'
                    }); 

                    return(
                        <Animated.View
                            key={`dot-{index}`}
                            style={[ styles.dot, { width: dotSize, height: dotSize }]}
                            opacity={opacity}
                        >

                        </Animated.View>
                    )
                })}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },

    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius/2
    },

    dotContainer: {
        flexDirection: 'row',
        height: SIZES.padding,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dotsRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '20%' : '16%',
    },

})

export default OnBoarding;