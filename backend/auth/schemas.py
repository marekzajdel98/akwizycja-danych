from pydantic import BaseModel


class UserSignUp(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class UserSignIn(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
