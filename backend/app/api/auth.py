from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.core.security import hash_password, verify_password
from app.core.jwt_handler import create_access_token

router = APIRouter()


@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_pw = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:
        print("=" * 60)
        print("LOGIN FAILED")
        print("Username entered :", repr(user.username))
        print("Reason           : User not found")
        print("=" * 60)

        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    print("=" * 60)
    print("LOGIN ATTEMPT")
    print("Username entered :", repr(user.username))
    print("Password entered :", repr(user.password))
    print("DB Username      :", repr(db_user.username))
    print("DB Hash          :", db_user.hashed_password)

    password_valid = verify_password(
        user.password,
        db_user.hashed_password
    )

    print("Password Verify  :", password_valid)
    print("=" * 60)

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "sub": db_user.username,
            "role": db_user.role
        }
    )

    print("JWT Generated Successfully")

    return {
        "access_token": token,
        "token_type": "bearer"
    }