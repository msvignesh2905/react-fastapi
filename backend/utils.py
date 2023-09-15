

from datetime import datetime


def convert_str_to_date(date_str: str):
    return datetime.strptime(date_str, "%Y-%m-%d")

def convert_date_to_str(date: datetime):
    return date.strftime("%Y-%m-%d")