from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.models import Lead, Admin
from app.schemas import LeadCreate, LeadResponse, LeadStatusUpdate
from app.auth import get_current_admin

router = APIRouter(tags=["Leads"])


@router.post("/api/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
@router.post("/lead", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
    """
    Public lead submission endpoint.
    Performs server-side validation using Pydantic.
    """
    db_lead = Lead(
        name=lead_in.name,
        email=lead_in.email,
        budget=lead_in.budget,
        message=lead_in.message,
        status="New"
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


@router.get("/api/leads", response_model=List[LeadResponse])
@router.get("/leads", response_model=List[LeadResponse])
def get_all_leads(
    search: Optional[str] = Query(None, description="Search term for leads"),
    status_filter: Optional[str] = Query(None, alias="status", description="Filter by status"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Admin-only endpoint to retrieve all submitted leads with optional search and status filtering.
    """
    query = db.query(Lead)

    if status_filter:
        query = query.filter(Lead.status == status_filter)

    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Lead.name.ilike(term),
                Lead.email.ilike(term),
                Lead.message.ilike(term),
                Lead.budget.ilike(term),
                Lead.status.ilike(term)
            )
        )

    return query.order_by(Lead.id.desc()).all()


@router.get("/api/leads/search", response_model=List[LeadResponse])
@router.get("/search", response_model=List[LeadResponse])
def search_leads(
    q: str = Query("", description="Search term"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Admin-only dedicated search endpoint for leads.
    """
    if not q or not q.strip():
        return db.query(Lead).order_by(Lead.id.desc()).all()

    term = f"%{q.strip()}%"
    return db.query(Lead).filter(
        or_(
            Lead.name.ilike(term),
            Lead.email.ilike(term),
            Lead.message.ilike(term),
            Lead.budget.ilike(term),
            Lead.status.ilike(term)
        )
    ).order_by(Lead.id.desc()).all()


@router.put("/api/leads/{lead_id}/status", response_model=LeadResponse)
@router.put("/lead/{lead_id}", response_model=LeadResponse)
def update_lead_status(
    lead_id: int,
    status_update: LeadStatusUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Admin-only endpoint to update lead status ('New', 'Contacted', 'Closed').
    """
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead with ID {lead_id} not found."
        )

    lead.status = status_update.status
    db.commit()
    db.refresh(lead)
    return lead
