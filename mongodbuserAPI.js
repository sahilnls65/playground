
async function fetchData() {
  const username = "your-username";
  const password = "your-password";

  const config = {
    method: "get",
    url: "https://cloud.mongodb.com/api/atlas/v2/groups/67499b788f5de86895be068c/databaseUsers",
    headers: {
      Accept: "application/vnd.atlas.2023-01-01+json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await digestAuthRequest(config, username, password);
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchData();
