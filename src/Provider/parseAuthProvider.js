import Parse from "parse";
import { parseConfig } from "../parseConfig";
import { } from "react-admin/"
// const Parse = require('parse/node');
// const Parse = require('parse');

Parse.initialize(parseConfig.APP_ID, null, parseConfig.MASTER_KEY);
// Parse.initialize(parseConfig.APP_ID);
Parse.masterKey = parseConfig.MASTER_KEY;
Parse.serverURL = parseConfig.URL;

export const authProvider = {
    login: async (params) => {  //works
        const { email, password } = params;
        try {
            const user = await Parse.User.logIn(email, password);
            return Promise.resolve();
        } catch (error) {
            console.log("===", error);

            // throw Error("Wrong username / password");
            return Promise.reject();
        }
    },
    checkError: async ({ status }) => {
        if (status === 401 || status === 403) {
            Parse.User.current().then(() => Parse.User.logOut().then(() => { const currentUser = Parse.User.current() }));
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: async (params) => {
        return Parse.User.current() ? Promise.resolve() : Promise.reject();
    },
    logout: async () => {   //works
        try {
            await Parse.User.logOut();
            return Promise.resolve();
        } catch (error) {
            throw Error(error.toString());
        }
    },
    // getIdentity: () => {},
    getPermissions: () => {
        const storedData = localStorage.getItem('Parse/myAppId/currentUser');
        const userObject = JSON.parse(storedData);
        const userRole = userObject.role;
        return Promise.resolve(userRole);
    }
    // getPermissions: () => {Promise.resolve()},
}