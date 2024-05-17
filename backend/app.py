from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from requests import Session
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import desc

from auth.auth import (
    ALGORITHM,
    SECRET_KEY,
    create_access_token,
    get_password_hash,
    verify_password,
)
from auth.schemas import UserSignIn, UserSignUp, Token
from sql_app.schemas import ParcelIn, StatusIn
from sql_app.models import Address, Parcel, ParcelStatus, Person, User
from sql_app.main import get_db
from jose import jwt, JWTError
from sqlalchemy.orm import joinedload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/auth/signup", response_model=Token)
def signup(user_in: UserSignUp, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user_in.password)
    person = Person(
        first_name=user_in.first_name, last_name=user_in.last_name, email=user_in.email
    )
    db.add(person)
    db.commit()
    user = User(
        email=user_in.email, hashed_password=hashed_password, person_id=person.id
    )
    db.add(user)
    db.commit()
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/auth/signin", response_model=Token)
def signin(user_in: UserSignIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    try:
        print("ree")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )
        user = (
            db.query(User)
            .filter(User.email == user_email)
            .options(joinedload(User.person))
            .first()
        )
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )


@app.post("/send-parcel")
def send_parcel(
    parcel: ParcelIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    recipient = db.query(Person).filter(Person.email == parcel.recipient.email).first()
    if recipient is None:
        recipient = Person(
            phone_number=parcel.recipient.phone_number,
            email=parcel.recipient.email,
            first_name=parcel.recipient.first_name,
            last_name=parcel.recipient.last_name,
        )
        db.add(recipient)
        db.commit()

    destination = Address(person_id=recipient.id, **parcel.recipient.address)
    db.add(destination)
    origin = Address(person_id=current_user.id, **parcel.sender.address)
    db.add(origin)
    db.commit()

    new_parcel = Parcel(
        sender_id=current_user.id,
        recipient_id=recipient.id,
        origin_id=origin.id,
        destination_id=destination.id,
    )

    db.add(new_parcel)
    db.commit()
    return parcel


@app.post("/update-parcel-status")
def update_parcel_status(
    status: StatusIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    status = ParcelStatus(status=status.status, parcel_id=status.parcel_id)
    db.add(status)
    db.commit()

    return status


@app.get("/parcels")
def parcels(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    parcels = (
        db.query(Parcel)
        .filter(Parcel.sender_id == current_user.id)
        .options(
            joinedload(Parcel.sender),
            joinedload(Parcel.recipient),
            joinedload(Parcel.destination),
            joinedload(Parcel.origin),
        )
        .order_by(desc(Parcel.sent_date))
        .all()
    )

    return parcels


@app.get("/user/me")
def read_user_me(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return current_user


# Non-protected routes


@app.get("/track-parcel")
def track_parcel(
    parcel_id: int,
    db: Session = Depends(get_db),
):
    parcel = (
        db.query(Parcel)
        .options(
            joinedload(Parcel.sender),
            joinedload(Parcel.recipient),
            joinedload(Parcel.destination),
            joinedload(Parcel.origin),
            joinedload(Parcel.status_history),
        )
        .get(parcel_id)
    )
    if parcel is None:
        raise HTTPException(status_code=404, detail="Parcel not found")
    return parcel
