import "./App.css";
import { Admin, Resource, CustomRoutes } from "react-admin";

import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PaidIcon from "@mui/icons-material/Paid";
import BarChartIcon from "@mui/icons-material/BarChart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ExtensionIcon from "@mui/icons-material/Extension";
import PieChartIcon from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";

import { Route } from "react-router-dom";

import LoginPage from "./Views/SignIn/forms/LoginPage";
import SignUp from "./Views/SignIn/forms/SignUp";
import PasswordResetEmail from "./Views/SignIn/forms/PasswordResetEmail";
import ResetPassword from "./Views/SignIn/forms/ResetPassword";
import EmailSent from "./Views/SignIn/EmailSent";

import { authProvider } from "./Provider/parseAuthProvider";
import { dataProvider } from "./Provider/parseDataProvider";

import { MyLayout } from "./Layout/MyLayout";
import { MyTheme } from "./Layout/MyDefaultTheme";

// import { UserList } from "./Views/UserList/UserList";
import { Report } from "./Views/Report/Report";
import { ReportTwo } from "./Views/ReportTwo/Report";
import { Analytics } from "./Views/Analytics/Analytics";

import { RedeemRecordsList } from "./Views/RedeemRecords/RedeemRecordsList";
import { CreateRedeemRecords } from "./Views/RedeemRecords/CreateRedeemRecords";

import { RechargeRecordsList } from "./Views/RechargeRecords/RechargeRecordsList";
import { CreateRechargeRecords } from "./Views/RechargeRecords/CreateRechargeRecords";

import { UserList } from "./Views/User/UserList";
import { CreateUser } from "./Views/User/CreateUser";
import { EditUser } from "./Views/User/EditUser";

import { GameCatalogue } from "./Views/GameCatalogue/GameCatalogue";
import { CreateGameCatalogue } from "./Views/GameCatalogue/CreateGameCatalogue";
import { EditGameCatalogue } from "./Views/GameCatalogue/EditGameCatalogue";

import { GameConfig } from "./Views/GameConfig/GameConfig";
import { CreateGameConfig } from "./Views/GameConfig/CreateGameConfig";
import { EditGameConfig } from "./Views/GameConfig/EditGameConfig";

import { SettingForm } from "./Views/Setting/SettingForm";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={MyLayout}
      theme={MyTheme}
    >
      {/* <Resource
        name="users"
        list={UserList}
        options={{ label: "User List" }}
        icon={PersonIcon}
      /> */}

      <Resource
        name="users"
        list={UserList}
        create={CreateUser}
        edit={EditUser}
        options={{ label: "User List" }}
        icon={PersonIcon}
      />
      <Resource
        name="redeemRecords"
        recordRepresentation="redeemRecords"
        list={RedeemRecordsList}
        options={{ label: "Redeem Records" }}
        icon={EventNoteIcon}
      />
      <Resource
        name="TransactionRecords"
        list={RechargeRecordsList}
        options={{ label: "Recharge Records" }}
        icon={PaidIcon}
      />
      <Resource
        name="report"
        list={Report}
        options={{ label: "Reports" }}
        icon={BarChartIcon}
      />
      {/* <Resource
        name="reportTwo"
        list={ReportTwo}
        options={{ label: "Reports Two" }}
        icon={BarChart}
      /> */}
      <Resource
        name="GameCatalogue"
        list={GameCatalogue}
        create={CreateGameCatalogue}
        edit={EditGameCatalogue}
        options={{ label: "Game Catalogue" }}
        icon={SportsEsportsIcon}
      />
      <Resource
        name="GameConfig"
        list={GameConfig}
        create={CreateGameConfig}
        edit={EditGameConfig}
        options={{ label: "Game Config" }}
        icon={ExtensionIcon}
      />
      <Resource
        name="analytics"
        list={Analytics}
        options={{ label: "Analytics" }}
        icon={PieChartIcon}
      />
      <Resource
        name="setting"
        list={SettingForm}
        options={{ label: "Setting" }}
        icon={SettingsIcon}
      />
      <CustomRoutes noLayout>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-email-sent" element={<EmailSent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-email" element={<PasswordResetEmail />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
