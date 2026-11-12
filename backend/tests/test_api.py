from fastapi.testclient import TestClient

from app import llm
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_chat_sends_full_history(monkeypatch):
    received = []
    monkeypatch.setattr(llm, "get_response", lambda messages: received.extend(messages) or "ok")
    history = [
        {"role": "user", "content": "My name is Sam"},
        {"role": "assistant", "content": "Hi Sam"},
        {"role": "user", "content": "What is my name?"},
    ]
    response = client.post("/chat", json={"messages": history})
    assert response.status_code == 200
    assert response.json() == {"response": "ok"}
    assert [m.content for m in received] == [m["content"] for m in history]


def test_chat_rejects_invalid_role():
    response = client.post("/chat", json={"messages": [{"role": "system", "content": "x"}]})
    assert response.status_code == 422
