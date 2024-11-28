import "./App.css";
import {
  Admin,
  Resource,
  CustomRoutes,
} from "react-admin";

import PersonIcon from "@mui/icons-material/Person";
import BarChart from "@mui/icons-material/BarChart";
import PieChart from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

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

import { UserList } from "./Views/UserList/UserList";
import { Report } from "./Views/Report/Report";
import { ReportTwo } from "./Views/ReportTwo/Report";
import { Analytics } from "./Views/Analytics/Analytics";

import { GameCatalogue } from "./Views/GameCatalogue/GameCatalogue";
import { CreateGameCatalogue } from "./Views/GameCatalogue/CreateGameCatalogue";
import { EditGameCatalogue } from "./Views/GameCatalogue/EditGameCatalogue";

import { GameConfig } from "./Views/GameConfig/GameConfig";
import { CreateGameConfig } from "./Views/GameConfig/CreateGameConfig";
import { EditGameConfig } from "./Views/GameConfig/EditGameConfig";

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
      <Resource
        name="users"
        list={UserList}
        options={{ label: "User List" }}
        icon={PersonIcon}
      />
      <Resource
        name="report"
        list={Report}
        options={{ label: "Reports" }}
        icon={BarChart}
      />
      <Resource
        name="reportTwo"
        list={ReportTwo}
        options={{ label: "Reports Two" }}
        icon={BarChart}
      />
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
        icon={SettingsIcon}
      />
      <Resource
        name="analytics"
        list={Analytics}
        options={{ label: "Analytics" }}
        icon={PieChart}
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
