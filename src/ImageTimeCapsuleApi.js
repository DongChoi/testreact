import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "image-time-capsule.us-west-1.elasticbeanstalk.com";
console.log("process.env= ", process.env.REACT_APP_BASE_URL);
console.log("BASE_URL ", BASE_URL);
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ImageTimeCapsuleApi {
  static token = null;
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ImageTimeCapsuleApi.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async register(formData) {
    console.log("ImageTimeCapsuleAPI attempting to send new user data");
    let res = await this.request("signup", formData, "post");
    console.log("ImageTimeCapsuleAPI register successful", res);
    return res;
  }

  static async login(formData) {
    let res = await this.request("login", formData, "post");
    console.log("RES", res);
    return res.token;
  }

  /** Create new capsule */
  static async createCapsule(formData) {
    console.log("formData from API", formData);
    let resp = await this.request("capsules", formData, "post");
    console.log(resp);
    return resp;
  }

  // static async updateUser(formData, username) {
  //   let res = await this.request(`users/${username}`, formData, "patch");
  //   return res.user;
  // }

  //   //update capsule
  //   static async applyToJob(username, jobId) {
  //     let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  //     return res;
  //   }
}

export default ImageTimeCapsuleApi;
