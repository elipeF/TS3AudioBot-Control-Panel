import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import NavigationReducer from "./NavigationReducer";
import BotsReducer from "./BotsReducer";
import BotSettingsReducer from "./BotSettingsReducer";
import BotRightsReducer from "./BotRightsReducer";
import NotificationsReducer from "./NotificationsReducer";
import UsersReducer from "./UsersReducer";
import BotCreateReducer from "./BotCreateReducer";
import UserCreateReducer from "./UserCreateReducer";

const RootReducer = combineReducers({
  bots: BotsReducer,
  botSettings: BotSettingsReducer,
  botCreate: BotCreateReducer,
  userCreate: UserCreateReducer,
  botRights: BotRightsReducer,
  notification: NotificationsReducer,
  login: LoginReducer,
  user: UserReducer,
  users: UsersReducer,
  layout: LayoutReducer,
  // scrumboard: ScrumBoardReducer,
  // ecommerce: EcommerceReducer,
  navigations: NavigationReducer,
});

export default RootReducer;
