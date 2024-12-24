const { BlobServiceClient } = require("@azure/storage-blob");

// const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
// const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=noxfilesblobs;AccountKey=mEgyKIa0ScJI9IHlOcaqN+KA2gIgE8sfeS1N5aROavRvDRVlYRQFKhOawejfSjvH5asdieTYzGXAKIfn+AStk6wHxg==;EndpointSuffix=core.windows.net`
);

const containerName = "development"; // Replace with your container name

async function createContainerIfNotExists(containerName) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container if it does not exist
    const createResponse = await containerClient.createIfNotExists();
    if (createResponse.succeeded) {
      console.log(`Container '${containerName}' created successfully`);
    } else {
      console.log(`Container '${containerName}' already exists`);
    }
    return containerClient;
  } catch (error) {
    console.error("Error creating container:", error.message);
    throw error;
  }
}

async function uploadFile(blobName, filePath) {
  try {
    // Ensure the container exists
    const containerClient = await createContainerIfNotExists(containerName);

    // const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadResponse = await blockBlobClient.uploadFile(filePath);
    console.log(`File uploaded successfully: ${uploadResponse.requestId}`);
  } catch (error) {
    console.error("Error uploading file:", error.message, error);
  }
}

async function updateFile(blobName, filePath) {
  try {
    await uploadFile(blobName, filePath);
    console.log(`File updated successfully.`);
  } catch (error) {
    console.error("Error updating file:", error.message);
  }
}

async function deleteFile(blobName) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
    console.log(`File deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
}

async function copyFile(sourceBlobName, destinationBlobName) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const sourceBlobClient = containerClient.getBlobClient(sourceBlobName);
    const destinationBlobClient = containerClient.getBlobClient(destinationBlobName);

    const copyPoller = await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url);
    await copyPoller.pollUntilDone();
    console.log(`File copied successfully.`);
  } catch (error) {
    console.error("Error copying file:", error.message);
  }
}

async function moveFile(sourceBlobName, destinationBlobName) {
  try {
    await copyFile(sourceBlobName, destinationBlobName);
    await deleteFile(sourceBlobName);
    console.log(`File moved successfully.`);
  } catch (error) {
    console.error("Error moving file:", error.message);
  }
}

// Example usage:
// (Replace 'example.txt' with actual file path and blob names)
(async () => {
  const filePath = "./1.jpg";
  const blobName = "dev/1.jpg";
  const newBlobName = "test1-copy.txt";

  // Upload a file
  await uploadFile(blobName, filePath);

  // Update/Replace a file
  //   await updateFile(blobName, filePath);

  // Delete a file
  //   await deleteFile(blobName);

  // Copy a file
  //   await copyFile(blobName, newBlobName);

  // Move a file
  //   await moveFile(blobName, newBlobName);
})();
