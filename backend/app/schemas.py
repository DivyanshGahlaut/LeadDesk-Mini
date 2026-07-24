from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field, field_validator


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Full name of the lead")
    email: EmailStr = Field(..., description="Valid email address")
    budget: str = Field(..., description="Selected budget range")
    message: str = Field(..., min_length=1, max_length=2000, description="Project message or description")

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v_stripped = v.strip()
        if not v_stripped:
            raise ValueError("Name cannot be empty.")
        return v_stripped

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v_stripped = v.strip()
        if not v_stripped:
            raise ValueError("Message cannot be empty.")
        return v_stripped

    @field_validator("budget")
    @classmethod
    def validate_budget(cls, v: str) -> str:
        valid_budgets = ["Under $1000", "$1000-$5000", "Above $5000"]
        if v not in valid_budgets:
            raise ValueError(f"Budget must be one of: {', '.join(valid_budgets)}")
        return v


class LeadStatusUpdate(BaseModel):
    status: Literal["New", "Contacted", "Closed"]


class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    budget: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin_email: str


class TokenData(BaseModel):
    email: Optional[str] = None
