from fastapi import APIRouter

from app import llm
from app.schemas import ChatRequest, ChatResponse

router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/chat")
def chat(request: ChatRequest) -> ChatResponse:
    return ChatResponse(response=llm.get_response(request.messages))
