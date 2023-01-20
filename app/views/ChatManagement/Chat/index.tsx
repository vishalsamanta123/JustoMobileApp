import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  getAllUserChatList,
  getRecentChatList,
} from "app/Redux/Actions/ChatActions";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatView from "./components/ChatView";

const ChatViewScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const { response = {} } = useSelector(
    (state: any) => state.recentChatListData
  );
  console.log("response: recentChatListData", response);

  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRecentChatList({}));
      return () => {};
    }, [navigation])
  );

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <ChatView
        chatlist={response?.data}
        handleDrawerPress={handleDrawerPress}
      />
    </>
  );
};

export default ChatViewScreen;
