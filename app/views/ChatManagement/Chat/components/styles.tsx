import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  BORDER_COLOR,
  CALL_COLOR,
  FONT_FAMILY_SEMIBOLD,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  chatListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalizeSpacing(15),
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  propertyText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    marginLeft: normalize(20),
    color: PRIMARY_THEME_COLOR
  },
  iconStyle: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
  },
  straight:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage:{
    height: normalizeHeight(35),
    width: normalizeWidth(35),
    borderRadius: normalize(35),
  }
});
export default styles;
