const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");
const captureButton = document.getElementById("capture");
const promptInput = document.getElementById("prompt");

// Request access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Error accessing the camera!");
    console.error(err);
  });

// When the user clicks the "Capture" button
captureButton.addEventListener("click", () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Please enter a description for the background.");
    return;
  }

  // Disable the button and show loading text
  captureButton.disabled = true;
  captureButton.innerText = "⏳ Processing...";

  // Draw the current video frame on the hidden canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas image to base64 (PNG)
  const imageBase64 = canvas.toDataURL("image/png");

  // Send the image and prompt to the FastAPI backend
  fetch("http://localhost:8000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image: imageBase64,
      prompt: prompt
    })
  })
  .then(res => res.json())
  .then(data => {
    // Set the result image source to the path returned by the backend
    result.src = data.result;
  })
  .catch(err => {
    alert("An error occurred while processing your image.");
    console.error(err);
  })
  .finally(() => {
    captureButton.disabled = false;
    captureButton.innerText = "📸 Capture";
  });
});
