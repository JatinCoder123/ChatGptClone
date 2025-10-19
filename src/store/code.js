const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const FormData = require("form-data");
const { DefaultAzureCredential } = require("@azure/identity");

dotenv.config();

/**
 * Save the base64 image response to PNG files
 */
async function saveResponse(responseData, filenamePrefix) {
  const arr = responseData["data"];
  for (let i = 0; i < arr.length; i++) {
    const b64 = arr[i]["b64_json"];
    const filename = `${filenamePrefix}_${i + 1}.png`;
    fs.writeFileSync(filename, Buffer.from(b64, "base64"));
    console.log(`✅ Image saved to: ${filename}`);
  }
}

async function main() {
  // 🌐 Azure configuration
  const endpoint =
    process.env["AZURE_OPENAI_ENDPOINT"] ||
    "https://ashis-mcud14tl-eastus2.cognitiveservices.azure.com/";
  const deployment = process.env["DEPLOYMENT_NAME"] || "gpt-image-1";
  const apiVersion = process.env["OPENAI_API_VERSION"] || "2025-04-01-preview";

  const generationsPath = `openai/deployments/${deployment}/images/generations`;
  const params = `?api-version=${apiVersion}`;
  const generationsUrl = `${endpoint}${generationsPath}${params}`;

  // 🔐 Authentication
  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken(
    "https://cognitiveservices.azure.com/.default"
  );

  // 🖼️ Generate image
  const generationBody = {
    prompt: "inspite of disnav i wan't it should have text , kamal",
    n: 1,
    size: "1024x1024",
    quality: "medium",
    output_format: "png",
  };

  const generationResponse = await axios.post(generationsUrl, generationBody, {
    headers: {
      Authorization: `Bearer ${tokenResponse.token}`,
      "Content-Type": "application/json",
    },
  });

  await saveResponse(generationResponse.data, "generated_image");

  // ✏️ Edit image
  const editsPath = `openai/deployments/${deployment}/images/edits`;
  const editsUrl = `${endpoint}${editsPath}${params}`;

  const formData = new FormData();
  formData.append(
    "prompt",
    "inspite of disnav i wan't it should have text , kamal"
  );
  formData.append("n", "1");
  formData.append("size", "1024x1024");
  formData.append("quality", "medium");
  formData.append(
    "image",
    fs.createReadStream("generated_image_1.png"),
    "generated_image_1.png"
  );

  // Optional: mask image for selective editing
  // formData.append("mask", fs.createReadStream("mask.png"), "mask.png");

  const editResponse = await axios.post(editsUrl, formData, {
    headers: {
      Authorization: `Bearer ${tokenResponse.token}`,
      ...formData.getHeaders(),
    },
  });

  await saveResponse(editResponse.data, "edited_image");
}

main().catch((err) => {
  console.error("❌ This sample encountered an error:", err);
});
