const express = require("express");
const app = express();

// Sample function to simulate fetching 20k records
function fetchLargeData() {
  return Array.from({ length: 200000 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
}

// Utility function to create chunks
function createChunks(data, chunkSize) {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}

app.get("/stream-data", (req, res) => {
  const largeData = fetchLargeData(); // Fetch your large dataset
  const chunks = createChunks(largeData, 1000); // Create chunks of 1,000 records

  res.setHeader("Content-Type", "application/json"); // Set response type

  (async function sendChunks() {
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate delay if needed
      res.write(JSON.stringify(chunk) + "\n"); // Send each chunk as a JSON string
    }
    res.end(); // Close the response after sending all chunks
  })();
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

async function fetchChunkedData(url) {
  const response = await fetch(url); // Call the endpoint
  const reader = response.body.getReader(); // Get the reader for the response stream
  const decoder = new TextDecoder("utf-8"); // Create a text decoder for UTF-8 data
  let partialChunk = ""; // To store incomplete JSON parts across chunks

  while (true) {
    const { done, value } = await reader.read(); // Read the next chunk

    if (done) {
      console.log("Stream complete");
      break;
    }

    // Decode the chunk and combine with any partial data from previous iterations
    partialChunk += decoder.decode(value, { stream: true });

    // Split the data into individual JSON strings based on the newline delimiter
    const parts = partialChunk.split("\n");
    partialChunk = parts.pop(); // Keep the last part for the next chunk (it may be incomplete)

    for (const part of parts) {
      if (part.trim()) {
        const data = JSON.parse(part); // Parse each JSON chunk
        console.log("Received chunk:", data); // Process the chunk
        // Do something with the data, e.g., update UI
      }
    }
  }

  if (partialChunk.trim()) {
    // Handle any leftover data after the stream ends
    const lastData = JSON.parse(partialChunk);
    console.log("Last chunk:", lastData);
    // Process the last chunk
  }
}

// Call the function to fetch data
fetchChunkedData("http://localhost:3000/stream-data");
