import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisitorUpdateFirstView from './components/VisitorUpdateFirst'
import VisitorUpdateSecondView from "./components/VisitorUpdateSecond";
import VisitorUpdateThirdView from "./components/VisitorUpdateThird";
import { addVisitorRemove, editVisitor, getVisitorDetail, } from "app/Redux/Actions/LeadsActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";

const VisitorUpdateScreen = ({ navigation, route }: any) => {
    const data = route?.params || 0
    const dispatch: any = useDispatch()
    const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
    const masterData = useSelector((state: any) => state.masterData) || {}
    const editData = useSelector((state: any) => state.editVisitorData) || {}
    const [updateForm, setUpdateForm] = React.useState({
        lead_id: "",
        first_name: "",
        email: "",
        mobile: "",
        gender: "",
        birth_date: "",
        address: "",
        location: "",
        latitude: "",
        longitude: "",
        city: "",
        occupation: "",
        coumpany_name: "",
        desigantion: "",
        office_address: "",
        configuration_id: "",
        configuration: "",
        areain_sqlft: "",
        income: "",
        funding_type: "",
        purpose: "",
        whenby: "",
        agent_code: "",
        adhar_no: "",
        pancard_no: "",
        whatsapp_no: "",
        funding_emi_type: "",
        min_budget: "",
        min_budget_type: "",
        max_budget: "",
        max_budget_type: "",
        expected_possession_date: "",
        min_emi_budget: "",
        min_emi_budget_type: "",
        max_emi_budget: "",
        max_emi_budget_type: "",
        locality: "",
        property_id: '',
        budget: '',
        property_type_title: '',
    });
    useLayoutEffect(() => {
        if (data._id) {
            dispatch(getVisitorDetail({
                lead_id: data._id
            }))
        }
    }, [detail])

    useEffect(() => {
        if (response?.status === 200) {
            setUpdateForm({
                ...response?.data[0]?.customer_detail,
                lead_id: response?.data[0]?._id,
                property_title: response?.data[0]?.property_title,
                expected_possession_date: response?.data[0]?.expected_possession_date,
                property_id: response?.data[0]?.property_id,
                property_type_title: response?.data[0]?.property_type_title,
                locality: response?.data[0]?.customer_detail?.locality && response?.data[0]?.customer_detail?.locality != '' ?
                    response?.data[0]?.customer_detail?.locality : ''
            })
        }
    }, [response])
    const [screenType, setScreenType] = useState(0)
    const [masterDatas, setMasterDatas] = useState<any>([])

    useEffect(() => {
        dispatch(getAllMaster({
            type: 2
        }))
    }, [])

    useEffect(() => {
        if (masterData?.response?.status === 200) {
            setMasterDatas(
                masterData?.response?.data?.length > 0 ?
                    masterData?.response?.data : [])
        }
    }, [masterData])

    const handleBackPress = () => {
        navigation.goBack();
    };
    useEffect(() => {
        if (editData?.update) {
            dispatch(addVisitorRemove());
            navigation.goBack(null)
            ErrorMessage({
                msg: editData?.update ? editData?.response?.message :
                    'no message',
                backgroundColor: GREEN_COLOR
            })
        }
    }, [editData])
    const onPressNext = (type: any) => {
        if (type != null) {
            setScreenType(type)
        } else {
            const edit_params = {
                lead_id: updateForm?.lead_id,
                first_name: updateForm?.first_name,
                email: updateForm?.email,
                mobile: updateForm?.mobile,
                gender: updateForm?.gender,
                birth_date: updateForm?.birth_date,
                address: updateForm?.address,
                location: updateForm?.location,
                latitude: updateForm?.latitude,
                longitude: updateForm?.longitude,
                city: updateForm?.city,
                occupation: updateForm?.occupation,
                coumpany_name: updateForm?.coumpany_name,
                desigantion: updateForm?.desigantion,
                office_address: updateForm?.office_address,
                configuration_id: updateForm?.configuration_id,
                configuration: updateForm?.configuration,
                areain_sqlft: updateForm?.areain_sqlft,
                income: updateForm?.income,
                budget: updateForm?.max_budget ? updateForm?.max_budget : updateForm?.budget && '',
                funding_type: updateForm?.funding_type,
                purpose: updateForm?.purpose,
                whenby: updateForm?.whenby,
                agent_code: updateForm?.agent_code,
                adhar_no: updateForm?.adhar_no,
                pancard_no: updateForm?.pancard_no,
                whatsapp_no: updateForm?.whatsapp_no,
                funding_emi_type: updateForm?.funding_emi_type,
                min_budget: updateForm?.min_budget,
                min_budget_type: updateForm?.min_budget_type,
                max_budget: updateForm?.max_budget,
                max_budget_type: updateForm?.max_budget_type,
                expected_possession_date: updateForm?.expected_possession_date,
                property_id: updateForm?.property_id,
                property_type_title: updateForm?.property_type_title,
                min_emi_budget: updateForm?.min_emi_budget ? updateForm.min_emi_budget : '',
                min_emi_budget_type: updateForm?.min_emi_budget_type ? updateForm?.min_emi_budget_type : '',
                max_emi_budget: updateForm?.max_emi_budget ? updateForm?.max_emi_budget : '',
                max_emi_budget_type: updateForm?.max_emi_budget_type ? updateForm?.max_emi_budget_type : '',
                locality: updateForm?.locality,
            }
            dispatch(editVisitor(edit_params))
        }
    }
    return (
        <>
            {screenType === 0 ?
                <VisitorUpdateFirstView
                    handleBackPress={handleBackPress}
                    screenType={screenType}
                    updateForm={updateForm}
                    setUpdateForm={setUpdateForm}
                    onPressNext={onPressNext}
                /> :
                <>
                    {screenType === 1 ?
                        <VisitorUpdateSecondView
                            handleBackPress={handleBackPress}
                            screenType={screenType}
                            setScreenType={setScreenType}
                            updateForm={updateForm}
                            setUpdateForm={setUpdateForm}
                            onPressNext={onPressNext}
                            masterDatas={masterDatas}
                        /> :
                        <VisitorUpdateThirdView
                            handleBackPress={handleBackPress}
                            screenType={screenType}
                            setScreenType={setScreenType}
                            updateForm={updateForm}
                            setUpdateForm={setUpdateForm}
                            onPressNext={onPressNext}
                        />
                    }
                </>
            }
        </>
    )
}
export default VisitorUpdateScreen