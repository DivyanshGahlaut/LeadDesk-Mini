from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Admin
from app.schemas import AdminLogin, Token
from app.auth import verify_password, create_access_token, get_current_admin

router = APIRouter(tags=["Authentication"])


@router.post("/login", response_model=Token)
@router.post("/api/auth/login", response_model=Token)
def login_admin(payload: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(data={"sub": admin.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin_email": admin.email
    }


@router.get("/api/auth/me")
def get_me(current_admin: Admin = Depends(get_current_admin)):
    return {
        "id": current_admin.id,
        "email": current_admin.email
    }
