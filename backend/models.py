from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base
import json

class Pack(Base):
    __tablename__ = "packs"

    id = Column(Integer, primary_key=True, index=True)
    theme = Column(String, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())
    data = Column(Text, nullable=False)  # JSON du pack complet

    def to_dict(self):
        return {
            "id": self.id,
            "theme": self.theme,
            "date": self.date,
            "data": json.loads(self.data)
        }
