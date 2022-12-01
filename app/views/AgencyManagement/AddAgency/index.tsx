import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";
import {
  AgencyCreateForm,
  AgencyCreateFormRemove,
  createAgency,
  editAgent,
  getAgencyDetail,
} from "app/Redux/Actions/AgencyActions";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "../../../components/Modals/PicturePicker";
import AgentBankInfo from "./components/AgencyBankInfo";
import AgentBasicInfoView from "./components/AgentBasicInfoView";
import CompanyDetails from "./components/CompanyDetails";

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { type, data } = route.params;

  const dispatch: any = useDispatch();
  const [formType, setFormType] = useState(0);
  const { userData = {} } = useSelector((state: any) => state.userData);

  const [agencyData, setAgencyData] = useState({
    profile_picture: { uri: "" },
    owner_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    date_of_birth: "",
    primary_mobile: "",
    whatsapp_number: "",
    email: "",
    working_location: [],
    rera_certificate_no: "",
    rera_certificate: { uri: "" },
    propidership_declaration_letter: { uri: "" },
    cancel_cheaque: "",
    bank_name: "",
    branch_name: "",
    account_no: "",
    ifsc_code: "",
    gst: "",
    company_pancard: "",
    declaration_letter_of_company: { uri: "" },
    rera_registration: "",
    company_bank_name: "",
    company_branch_name: "",
    company_account_no: "",
    company_ifsc_code: "",
    _id: "",
  });
  console.log("agencyDataagencyData", agencyData);

  const [imagePicker, setImagePicker] = useState(false);
  const [locationModel, setLocationModel] = useState(false);

  const registrationData = useSelector((state: any) => state.agencyForm);
  const { response = {}, detail } = useSelector((state: any) => state.agency);

  useEffect(() => {
    if (type === "edit") {
      if (response?.status === 200) {
        setAgencyData({
          ...response?.data[0],
          bank_name: response?.data[0]?.cp_bank_detail?.bank_name,
          branch_name: response?.data[0]?.cp_bank_detail?.branch_name,
          account_no: response?.data[0]?.cp_bank_detail?.account_no,
          ifsc_code: response?.data[0]?.cp_bank_detail?.ifsc_code,
        });
      }
      // setAgencyData({ ...registrationData.response, sourcing_manager: userData?.data?._id })
    }
  }, [navigation, response]);

  useLayoutEffect(() => {
    const { data = {} } = route?.params;
    if (data._id) {
      dispatch(
        getAgencyDetail({
          cp_id: data._id,
        })
      );
    }
  }, [navigation, detail]);
  // useEffect(() => {
  //   if (detail) {
  //     setAgencyData(response?.data[0]);
  //   }
  // }, [response]);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (formType === 0) {
      if (agencyData.owner_name == undefined || agencyData.owner_name == "") {
        isError = false;
        errorMessage = "Agent Name is require. Please enter Agent Name";
      } else if (
        agencyData.adhar_no == undefined ||
        agencyData.adhar_no == ""
      ) {
        isError = false;
        errorMessage = "Adhar No. is require. Please enter Adhar No.";
      } else if (
        agencyData.pancard_no == undefined ||
        agencyData.pancard_no == ""
      ) {
        isError = false;
        errorMessage = "Pancard No. is require. Please enter Pancard No.";
      } else if (agencyData.gender == undefined || agencyData.gender == "") {
        isError = false;
        errorMessage = "Gender is require. Please enter Gender";
      } else if (
        agencyData.date_of_birth == undefined ||
        agencyData.date_of_birth == ""
      ) {
        isError = false;
        errorMessage = "Date of Birth is require. Please enter Date of Birth";
      } else if (
        agencyData.primary_mobile == undefined ||
        agencyData.primary_mobile == ""
      ) {
        isError = false;
        errorMessage = "Mobile No. is require. Please enter Mobile No.";
      } else if (
        agencyData.whatsapp_number == undefined ||
        agencyData.whatsapp_number == ""
      ) {
        isError = false;
        errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No.";
      } else if (agencyData.email == undefined || agencyData.email == "") {
        isError = false;
        errorMessage = "Email is require. Please enter Email";
      } else if (
        agencyData.working_location.length === 0 ||
        agencyData.working_location === undefined
      ) {
        isError = false;
        errorMessage =
          "Working Location is require. Please enter Working Location";
      }
    }
    if (formType === 1) {
      if (
        agencyData.rera_certificate_no == "" ||
        agencyData.rera_certificate_no == undefined
      ) {
        isError = false;
        errorMessage =
          "Rera Certificate No. is require. Please enter Rera Certificate No.";
      } else if (
        agencyData.rera_certificate?.uri == "" ||
        agencyData.rera_certificate?.uri == undefined
      ) {
        isError = false;
        errorMessage =
          "Rera Certificate Image is require. Please Choose Rera Certificate Image";
      } else if (
        agencyData?.propidership_declaration_letter?.uri == "" ||
        agencyData.propidership_declaration_letter?.uri == undefined
      ) {
        isError = false;
        errorMessage =
          "Propidership Declaration Letter Image is require. Please Choose Propidership Declaration Letter Image";
      } else if (
        agencyData.cancel_cheaque == "" ||
        agencyData.cancel_cheaque == undefined
      ) {
        isError = false;
        errorMessage =
          "Cancel Cheaque Image is require. Please Choose Cancel Cheaque Image";
      } else if (
        agencyData.bank_name == "" ||
        agencyData.bank_name == undefined
      ) {
        isError = false;
        errorMessage = "Bank Name is require. Please enter Bank Name";
      } else if (
        agencyData.branch_name == "" ||
        agencyData.branch_name == undefined
      ) {
        isError = false;
        errorMessage = "Branch Name is require. Please enter Branch Name";
      } else if (
        agencyData.account_no == "" ||
        agencyData.account_no == undefined
      ) {
        isError = false;
        errorMessage = "Account No. is require. Please enter Account No.";
      } else if (
        agencyData.ifsc_code == "" ||
        agencyData.ifsc_code == undefined
      ) {
        isError = false;
        errorMessage = "IFSC Code is require. Please enter IFSC Code";
      }
    }
    if (formType === 2) {
      if (agencyData.owner_name == "" || agencyData.owner_name == undefined) {
        isError = false;
        errorMessage = "Agency Name is require. Please enter Agency Name";
      } else if (agencyData.gst == "" || agencyData.gst == undefined) {
        isError = false;
        errorMessage = "GST No. is require. Please enter GST No.";
      } else if (
        agencyData.company_pancard == "" ||
        agencyData.company_pancard == undefined
      ) {
        isError = false;
        errorMessage =
          "Company pancard Image is require. Please Choose Company pancard";
      } else if (
        agencyData.declaration_letter_of_company?.uri == "" ||
        agencyData.declaration_letter_of_company?.uri == undefined
      ) {
        isError = false;
        errorMessage =
          "Declaration letter of company Image is require. Please Choose Declaration letter of company";
      } else if (
        agencyData.rera_registration == "" ||
        agencyData.rera_registration == undefined
      ) {
        isError = false;
        errorMessage =
          "Rera Registration is require. Please enter Rera Registration";
      } else if (
        agencyData.company_bank_name == "" ||
        agencyData.company_bank_name == undefined
      ) {
        isError = false;
        errorMessage = "Bank Name is require. Please enter Bank Name";
      } else if (
        agencyData.company_branch_name == "" ||
        agencyData.company_branch_name == undefined
      ) {
        isError = false;
        errorMessage = "Branch Name is require. Please enter Branch Name";
      } else if (
        agencyData.company_account_no == "" ||
        agencyData.company_account_no == undefined
      ) {
        isError = false;
        errorMessage = "Account No. is require. Please enter Account No.";
      } else if (
        agencyData.company_ifsc_code == "" ||
        agencyData.company_ifsc_code == undefined
      ) {
        isError = false;
        errorMessage = "IFSC Code is require. Please enter IFSC Code";
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    // console.log('isError: ', isError);
    return isError;
  };

  const onPressNext = (screenType: any, data: any) => {
    if (screenType <= 2) {
      if (validation()) {
        setFormType(screenType);
      }
    } else {
      if (validation()) {
        const location = agencyData?.working_location?.map((item: any) => {
          return item.location;
        });
        const latitude = agencyData?.working_location?.map((item: any) => {
          return item.latitude;
        });
        const longitude = agencyData?.working_location?.map((item: any) => {
          return item.longitude;
        });

        const formData = new FormData();
        if (type === "edit") {
          formData.append("agent_id", agencyData?._id);
        }
        formData.append("email", agencyData?.email);
        formData.append("owner_name", agencyData?.owner_name);
        formData.append("primary_mobile", agencyData?.primary_mobile);
        formData.append("whatsapp_number", agencyData?.whatsapp_number);
        formData.append("adhar_no", agencyData?.adhar_no);
        formData.append("pancard_no", agencyData?.pancard_no);
        formData.append("gender", agencyData?.gender);
        formData.append(
          "date_of_birth",
          agencyData?.date_of_birth ? agencyData?.date_of_birth : "10/11/2000"
        );
        formData.append("location", location[0]);
        formData.append("latitude", latitude[0]);
        formData.append("longitude", longitude[0]);
        formData.append(
          "working_location",
          JSON.stringify(agencyData?.working_location)
        );
        formData.append("rera_certificate_no", agencyData?.rera_certificate_no);
        // agencyData?.profile_picture?.uri != "" &&
        // formData.append("profile_picture", agencyData?.profile_picture);
        // agencyData?.rera_certificate?.uri != "" &&
        //   formData.append("rera_certificate", agencyData?.rera_certificate);
        // agencyData?.propidership_declaration_letter?.uri &&
        //   formData.append(
        //     "propidership_declaration_letter",
        //     agencyData?.propidership_declaration_letter
        //   );
        if (type === "edit") {
          dispatch(editAgent(formData));
        } else if (type === "add") {
          dispatch(createAgency(formData));
        }
        if (response?.status === 200) {
          dispatch(AgencyCreateFormRemove());
          navigation.navigate("AgencyListing");
        }
      }
    }
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <>
      {formType === 0 ? (
        <AgentBasicInfoView
          imagePicker={imagePicker}
          setImagePicker={setImagePicker}
          onPressBack={onPressBack}
          onPressNext={onPressNext}
          agencyData={agencyData}
          setAgencyData={setAgencyData}
          setLocationModel={setLocationModel}
          locationModel={locationModel}
        />
      ) : (
        <>
          {formType == 1 ? (
            <AgentBankInfo
              agencyData={agencyData}
              setAgencyData={setAgencyData}
              onPressNext={onPressNext}
              setFormType={setFormType}
            />
          ) : (
            <CompanyDetails
              agencyData={agencyData}
              setAgencyData={setAgencyData}
              onPressNext={onPressNext}
              setFormType={setFormType}
            />
          )}
        </>
      )}
      <PicturePickerModal
        Visible={imagePicker}
        setVisible={setImagePicker}
        imageData={(data: any) => {
          setAgencyData({
            ...agencyData,
            profile_picture: data,
          });
        }}
      />
    </>
  );
};

export default AgentBasicInfo;
