import { Parse } from 'parse';
// const Parse = require('parse/node');

const parseConfig={
    URL: 'http://localhost:1337/parse',
    JAVASCRIPT_KEY: '',
    APP_ID: 'f8sqXPLdtN0BsldkoDAL0PHVZxkG2tnnS6pf7j22',
    MASTER_KEY: 'OOEOpTIMDX81qrrtESik62nCOzY85z7GFQKOoimm'
};

Parse.initialize(parseConfig.APP_ID, null, parseConfig.MASTER_KEY);
// Parse.initialize(parseConfig.APP_ID);
Parse.masterKey = parseConfig.MASTER_KEY;
Parse.serverURL = parseConfig.URL;

// const query = new Parse.Query(Parse.User);
// const result = await query.find({useMasterKey: true});
// console.log(result);
        

export const userProvider = {
    getListUsers: async (params) => {
        // console.log(params);
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const { filter } = params.filter;

        const query = new Parse.Query(Parse.User);
        
        const count = await query.count();

        query.limit(perPage);
        query.skip((page - 1) * perPage);
        if (order === "DESC") query.descending(field);
        else if (order === "ASC") query.ascending(field);
        filter && Object.keys(filter).map(f => query.matches(f, filter[f], 'i'));
        
        try {
            const results = await query.find({useMasterKey: true});
            return {
                total: count,
                data: results.map(o => ({ id: o.id, ...o.attributes }))
            };
        }
        catch(error) {
            return error;
        }
    },
    getOneUser: (params) => {},
    getManyUsers: (params) => {},
    getManyUsersReference: (params) => {},
    createUser: (params) => {},
    updateUser: (params) => {},
    updateManyUser: (params) => {},
    deleteUser: (params) => {},
    deleteManyUsers: (params) => {},   
};

// var params = {
//     filter: {},
//     pagination: {page: 1, perPage: 10},
//     sort: {field: "id", orer: "ASC"},
// };

// userProvider.getListUsers(params).then(data => console.log(data), err => console.log(err.message));