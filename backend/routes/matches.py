from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from database.models import Match
from database.config import get_db
from backend.services.auth import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/matches")

class MatchResponse(BaseModel):
    id: UUID
    user_id: UUID
    result: str
    winner: str
    moves: int
    created_at: str

    class Config:
        orm_mode = True

@router.post("/", response_model=MatchResponse, operation_id="create_match", status_code=status.HTTP_201_CREATED)
async def create_match(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        new_match = Match(
            user_id=current_user["id"],
            result="pending",
            winner=None,
            moves=0,
            created_at=datetime.utcnow()
        )
        db.add(new_match)
        db.commit()
        db.refresh(new_match)
        return new_match
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create match")

@router.get("/", response_model=List[MatchResponse], operation_id="get_matches", status_code=status.HTTP_200_OK)
async def get_matches(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        matches = db.query(Match).filter(Match.user_id == current_user["id"]).all()
        return matches
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve matches")