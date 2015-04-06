import datetime
from decimal import Decimal

from airy.utils import date, email, template_filters


class TestDateUtils():

    def test_tz_now(self):
        now = date.tz_now()
        assert now.tzinfo is not None

    def test_day_beginning(self):
        dt = datetime.datetime(2015, 3, 23, 20, 20, 20, tzinfo=date.timezone)
        beginning = date.day_beginning(dt)
        assert beginning.hour == 0
        assert beginning.minute == 0
        assert beginning.second == 0
        assert beginning.date() == dt.date()

    def test_week_beginning(self):
        dt = datetime.datetime(2015, 3, 24, 20, 20, 20, tzinfo=date.timezone)
        beginning = date.week_beginning(dt)
        assert beginning.hour == 0
        assert beginning.minute == 0
        assert beginning.second == 0
        assert beginning.date() == dt.date() - datetime.timedelta(days=1)


class TestEmailUtils():

    def test_send(self, mocker):
        smtp_mock = mocker.patch('airy.utils.email.smtplib.SMTP')
        email.send('TestSubject', 'TestContent', 'test@example.net')
        session_mock = smtp_mock.return_value
        assert session_mock.login.called
        assert session_mock.send_message.call_count == 1
        message = session_mock.send_message.call_args[0][0]
        assert message['Subject'] == 'TestSubject'
        assert message['To'] == 'test@example.net'


class TestTemplateFilters(object):

    def test_time_filter(self):
        result_1 = template_filters.time_filter(Decimal('0.00'))
        assert result_1 == '0:00'
        result_2 = template_filters.time_filter(Decimal('32.50'))
        assert result_2 == '32:30'
        result_3 = template_filters.time_filter(Decimal('1.1667'))
        assert result_3 == '1:10'
