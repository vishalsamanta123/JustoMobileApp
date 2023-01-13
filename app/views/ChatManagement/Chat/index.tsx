import { useIsFocused } from "@react-navigation/native";
import { getAllUserChatList } from "app/Redux/Actions/ChatActions";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatView from "./components/ChatView";

const ChatViewScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();


  const { response = {},  } = useSelector((state: any) => state.chatData);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllUserChatList({
        limit: 100,
        offset: 0
    }))
}, [navigation, isFocused])

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <ChatView chatlist={response?.data} handleDrawerPress={handleDrawerPress} />
    </>
  );
};

export default ChatViewScreen;
