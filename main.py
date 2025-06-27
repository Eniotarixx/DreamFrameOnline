from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    image: str
    prompt: str

@app.post("/generate")
async def generate(data: GenerateRequest):
    # Access the image and prompt
    image_base64 = data.image
    prompt = data.prompt

    # TODO: Process the image and prompt as needed

    # For now, just return the same image as a placeholder
    return {"result": image_base64}