const axios = require("axios");
const crypto = require("crypto");

/**
 * Digest Authentication Request
 * @param {Object} config - Axios request configuration
 * @param {string} username - Digest auth username
 * @param {string} password - Digest auth password
 * @returns {Promise<Object>} - Axios response
 */
async function digestAuthRequest(config, username, password) {
  try {
    // Make the initial request to get the digest challenge
    await axios.request(config);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Extract the WWW-Authenticate header
      const authHeader = error.response.headers["www-authenticate"];
      if (!authHeader) throw new Error("No WWW-Authenticate header found");

      // Parse the authentication parameters
      const authParams = {};
      authHeader.split(", ").forEach((param) => {
        const [key, value] = param.split("=");
        authParams[key] = value.replace(/"/g, "");
      });

      const { realm, nonce, qop } = authParams;

      // Generate HA1, HA2, and response hash
      const ha1 = crypto.createHash("md5").update(`${username}:${realm}:${password}`).digest("hex");
      const ha2 = crypto
        .createHash("md5")
        .update(`${config.method.toUpperCase()}:${config.url}`)
        .digest("hex");
      const nc = "00000001"; // Request counter
      const cnonce = crypto.randomBytes(16).toString("hex"); // Client nonce

      const responseHash = crypto
        .createHash("md5")
        .update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
        .digest("hex");

      // Construct the Authorization header
      const authValue = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${config.url}", qop=${qop}, nc=${nc}, cnonce="${cnonce}", response="${responseHash}"`;

      // Update config with the Authorization header
      config.headers = {
        ...config.headers,
        Authorization: authValue,
      };

      // Make the authenticated request
      return axios.request(config);
    } else {
      // Handle other errors
      throw error;
    }
  }
}

async function fetchData() {
  const username = "";
  const password = "";

  const config = {
    method: "post",
    url: "https://cloud.mongodb.com/api/atlas/v2/groups/{groupid}/databaseUsers",
    headers: {
      Accept: "application/vnd.atlas.2023-01-01+json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      databaseName: "admin",
      scopes: [
        {
          name: "nowonlinedataxchange",
          type: "CLUSTER",
        },
      ],
      username: "testing",
      password: "testing",
      roles: [
        {
          databaseName: "testing",
          roleName: "readWrite",
        },
      ],
    }),
  };

  try {
    const response = await digestAuthRequest(config, username, password);
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchData();
