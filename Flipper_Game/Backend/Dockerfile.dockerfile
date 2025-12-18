FROM python:3.11-slim

WORKDIR /app

COPY Flipper_Game/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Flipper_Game/backend/ .

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
