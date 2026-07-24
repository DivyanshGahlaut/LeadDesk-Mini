from app.database import SessionLocal, engine, Base
from app.models import Admin, Lead
from app.auth import get_password_hash
from app.config import DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD


def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Admin user if none exists
    admin_count = db.query(Admin).count()
    if admin_count == 0:
        hashed_pwd = get_password_hash(DEFAULT_ADMIN_PASSWORD)
        admin = Admin(email=DEFAULT_ADMIN_EMAIL, hashed_password=hashed_pwd)
        db.add(admin)
        db.commit()
        print(f"[SEED] Created default admin account: {DEFAULT_ADMIN_EMAIL}")

    # Seed initial demo leads if database is completely empty
    lead_count = db.query(Lead).count()
    if lead_count == 0:
        demo_leads = [
            Lead(
                name="John Smith",
                email="john@gmail.com",
                budget="$1000-$5000",
                message="Need an Ecommerce Store built with high performance.",
                status="New"
            ),
            Lead(
                name="Alice Johnson",
                email="alice@gmail.com",
                budget="Above $5000",
                message="Looking for a full CRM custom build and website redesign.",
                status="Contacted"
            ),
            Lead(
                name="Robert Davis",
                email="robert@techcorp.io",
                budget="Under $1000",
                message="Simple landing page redesign for startup.",
                status="Closed"
            )
        ]
        db.add_all(demo_leads)
        db.commit()
        print(f"[SEED] Inserted {len(demo_leads)} demo leads for initial preview.")

    db.close()


if __name__ == "__main__":
    seed_database()
