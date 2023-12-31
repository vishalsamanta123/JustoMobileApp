import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SupportForumDetail from './components/SupportForumDetail'
import { supportForumDetailData } from 'app/Redux/Actions/SupportForumAction'

const SupportForumScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const data = route?.params
    const { response = {}, detail = "" } = useSelector((state: any) => state.supportForumData)
    const [supportForumDtl, setSupportForumDtl] = useState<any>({})

    useLayoutEffect(() => {
        if (data?._id) {
            dispatch(supportForumDetailData({
                support_forum_id: data?._id
            }))
        }
    }, [detail])
    useEffect(() => {
        if (response?.status === 200) {
            setSupportForumDtl(response.data[0])
        }
    }, [response])
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <SupportForumDetail
            handleBackPress={handleBackPress}
            supportForumDtl={supportForumDtl}
        />
    )
}

export default SupportForumScreen