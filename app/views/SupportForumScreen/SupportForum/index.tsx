import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupportForumView from "./components/SupportForumView";
import Share from "react-native-share";
import { supportForumListData } from "app/Redux/Actions/SupportForumAction";
import RNFetchBlob from "rn-fetch-blob";

const SupportForumScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.supportForumData) || {};
  const moreData = response?.total_data || 0;
  const [supportForumList, setSupportForumList] = useState<any>([]);
  const [mediaArr, setMediaArr] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [filterData, setFilterData] = useState({
    search_title: "",
    start_date: "",
    end_date: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      getSupportForums(0, {});
      return () => {};
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setSupportForumList(response?.data);
      } else {
        setSupportForumList([...supportForumList, ...response?.data]);
      }
    }
  }, [response]);
  const getSupportForums = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      supportForumListData({
        search_title: data?.search_title ? data?.search_title : "",
        start_date: data?.start_date ? data?.start_date : "",
        end_date: data?.end_date ? data?.end_date : "",
        limit: 4,
        offset: offset,
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const onPressView = (data: any) => {
    navigation.navigate("SupportForumDetail", data);
  };
  const onPressShare = async (data: any) => {
    console.log("data: ", data);
    const fs = RNFetchBlob.fs;
    const mediaUrls = data?.document.map((item: any) => {
      return `${data?.base_url}${item?.content}`;
    });
    console.log("mediaUrls: ", mediaUrls);
    
    const finalUrls = mediaUrls.map((url: any) => {
      console.log("url: ", url);
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          console.log("imagePath: ", imagePath);
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          // here's base64 encoded image
          // console.log(`data:image/png;base64,${base64Data}`);
          // mediaArr.push();
          // return JSON.stringify(base64Data);
          // remove the file from storage
          let newArr: any = [];
          await newArr.push(`data:image/png;base64,${base64Data}`)
          setMediaArr(newArr)
          // return fs.unlink(imagePath);
        });
      });
      console.log('data?.title: ', data?.title);
      console.log("mediaArr ", mediaArr);
    console.log("finalUrls: ", finalUrls);

    const options = {
      title: `${data?.title}`,
      urls: mediaArr,
    };
    const shareResponse = await Share.open(options);
  };
  return (
    <SupportForumView
      handleDrawerPress={handleDrawerPress}
      supportForumList={supportForumList}
      filterData={filterData}
      setFilterData={setFilterData}
      getSupportForums={getSupportForums}
      onPressView={onPressView}
      onPressShare={onPressShare}
      offSET={offSET}
      moreData={moreData}
    />
  );
};

export default SupportForumScreen;
