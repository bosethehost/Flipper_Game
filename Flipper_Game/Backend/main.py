from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis
import os
from game import toss

app = FastAPI(title="Flipper Game API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],  # <-- REQUIRED
    allow_headers=["*"],  # <-- REQUIRED
)

r = redis.from_url(
    os.getenv("REDIS_URL"),
    decode_responses=True,
    ssl=True,
)


class TossRequest(BaseModel):
    object_type: str
    guess: str
    player: str


@app.post("/toss")
def play(req: TossRequest):
    try:
        result = toss(req.object_type)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    correct = False
    if isinstance(result, dict):
        correct = req.guess.lower() in str(result).lower()
    else:
        correct = req.guess.lower() == result.lower()


    if correct:
        try:
            r.zincrby("leaderboard", 1, req.player)
        except Exception as e:
            print("Redis write failed:", e)


    return {"result": result, "correct": correct}


@app.get("/leaderboard")
def leaderboard():
    try:
        raw = r.zrevrange("leaderboard", 0, 9, withscores=True)
        return [{"player": p, "score": int(s)} for p, s in raw]
    except Exception as e:
        print("Redis read failed:", e)
        return []
        
@app.get("/ping")
def ping():
    try:
        r.set("ping", "pong")
        val = r.get("ping")
        return {"redis": val.decode("utf-8")}
    except Exception as e:
        return {"error": str(e)}
