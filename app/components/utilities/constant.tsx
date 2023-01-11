import { Platform } from "react-native";

export const FONT_FAMILY_LIGHT = 'Nunito-Light';
export const FONT_FAMILY_REGULAR = 'Nunito-Regular';
export const FONT_FAMILY_MEDIUM = 'Nunito-Medium';
export const FONT_FAMILY_SEMIBOLD = 'Nunito-SemiBold';
export const FONT_FAMILY_EXTRABOLD = 'Nunito-ExtraBold';

export const PRIMARY_THEME_COLOR = '#162b70';
export const PRIMARY_THEME_COLOR_DARK = '#102054';

export const BLACK_COLOR = '#000000';
export const WHITE_COLOR = '#ffffff';
export const WHITE_COLOR_LIGHT = '#f5f5e9';
export const YELLOW_COLOR = '#d68904';
export const BLUE_COLOR = '#0493d6';
export const PURPLE_COLOR = '#b93cff';
export const GRAY_COLOR = '#bdbbbb';
export const TABBAR_COLOR = '#F5CB44';
export const GRAY_LIGHT_COLOR = '#757070';
export const BG_MAIN_COLOUR = '#eeeef1';
export const GOLDEN_COLOR = '#E4D00A';
export const GREEN_COLOR = '#008000';
export const RED_COLOR = '#FF0000';
export const CALL_COLOR = '#52a4ff';
export const BORDER_COLOR = '#d9effa';

export const validateEmail =
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const checkSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const Isios = Platform.OS === 'ios'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_BY_DAY = 'DD-MM-YYYY'
export const TIME_FORMAT = 'LT'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD, h:mm a'
export const AMOUNT_TYPE = [{ value: "Cr" }, { value: "L" }, { value: "K" }]

// export const  GLOBAL_URL = 'http://192.168.1.27:3000'
export const GLOBAL_URL = 'https://itinformatix.org:3044'
// export const  MAP_KEY = 'AIzaSyDdLk5tb75SiJvRk9F2B4almu-sBAi1-EM'
export const MAP_KEY = 'AIzaSyCbDx7Lk4eTMzptrQKXZvOPYgEMggrq8o4'

<<<<<<< HEAD
export const ROLE_IDS = {
  suadminrole_id: "6344049eb4f40996bcf1265a",
  admin_id: "6373203dd9363c459e315563",
  sourcingtl_id: "63464da503a33caee62c9cf2",
  sourcingmanager_id: "63466085fadec47fe8e96bb7",
  closingmanager_id: "63731fd3d9363c459e31551f",
  closingtl_id: "63731fafd9363c459e31550c",
  cp_id: "6346a40364de88d6385d4e38",
  agent_id: "6373209fd9363c459e3155b6",
  postsales_id: "63732009d9363c459e315530",
}
=======
export const Regexs = {
  AadharRegex: new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/),
  panRegex: new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
}
>>>>>>> e31c94185f9a627d78b295bbd530883db38ff3ed
