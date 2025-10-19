from fastapi import FastAPI
from pydantic import BaseModel
from thotai.ai.llm_engine import generate_cultural_pack
from fastapi.middleware.cors import CORSMiddleware

class ThemeRequest(BaseModel):
    theme: str

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "ThotAI API is running. Use POST /generate to create a cultural pack."}

@app.post("/generate")
async def generate_pack(request: ThemeRequest):
    pack = generate_cultural_pack(request.theme)
    return pack
