from pydantic import BaseModel


class Address(BaseModel):
    zip_code: str
    city: str
    street: str


class PersonalDetails(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: dict


class ParcelIn(BaseModel):
    sender: PersonalDetails
    recipient: PersonalDetails


class StatusIn(BaseModel):
    parcel_id: int
    status: str
