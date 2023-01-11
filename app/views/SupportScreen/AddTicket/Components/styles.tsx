import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import { GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "app/components/utilities/constant";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: PRIMARY_THEME_COLOR,
  },
  RightFirstIconStyle: {
    tintColor: WHITE_COLOR,
  },
  topItemsVw: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16)
  },
  inputWrap: {
    marginVertical: normalizeSpacing(10),
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: GRAY_LIGHT_COLOR
  },
})

export default styles