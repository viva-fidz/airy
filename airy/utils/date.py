from datetime import datetime

import pytz
import arrow

from airy import settings

timezone = pytz.timezone(settings.TIMEZONE)


def tz_now() -> datetime:
    return arrow.now(settings.TIMEZONE).datetime


def day_beginning(dt: datetime) -> datetime:
    return arrow.get(dt).floor('day').datetime


def week_beginning(dt: datetime) -> datetime:
    return arrow.get(dt).floor('week').datetime


def is_day_beginning(dt: datetime) -> bool:
    dt_ = arrow.get(dt)
    return dt_ == dt_.to(settings.TIMEZONE).floor('day')


def is_day_end(dt: datetime) -> bool:
    dt_ = arrow.get(dt)
    return (dt_.replace(microsecond=0) ==
            dt_.to(settings.TIMEZONE).ceil('day').replace(microsecond=0))


def localize(dt: datetime) -> datetime:
    return dt.astimezone(tz=timezone)
