import { Parse } from "parse";
import { parseConfig } from "../parseConfig";

// Parse.initialize(
//   process.env.REACT_APP_APPID,
//   null,
//   process.env.REACT_APP_MASTER_KEY
// );
// Parse.serverURL = process.env.REACT_APP_URL;
// Parse.masterKey = process.env.REACT_APP_MASTER_KEY;


Parse.initialize(parseConfig.APP_ID, null, parseConfig.MASTER_KEY);
// Parse.initialize(parseConfig.APP_ID);
Parse.masterKey = parseConfig.MASTER_KEY;
Parse.serverURL = parseConfig.URL;

export const dataProvider = {
  // ...userProvider,
  create: async (resource, params) => {
    try {
      if (resource === "users") {
        const data = (({ username, name, email, password, balance }) => ({
          username,
          name,
          email,
          password,
          balance,
        }))(params.data);
        const user = new Parse.User();
        const result = await user.signUp(data);

        return { data: { id: result.id, ...result.attributes } };
      } else {
        const Resource = Parse.Object.extend(resource);
        const query = new Resource();
        const result = await query.save(params.data);

        return { data: { id: result.id, ...result.attributes } };
      }
    } catch (error) {
      return error;
    }
  },
  getOne: async (resource, params) => { //works
    var query = null;
    var result = null;
    try {
      if (resource === 'users') {
        query = new Parse.Query(Parse.User);
        result = await query.get(params.id, { useMasterKey: true });
      }
      else {
        const Resource = Parse.Object.extend(resource);
        query = new Parse.Query(Resource);
        result = await query.get(params.id);
      }
      console.log("GETONE CALLED");
      console.log(params);
      console.log(result, result.attributes);
      return { data: { id: result.id, ...result.attributes } };
    }
    catch (error) {
      return error;
    };
  },
  getList: async (resource, params) => {
    //works

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { filter } = params.filter;

    var query = null;
    var count = null;
    const useMasterKey = params.useMasterKey || false;

    if (resource === "users") {
      query = new Parse.Query(Parse.User);
      count = await query.count({ useMasterKey: useMasterKey });
    } else {
      const Resource = Parse.Object.extend(resource);
      query = new Parse.Query(Resource);
      count = await query.count({ useMasterKey: useMasterKey });
    }

    query.limit(perPage);
    query.skip((page - 1) * perPage);

    if (order === "DESC") query.descending(field);
    else if (order === "ASC") query.ascending(field);

    filter && Object.keys(filter).map((f) => query.matches(f, filter[f], "i"));

    try {
      const results =
        resource === "users"
          ? await query.find({ useMasterKey })
          : await query.find();
      return {
        total: count,
        data: results.map((o) => ({ id: o.id, ...o.attributes })),
      };
    } catch (error) {
      return error;
    }
  },
  getMany: async (resource, params) => {
    var query = null;
    var results = null;
    if (resource === "users") {
      results = params.ids.map((id) => new Parse.Query(Parse.User).get(id));
    } else {
      const Resource = Parse.Object.extend(resource);
      query = new Resource();
      results = params.ids.map((id) => new Parse.Query(Resource).get(id));
    }
    try {
      const data = await Promise.all(results);
      return {
        // total: data.length,
        data: data.map((o) => ({ id: o.id, ...o.attributes })),
      };
    } catch (error) {
      return error;
    }
  },
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const Resource = Parse.Object.extend(resource);
    var query = null;

    if (resource === "users") {
      query = new Parse.Query(Parse.User);
    } else {
      const Resource = Parse.Object.extend(resource);
      query = new Resource();
    }

    query.equalTo(params.target, params.id);
    const count = await query.count();
    if (perPage) query.limit(perPage);
    if (page) query.skip((page - 1) * perPage);
    if (order === "DESC") query.descending(field);
    else if (order === "ASEC") query.ascending(field);

    try {
      const results = await query.find();
      return {
        total: count,
        data: results.map((o) => ({ id: o.id, ...o.attributes })),
      };
    } catch (error) {
      return error;
    }
  },
  update: async (resource, params) => {
    //works
    var query = null;
    var obj = null;
    var r = null;
    const keys = Object.keys(params.data).filter((o) =>
      o === "id" || o === "createdAt" || o === "updatedAt" ? false : true
    );
    const data = keys.reduce((r, f, i) => {
      r[f] = params.data[f];
      return r;
    }, {});
    try {
      if (resource === "users") {
        query = new Parse.Query(Parse.User);
        obj = await query.get(params.id);
        r = await obj.save(data);
      } else {
        // const Resource = Parse.Object.extend(resource);
        // query = new Resource();

        query = new Parse.Query(resource);

        obj = await query.get(params.id);
        r = await obj.save(data);
      }
      return { data: { id: r.id, ...r.attributes } };
    } catch (error) {
      throw Error(error.toString());
    }
  },
  updateMany: async (resource, params) => {
    //need to filter out id, createdAt, updatedAt

    const Resource = Parse.Object.extend(resource);
    try {
      const qs = await Promise.all(
        params.ids.map((id) => new Parse.Query(Resource).get(id))
      );
      qs.map((q) => q.save(params.data));
      return { data: params.ids };
    } catch {
      throw Error("Failed to update all");
    }
  },
  delete: async (resource, params) => {
    console.log("***", resource);
    console.log("$$$", params);

    const userId = params.id;

    try {
      if (resource === "users") {
        const response = await Parse.Cloud.run("deleteUser", { userId });
        // console.log("---", response);
        const data = { data: { id: userId, ...userId.attributes } };
        // console.log("%%%", data);
        return data;
      } else {
        const Resource = Parse.Object.extend(resource);
        const query = new Parse.Query(Resource);
        const obj = await query.get(params.id);
        const data = { data: { id: obj.id, ...obj.attributes } };
        console.log("!!!", data);

        await obj.destroy();
        return data;
      }
    } catch (error) {
      console.log("^^^^^^^^^^", error);

      throw Error("Unable to delete");
    }
  },
  deleteMany: async (resource, params) => {
    const Resource = Parse.Object.extend(resource);
    try {
      const qs = await Promise.all(
        params.ids.map((id) => new Parse.Query(Resource).get(id))
      );
      await Promise.all(qs.map((obj) => obj.destroy()));
      return { data: params.ids };
    } catch (error) {
      throw Error("Unable to delete all");
    }
  },
};

