import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
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
    padding: normalizeSpacing(20),
    borderBottomWidth: 0.6,
    borderBottomColor: BLACK_COLOR,
  },
  propertyText: {
    fontSize: normalize(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  iconStyle: {
    height: normalizeHeight(20),
    width: normalizeWidth(20),
  },
});
export default styles;
