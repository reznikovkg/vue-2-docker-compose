import { RouteNames } from "@/router/routes";

export const RouteTree = {
  [RouteNames.GAME]: RouteNames.LEVEL_MENU,
  [RouteNames.CUSTOM_GAME]: RouteNames.LEVEL_MENU,
  [RouteNames.EDITOR]: RouteNames.START_MENU,
  [RouteNames.LEVEL_MENU]: RouteNames.START_MENU,
  [RouteNames.START_MENU]: RouteNames.HOME,
};
