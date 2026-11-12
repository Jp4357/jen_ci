from openai import OpenAI

from app.config import MODEL, OPENAI_API_KEY
from app.schemas import Message

client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = "You are a helpful assistant."


def get_response(messages: list[Message]) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            *(m.model_dump() for m in messages),
        ],
    )
    return response.choices[0].message.content or ""
