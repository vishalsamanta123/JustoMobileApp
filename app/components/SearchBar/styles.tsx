import { StyleSheet } from "react-native";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../scaleFontSize";
import {
  Isios,
  FONT_FAMILY_SEMIBOLD,
  GRAY_LIGHT_COLOR,
  WHITE_COLOR,
  PRIMARY_THEME_COLOR,
  BLACK_COLOR,
} from "../utilities/constant";

const styles = StyleSheet.create({
    inputView: {
    fontSize: normalize(16),
    // paddingRight: normalizeSpacing(30),
    paddingLeft: normalizeSpacing(Isios ? 5 : 15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    // color: GRAY_LIGHT_COLOR,
    // backgroundColor: WHITE_COLOR,
    borderColor: PRIMARY_THEME_COLOR,
    borderWidth: 2,
    borderRadius: 30,
    margin: normalizeSpacing(10),
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  searchIconTouch: {
    padding: normalizeSpacing(10),
  },
  searchIconImg: {
    height: normalizeHeight(20),
    width: normalizeWidth(30),
  },
  TextInput:{
    width: '85%',
    height: normalizeHeight(40),
    textAlignVertical: 'top',
    color: BLACK_COLOR,
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD
  }
});

export default styles;
