import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LeadManagementView from "./Components/LeadManagementView";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getAllLeadsList } from "app/Redux/Actions/LeadsActions";

const LeadManagementScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.visitorDataList
  );
  const moreData = response?.total_data || 0;
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_visisor_name: "",
    search_configuration: "",
    visit_score: "",
    property_id: '',
    property_type_title: '',
    property_title: ''
  });
  const [visitorList, setVisiitorList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getVisitorsList(0, {});
      return () => {};
    }, [navigation, list])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setVisiitorList(response?.data);
      } else {
        setVisiitorList([...visitorList, ...response?.data]);
      }
    } else {
      setVisiitorList([]);
    }
  }, [response]);

  const getVisitorsList = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getAllLeadsList({
        offset: offset,
        limit: 3,
        start_date: data?.startdate ? data?.startdate : "",
        end_date: data?.enddate ? data?.enddate : "",
        search_by_visisor_name: data?.search_by_visisor_name
          ? data?.search_by_visisor_name
          : "",
        search_configuration: data?.search_configuration
          ? data?.search_configuration
          : "",
        visit_score: data?.visit_score ? data?.visit_score : "",
        property_id: data?.property_id ? data?.property_id : "",
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <LeadManagementView
      handleDrawerPress={handleDrawerPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      filterData={filterData}
      setFilterData={setFilterData}
      setVisiitorList={setVisiitorList}
      offSET={offSET}
    />
  );
};

export default LeadManagementScreen;