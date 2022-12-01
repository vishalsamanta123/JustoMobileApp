import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import FollowUpView from "./Components/FollowUpView";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "app/components/CommonScreen/Loader";
import { getAllFollowUpList } from "app/Redux/Actions/FollowUpActions";

const FollowUpScreen = ({ navigation }: any) => {
  const [filter, setFilter] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [followUpList, setFollowUpList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.followUp
  );
  console.log("response: followUp", response);
  const moreData = response?.total_data || 0;
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_visisor_name: "",
    search_configuration: "",
    visit_score: "",
  });
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  useFocusEffect(
    React.useCallback(() => {
      getFollowupList(offSET, []);
      return () => {};
    }, [navigation, list])
  );
  useEffect(() => {
    if (list) {
      setIsloading(false);
      if (offSET == 0 || offSET == undefined) {
        setFollowUpList(response?.data);
      } else {
        setFollowUpList([...followUpList, ...response?.data]);
      }
    }
  }, [response]);

  const getFollowupList = (offset: any, array: any) => {
    setIsloading(true);
    setOffset(offset);
    dispatch(
      getAllFollowUpList({
        offset: offset,
        limit: 3,
        start_date: filterData.startdate,
        end_date: filterData.enddate,
        search_by_visisor_name: filterData.search_by_visisor_name,
        search_configuration: filterData.search_configuration,
        visit_score: filterData.visit_score,
      })
    );
    // toGetDatas(array)
  };
  const toGetDatas = (array: any) => {};
  return (
    <>
      {isloading ? <Loader /> : null}
      <FollowUpView
        handleDrawerPress={handleDrawerPress}
        getFollowupList={getFollowupList}
        setFilterData={setFilterData}
        offSET={offSET}
        setFollowUpList={setFollowUpList}
        followUpList={followUpList}
        moreData={moreData}
        filterData={filterData}
      />
    </>
  );
};

export default FollowUpScreen;
