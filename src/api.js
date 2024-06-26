const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of companies, takes object {nameLike: searchTerm}*/

  static async getCompanies(params) {
    let res = await this.request(`companies`, params);
    return res.companies;
  }

  /** Get list of jobs, takes object {title: searchTerm}*/

  static async getJobs(params) {
    let res = await this.request(`jobs`, params);
    return res.jobs;
  }

  /** Logs user in, returns token */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  /** Signs user up, returns token */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Updates user */
  static async updateUser(data) {
    const username = data.username;

    const validData = {...data};
    delete validData.username;

    let res = await this.request(`users/${username}`, validData, "PATCH");
    return res.user;
  }

  /** Get user */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** applies to a specific job */
  static async applyToJob(jobId, username) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
    return res.applied;
  }

  // obviously, you'll add a lot here ...
}

export default JoblyApi;