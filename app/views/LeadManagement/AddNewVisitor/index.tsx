import { View, Text, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AddNewVisitorForm from "./Components/AddNewVisitorForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisitor,
  addVisitorRemove,
  editVisitor,
  getVisitorDetail,
} from "app/Redux/Actions/LeadsActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  GREEN_COLOR,
  RED_COLOR,
  Regexs,
} from "app/components/utilities/constant";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import { getAllProperty } from "app/Redux/Actions/propertyActions";

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const { type, data } = route?.params || {};
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const [formData, setFormData] = useState<any>({
    first_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    birth_date: "",
    mobile: "",
    whatsapp_no: "",
    email: "",
    location: "",
    locality: "",
    configuration_id: "",
    expected_possession_date: "",
    min_budget: "",
    min_budget_type: "L",
    max_budget: "",
    max_budget_type: "L",
    funding_type: "",
    funding_emi_type: "",
    purpose: "",
    occupation: "",
    desigantion: "",
    office_address: "",
    module_id: "",
    property_id: "",
    property_type_title: "",
    min_emi_budget: "",
    min_emi_budget_type: "L",
    max_emi_budget: "",
    max_emi_budget_type: "L",
    areain_sqlft: "",
    coumpany_name: "",
  });
  const [NavigationType, setNavigationType] = useState(0);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [allProperty, setAllProperty] = useState<any>([]);
  const masterData = useSelector((state: any) => state.masterData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const editData = useSelector((state: any) => state.editVisitorData) || {};
  const addData = useSelector((state: any) => state.addVisitorData) || {};

  useEffect(() => {
    if (type === "edit") {
      if (data?._id) {
        dispatch(
          getVisitorDetail({
            lead_id: data._id,
          })
        );
      }
    }
    if (type === "propertySelect") {
      setFormData({
        ...formData,
        property_id: data?._id,
        property_type_title: data?.property_type_title,
        property_title: data?.property_title,
      });
    }
  }, [detail, type]);

  useEffect(() => {
    dispatch(
      getAllMaster({
        type: 2,
      })
    );
  }, []);

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  useEffect(() => {
    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
    getAllPropertyData();
  }, []);

  const getAllPropertyData = () => {
    if (propertyData?.response?.status === 200) {
      setAllProperty(propertyData?.response?.data);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const OnpressseheduleVisit = () => {
    if (validation()) {
      OnpressCreateEdit();
      // navigation.navigate('AddAppointmentForSite', {type: 'visitAppo'})
    }
  };

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      type != "edit" &&
      formData?.property_id === "" &&
      formData?.property_type_title === ""
    ) {
      isError = false;
      errorMessage = "Please select property name";
    } else if (
      formData?.first_name === "" ||
      formData?.first_name === undefined
    ) {
      isError = false;
      errorMessage = "Please fill visitor name";
    } else if (
      formData?.mobile === "" ||
      formData?.mobile === undefined ||
      formData?.mobile?.length > 10
    ) {
      isError = false;
      errorMessage = "Mobile number should be 10 digits";
    } else if (formData?.adhar_no) {
      if (Regexs.AadharRegex.test(formData?.adhar_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Aadhaar number";
      }
    } 
    if (formData?.pancard_no) {
      if (Regexs.panRegex.test(formData?.pancard_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Pancard number";
      }
    } 
    if (formData?.email) {
      if (Regexs.emailRegex.test(formData?.email) === false) {
        isError = false;
        errorMessage = "Please enter valid Email id";
      }
    }
    if (formData?.min_budget && formData.max_budget) {
      let tempMinVal: any;
      formData?.min_budget_type === "K"
        ? (tempMinVal = formData?.min_budget * 1000)
        : formData?.min_budget_type === "L"
        ? (tempMinVal = formData?.min_budget * 100000)
        : formData?.min_budget_type === "Cr"
        ? (tempMinVal = formData?.min_budget * 10000000)
        : null;

      let tempMaxVal: any;
      formData?.max_budget_type === "K"
        ? (tempMaxVal = formData?.max_budget * 1000)
        : formData?.max_budget_type === "L"
        ? (tempMaxVal = formData?.max_budget * 100000)
        : formData?.max_budget_type === "Cr"
        ? (tempMaxVal = formData?.max_budget * 10000000)
        : null;
      console.log("tempMaxVal:", tempMaxVal);
      console.log("tempMinVal: ", tempMinVal);

      if (tempMinVal >= tempMaxVal) {
        isError = false;
        errorMessage = "Maximum budget should more than minumum budget";
      }
    } 
    if (formData?.min_emi_budget && formData.max_emi_budget) {
      let tempMinVal: any;
      formData?.min_emi_budget_type === "K"
        ? (tempMinVal = formData?.min_emi_budget * 1000)
        : formData?.min_emi_budget_type === "L"
        ? (tempMinVal = formData?.min_emi_budget * 100000)
        : formData?.min_emi_budget_type === "Cr"
        ? (tempMinVal = formData?.min_emi_budget * 10000000)
        : null;

      let tempMaxVal: any;
      formData?.max_emi_budget_type === "K"
        ? (tempMaxVal = formData?.max_emi_budget * 1000)
        : formData?.max_emi_budget_type === "L"
        ? (tempMaxVal = formData?.max_emi_budget * 100000)
        : formData?.max_emi_budget_type === "Cr"
        ? (tempMaxVal = formData?.max_emi_budget * 10000000)
        : null;
      console.log("tempMaxVal:", tempMaxVal);
      console.log("tempMinVal: ", tempMinVal);

      if (tempMinVal >= tempMaxVal) {
        isError = false;
        errorMessage = "Maximum Emi should more than minumum Emi";
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addVisitorRemove());
      if (NavigationType === 1) {
        setNavigationType(0);
        navigation.navigate("LeadManagementScreen");
      } else if (NavigationType === 2) {
        setNavigationType(0);
        navigation.navigate("AddAppointmentForSite", {
          type: "Add",
          item: {
            _id: addData?.response?.data?._id
              ? addData?.response?.data?._id
              : "",
            customer_first_name: addData?.response?.data?.customer?.first_name
              ? addData?.response?.data?.customer?.first_name
              : "",
            property_id: addData?.response?.data?.property_id
              ? addData?.response?.data?.property_id
              : "",
            property_title: data?.property_title ? data?.property_title : "",
            pickup: data?.pickup,
          },
        });
      }
      ErrorMessage({
        msg: editData?.update
          ? editData?.response?.message
          : addData?.create
          ? addData?.response?.message
          : "no message",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData, addData]);
  const OnpressCreateEdit = () => {
    if (validation()) {
      if (type === "edit") {
        const edit_params = {
          lead_id: formData?.lead_id,
          first_name: formData?.first_name,
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData?.address,
          location: formData?.location,
          latitude: formData?.latitude,
          longitude: formData?.longitude,
          city: formData?.city,
          occupation: formData?.occupation,
          coumpany_name: formData?.coumpany_name,
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration,
          areain_sqlft: formData?.areain_sqlft,
          income: formData?.income,
          budget: formData?.max_budget
            ? formData?.max_budget
            : formData?.budget && "",
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          whenby: formData?.whenby,
          agent_code: formData?.agent_code, //not in add time
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: formData?.funding_emi_type,
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: "",
          min_emi_budget: formData?.min_emi_budget
            ? formData.min_emi_budget
            : "",
          min_emi_budget_type: formData?.min_emi_budget_type
            ? formData?.min_emi_budget_type
            : "",
          max_emi_budget: formData?.max_emi_budget
            ? formData?.max_emi_budget
            : "",
          max_emi_budget_type: formData?.max_emi_budget_type
            ? formData?.max_emi_budget_type
            : "",
          locality: formData?.locality,
        };
        dispatch(editVisitor(edit_params));
      } else {
        const add_params = {
          first_name: formData?.first_name,
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData.location,
          location: formData?.location,
          latitude: "",
          longitude: "",
          city: formData?.location,
          occupation: formData?.occupation,
          coumpany_name: formData?.coumpany_name,
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration ?? "",
          areain_sqlft: formData?.areain_sqlft,
          budget: formData.max_budget,
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: "",
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: formData.property_type_title,
          min_emi_budget: formData?.min_emi_budget
            ? formData?.min_emi_budget
            : "",
          min_emi_budget_type: formData?.min_emi_budget_type
            ? formData?.min_emi_budget_type
            : "",
          max_emi_budget: formData?.max_emi_budget
            ? formData?.max_emi_budget
            : "",
          max_emi_budget_type: formData?.max_emi_budget_type
            ? formData?.max_emi_budget_type
            : "",
          locality: formData?.locality,
        };
        dispatch(addVisitor(add_params));
      }
    }
  };

  return (
    <AddNewVisitorForm
      handleBackPress={handleBackPress}
      OnpressseheduleVisit={OnpressseheduleVisit}
      OnpressCreateEdit={OnpressCreateEdit}
      type={type}
      formData={formData}
      setFormData={setFormData}
      // handleMasterDatas={handleMasterDatas}
      masterDatas={masterDatas}
      // handleProperty={handleProperty}
      allProperty={allProperty}
      setNavigationType={setNavigationType}
    />
  );
};

export default AddNewVisitorScreen;

// lead_id: '',/////
// first_name: '',
// last_name: '',////
// address: '',////
// latitude: '',////
// longitude: '',////
// city: '',////
// coumpany_name: '',////
// configuration_id: '',////
// areain_sqlft: '',////
// income: '',////
// budget: '',///
// whenby: '',////
// agent_code: '',////
// min_budget_type: '',///
// max_budget_type: '',////
