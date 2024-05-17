from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


class Person(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True, nullable=False)
    last_name = Column(String, index=True, nullable=False)
    phone_number = Column(String)
    email = Column(String, unique=True, index=True)
    age = Column(Integer)

    user = relationship("User", uselist=False, back_populates="person")
    addresses = relationship("Address", back_populates="person")

    sent_parcels = relationship(
        "Parcel", foreign_keys="Parcel.sender_id", back_populates="sender"
    )
    received_parcels = relationship(
        "Parcel", foreign_keys="Parcel.recipient_id", back_populates="recipient"
    )


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    registered_on = Column(DateTime, default=func.now())
    hashed_password = Column(String)

    person_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    person = relationship("Person", uselist=False, back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True)
    person_id = Column(Integer, ForeignKey("people.id"))
    street = Column(String)
    city = Column(String)
    zip_code = Column(String)

    # person = relationship("Person", back_populates="addresses")
    person = relationship("Person", back_populates="addresses")
    parcels_originating = relationship(
        "Parcel", foreign_keys="Parcel.origin_id", back_populates="origin"
    )
    parcels_destined = relationship(
        "Parcel", foreign_keys="Parcel.destination_id", back_populates="destination"
    )


class Parcel(Base):
    __tablename__ = "parcels"

    id = Column(Integer, primary_key=True)
    is_delivered = Column(Boolean, default=False, index=True)
    sent_date = Column(DateTime, default=func.now())
    delivery_date = Column(DateTime, nullable=True)

    sender_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    recipient_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    origin_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)

    sender = relationship(
        "Person", foreign_keys=[sender_id], back_populates="sent_parcels"
    )
    recipient = relationship(
        "Person", foreign_keys=[recipient_id], back_populates="received_parcels"
    )
    origin = relationship(
        "Address", foreign_keys=[origin_id], back_populates="parcels_originating"
    )
    destination = relationship(
        "Address", foreign_keys=[destination_id], back_populates="parcels_destined"
    )

    status_history = relationship("ParcelStatus", back_populates="parcel")


class ParcelStatus(Base):
    __tablename__ = "parcel_status"

    id = Column(Integer, primary_key=True)
    parcel_id = Column(Integer, ForeignKey("parcels.id"))
    status = Column(String)
    status_date = Column(DateTime, default=func.now())

    parcel = relationship("Parcel", back_populates="status_history")
