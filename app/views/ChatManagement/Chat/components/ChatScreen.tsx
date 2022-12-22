import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import {
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
} from "app/components/utilities/constant";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import DocumentPicker from "react-native-document-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/database";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const ChatScreen = ({ navigation, route }: any) => {
  const item = route.params || {};
  const isFocused = useIsFocused();
  const [keys, setkeys] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [senderID, setSenderID] = useState<any>("");
  const [pickerVisible, setPickerVisible] = useState<any>();

  useEffect(() => {
    setMessages([
      // {
      //   _id: 1222,
      //   text: "Hello developer",
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1222222,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any",
      //   },
      // },
      // {
      //   _id: 22222,
      //   text: "hell0 surendra",
      //   createdAt: new Date(),
      //   user: {
      //     _id: senderID,
      //     name: "React Native",
      //     avatar: "https://placeimg.com/140/140/any",
      //   },
      // },
    ]);
  }, []);

  useEffect(() => {
    getMsgList();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const groupedDays = (chatListData: any) => {
    return chatListData.reduce((acc: any, el: any, i: any): any => {
      const messageDay = moment(el.createdAt).format("YYYY-MM-DD");
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  };

  const generateItems = (chatListData: any) => {
    const days: any = groupedDays(chatListData);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, "YYYY-MM-DD").unix() - moment(x, "YYYY-MM-DD").unix()
    );
    const item: any = sortedDays.reduce((acc: any, date: any) => {
      const sortedMessages: any = days[date].sort(
        (x: any, y: any) => +new Date(y.createdAt) - +new Date(x.createdAt)
      );
      return acc.concat([...sortedMessages, { type: "day", date, id: date }]);
    }, []);
    return item;
  };

  const getMsgList = async () => {
    await AsyncStorage.setItem("isNotification", "2");
    const asyncSenderID: any = await AsyncStorage.getItem("firebase_id");
    const senderID: any = JSON.parse(asyncSenderID);
    setSenderID(senderID);
    console.log("kkkkkkkk", senderID > item?.firebase_id);
    console.log(
      "========>>>>>>",
      senderID > item?.firebase_id
        ? senderID + "-" + item?.firebase_id
        : item?.firebase_id + "-" + senderID
    );

    await firebase
      .app()
      .database(apiEndPoints.FIREBASE_DATABASE_URL)
      .ref(
        senderID > item?.firebase_id
          ? senderID + "-" + item?.firebase_id
          : item?.firebase_id + "-" + senderID
      )
      // .limitToLast(10)
      .on("value", async (snapshot: any) => {
        console.log("snapshot: ", snapshot);
        if (snapshot?.val()) {
          var copy: any = Object.keys(snapshot?.val());
          setkeys(copy);
          // ReadMsg(Object.values(snapshot?.val()));
          const message_array: any = [];
          await snapshot.forEach((childSnapshot: any) => {
            message_array.push({
              msgId: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          console.log("message_array: ", message_array);
          const msgArray = generateItems(
            message_array.filter((i: any) => i?.["delete-" + senderID] == false)
          );
          console.log("msgArray: ", msgArray);

          const finalChatArray = msgArray.map((item: any) => {
            console.log("TYPEOF senderID: ", typeof senderID);

            console.log("item: ", item);
            return {
              _id: item?.msgId,
              text: item?.text,
              createdAt: new Date(),
              user: {
                _id: item?._id,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            };
          });
          // setMessages((previousMessages: any) =>
          //   GiftedChat.append(previousMessages, finalChatArray)
          // );
          setMessages(finalChatArray);
        }
        //  else {
        //   setIsLoadMore(false);
        // }
      });
  };

  const _handleChatSend = async (msg: any) => {
    const asyncSenderID: any = await AsyncStorage.getItem("firebase_id");
    const senderID: any = JSON.parse(asyncSenderID);
    setSenderID(senderID);
    console.log("senderID: ", senderID);
    const params = {
      createdAt: new Date().toISOString(),
      text: msg.trim(),
      senderUserId: senderID,
      recevierID: item?.firebase_id,
      _id: senderID,
      // firstName: item?.firstName,
      ["isRead-" + senderID]: true,
      ["isRead-" + item?.firebase_id]: false,
      isDelete: false,
      ["delete-" + senderID]: false,
      ["delete-" + item?.firebase_id]: false,
      // replyMessage: replyMessage,
      // replyOnEvent: replyOnEvent,
    };
    // ref?.current?.scrollToOffset({animated: true, y: 0});
    await firebase
      .app()
      .database(apiEndPoints.FIREBASE_DATABASE_URL)
      .ref(
        senderID > item?.firebase_id
          ? senderID + "-" + item?.firebase_id
          : item?.firebase_id + "-" + senderID
      )
      .push()
      .set(params)
      .then((ref) => {
        // setReplyOnEvent("");
        // setReplyMessage(null);
        console.log("ref: ", ref);
      });
  };

  const onSend = useCallback((messages: any) => {
    // setMessages((previousMessages: any) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    _handleChatSend(messages[0]?.text);
  }, []);

  const renderMessage = (data: any) => {
    return (
      <View style={{ backgroundColor: "red" }}>
        <Text>kskjdvj</Text>
      </View>
    );
  };
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderTopRightRadius: 15,
            backgroundColor: PRIMARY_THEME_COLOR,
            // marginBottom: 30,
          },
          left: {
            borderTopLeftRadius: 15,
            backgroundColor: WHITE_COLOR,
            // marginBottom: 30,
          },
        }}
        // containerToPreviousStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        // containerToNextStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        // containerStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },

        // }}
      />
    );
  };
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendIconView}>
          <Image
            source={images.send}
            resizeMode={"contain"}
            style={styles.sendImage}
          />
        </View>
      </Send>
    );
  };

  const handleAttachPress = async () => {
    const result = await DocumentPicker.pick();
    setMessages([
      {
        image: result[0].uri,
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      ...messages,
    ]);
    // setMessages((previousMessages: any) =>
    //   GiftedChat.append(previousMessages,[...messages, {image: result[0].uri, user: {
    //     _id: 1,
    //     name: "React Native",
    //     avatar: "https://placeimg.com/140/140/any",
    //   }}])
    // );
    renderMessage(result);
  };
  const renderComposer = (props: any) => {
    return (
      <View style={styles.attachIconView}>
        <Composer {...props} />
        <TouchableOpacity onPress={() => handleAttachPress()}>
          <Image
            source={images.attach}
            // resizeMode={"contain"}
            style={styles.attachIconImage}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={(messages: any) => onSend(messages)}>
          <Image
            source={images.send}
            // resizeMode={"contain"}
            style={styles.attachIconImage}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderImageMessage = (data: any) => {
    return (
      <View>
        <Image />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        headerText={item.user_name}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: senderID,
        }}
        alwaysShowSend
        showUserAvatar
        renderBubble={(data: any) => renderBubble(data)}
        // renderMessageImage={(props: any) => {
        //   return renderImageMessage(props)
        //   // return (
        //   //   <Image source={images.agency} style={{height: 30, width: 30}}/>
        //   // );
        // }}
        renderInputToolbar={(props: any) => {
          return (
            <InputToolbar
              primaryStyle={styles.chatPrimaryInputStyle}
              containerStyle={styles.chatContainerInputStyle}
              {...props}
            />
          );
        }}
        maxComposerHeight={100}
        renderSend={renderSend}
        renderComposer={renderComposer}
      />
    </View>
  );
};

export default ChatScreen;
