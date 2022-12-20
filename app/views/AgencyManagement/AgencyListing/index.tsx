import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";
import {
  AgencyCreateFormRemove,
  getAllAgentList,
} from "app/Redux/Actions/AgencyActions";
import {
  getAssignCPList,
  removeAssignCpStatus,
  updateAssignCP,
} from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgencyView from "./components/AgencyView";

const AgencyListing = ({ navigation }: any) => {
  const { response = {}, list = false } =
    useSelector((state: any) => state.agentData) || [];
  const statusUpdate = useSelector((state: any) => state.agencyStatus) || {};
  const SmCpList = useSelector((state: any) => state.SourcingManager) || [];
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const moreData = response?.total_data || 0;
  const [agentList, setAgentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_name: "",
    search_by_location: "",
    status: "",
  });
  const [changeStatus, setChangeStatus] = useState({});
  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getAgencyList(offSET, {});
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    setAgentList(SmCpList?.response?.data);
  }, [SmCpList]);

  const getAgencyList = (offset: any, filterData: any) => {
  console.log('filterData: ', filterData);
    setOffset(offset);
    // if (userData?.data?.role_title === 'Sourcing Manager') {
    dispatch(
      getAssignCPList({
        user_id: userData?.data?.user_id,
        startdate: filterData.startdate,
        enddate: filterData.enddate,
        search_by_name: filterData.search_by_name,
        search_by_location: filterData.search_by_location,
        status: filterData.status,
      })
    );
  };

  useEffect(() => {
    if (statusUpdate?.response?.status === 200) {
      ErrorMessage({
        msg: statusUpdate?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      dispatch(removeAssignCpStatus());
      getAgencyList(offSET, {});
    }
  }, [statusUpdate]);
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleStatusChange = (item: any) => {
    dispatch(
      updateAssignCP({
        user_id: item?._id,
        status: 2,
      })
    );
  };
  const onPressView = (data: any, type: any) => {
    if (type === "edit") {
      navigation.navigate("AddnewAgency", { type, data });
    } else {
      if (type === "view") {
        navigation.navigate("AgencyDetails", { data });
      }
    }
  };
  const onPressDeactivates = (data: any, type: any) => {
    navigation.navigate("DeactiveAgency", { data });
  };
  const Onreachedend = (offSet: any) => {
    setOffset(offSet);
    dispatch(
      getAllAgentList({
        offset: offSet,
        limit: 3,
        module_id: "",
        start_date: filterData.startdate,
        end_date: filterData.enddate,
        user_type: 2,
        search_by_name: filterData.search_by_name,
        search_by_location: filterData.search_by_location,
        status: filterData.status,
      })
    );
  };
  return (
    <AgencyView
      handleDrawerPress={handleDrawerPress}
      setChangeStatus={setChangeStatus}
      changeStatus={changeStatus}
      handleStatusChange={handleStatusChange}
      setFilterData={setFilterData}
      filterData={filterData}
      onPressView={onPressView}
      agentList={agentList}
      Onreachedend={Onreachedend}
      offSET={offSET}
      moreData={moreData}
      getAgencyList={getAgencyList}
      setOffset={setOffset}
      setAgentList={setAgentList}
      onPressDeactivates={onPressDeactivates}
    />
  );
};

export default AgencyListing;
