import logging

from sqlalchemy.sql import func

from airy.utils.date import tz_now, day_beginning, week_beginning
from airy.database import db
from airy.models import Task, TimeEntry
from airy import settings
from airy.serializers import UserSerializer
from airy.exceptions import UserError

logger = logging.getLogger(__name__)


class User(object):

    def __init__(self):
        self.name = settings.username

    @classmethod
    def login(cls, session, data):
        if data.get('password') == settings.password:
            session['user'] = settings.username
            return cls().serialize()
        raise UserError('Incorrect password', 400)

    @property
    def open_tasks(self):
        query = db.session.query(Task).filter(Task.status == "open")
        return query.count()

    @property
    def total_today(self):
        now = tz_now()
        query = db.session.query(func.sum(TimeEntry.amount)).\
            filter(TimeEntry.added_at >= day_beginning(now))
        return query.scalar() or 0

    @property
    def total_week(self):
        now = tz_now()
        query = db.session.query(func.sum(TimeEntry.amount)).\
            filter(TimeEntry.added_at >= week_beginning(now))
        return query.scalar() or 0

    def serialize(self):
        return UserSerializer().dump(self).data