import uuid
from datetime import datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError
from database.models import User, Match, Session, SessionLocal

def seed_database():
    session = SessionLocal()
    try:
        # Clear existing data
        session.query(Match).delete()
        session.query(Session).delete()
        session.query(User).delete()

        # Insert sample users
        user1 = User(
            id=uuid.uuid4(),
            email="alice@example.com",
            password_hash="hashed_password_1",
            created_at=datetime.utcnow()
        )
        user2 = User(
            id=uuid.uuid4(),
            email="bob@example.com",
            password_hash="hashed_password_2",
            created_at=datetime.utcnow()
        )
        user3 = User(
            id=uuid.uuid4(),
            email="charlie@example.com",
            password_hash="hashed_password_3",
            created_at=datetime.utcnow()
        )

        session.add_all([user1, user2, user3])

        # Insert sample matches
        match1 = Match(
            id=uuid.uuid4(),
            user_id=user1.id,
            result="win",
            winner="X",
            moves=5,
            created_at=datetime.utcnow()
        )
        match2 = Match(
            id=uuid.uuid4(),
            user_id=user2.id,
            result="draw",
            winner=None,
            moves=9,
            created_at=datetime.utcnow()
        )

        session.add_all([match1, match2])

        # Insert sample sessions
        session1 = Session(
            id=uuid.uuid4(),
            user_id=user1.id,
            token="sample_token_1",
            expires_at=datetime.utcnow() + timedelta(days=1),
            created_at=datetime.utcnow()
        )
        session2 = Session(
            id=uuid.uuid4(),
            user_id=user2.id,
            token="sample_token_2",
            expires_at=datetime.utcnow() + timedelta(days=1),
            created_at=datetime.utcnow()
        )

        session.add_all([session1, session2])

        session.commit()
    except SQLAlchemyError as e:
        session.rollback()
        print(f"Error seeding database: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    seed_database()