import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import images from 'app/assets/images'
import Header from 'app/components/Header'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from 'app/components/utilities/constant'
import FastImages from 'app/components/FastImage'
import Video from "react-native-video";
import Button from 'app/components/Button'
import Loader from 'app/components/CommonScreen/Loader'
const ContentView = (props: any) => {
    const [playPause, setPlayPause] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <>
            {props.Visible ?
                <View style={styles.contentVw}>
                    <Header
                        leftImageSrc={images.backArrow}
                        headerText={strings.supportforumDtlHeader}
                        handleOnLeftIconPress={() => {
                            props.setIsVisible(false)
                            props.setContentData({})
                        }}
                        headerStyle={styles.headerStyle}
                        RightSecondIconStyle={styles.RightFirstIconStyle}
                        leftImageIconStyle={styles.RightFirstIconStyle}
                        statusBarColor={PRIMARY_THEME_COLOR}
                        barStyle={'light-content'}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {loading ? <Loader /> : null}
                        {props?.contentData?.content_type === 'video' ?
                            <View style={{ width: '100%' }}>
                                <Video
                                    source={{ uri: props?.url + props?.contentData?.content }}
                                    poster={props?.url + props?.contentData?.video_thumbnail}
                                    repeat
                                    onReadyForDisplay={() => {
                                        setLoading(false)
                                    }}
                                    onLoad={() => {setLoading(true)}}
                                    paused={playPause}
                                    selectedVideoTrack={{
                                        type: 'resolution',
                                        value: 480
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        height: '90%',
                                        width: '95%',
                                        alignSelf: 'center'
                                    }}
                                />
                                <View style={[styles.playbtntch, {
                                    top: '40%'
                                }]}>
                                    <Button width={50}
                                        handleBtnPress={() => setPlayPause(!playPause)}
                                        buttonText={playPause ?
                                            strings.playVideo : strings.pauseVideo}
                                    />
                                </View>
                            </View>
                            :
                            <FastImages
                                source={{ uri: props?.url + props?.contentData?.content }}
                                style={styles.contentImgs}
                                resizeMode={'contain'}
                            />
                        }
                    </View>
                </View>
                : null
            }
        </>
    )
}

export default ContentView
