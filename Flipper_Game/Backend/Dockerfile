FROM python:3.11-slim

WORKDIR /app

COPY Flipper_Game/Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Flipper_Game/Backend/ .

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
