from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis
import os
from game import toss

app = FastAPI(title="Flipper Game API")

app.add_middleware(CORSMiddleware,allow_origins=["*"])

r = redis.from_url(os.getenv("REDIS_URL"))


class TossRequest(BaseModel):
    object_type: str
    guess: str
    player: str


@app.post("/toss")
def play(req: TossRequest):
    result = toss(req.object_type)
    correct = False
    if isinstance(result, dict):
        correct = req.guess.lower() in str(result).lower()
    else:
        correct = req.guess.lower() == result.lower()


    if correct:
        r.zincrby("leaderboard", 1, req.player)


    return {"result": result, "correct": correct}


@app.get("/leaderboard")
def leaderboard():
    return r.zrevrange("leaderboard", 0, 9, withscores=True)
