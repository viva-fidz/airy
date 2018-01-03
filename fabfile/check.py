from fabric.api import task, local

from utils import virtualenv


@task
def js():
    local('npm run grunt check:js --silent')


@task
def css():
    local('npm run grunt check:css --silent')


@task
def html():
    local('npm run grunt check:html --silent')


@task
def py_style():
    with virtualenv():
        local('flake8 --max-complexity=8 fabfile')
        local('flake8 --max-complexity=10 airy')
        local('flake8 --max-complexity=8 alembic/env.py')


@task
def py_security():
    with virtualenv():
        local('safety check --bare')
        local('bandit -r -x tests,settings airy')


@task
def py_types():
    with virtualenv():
        local('mypy --ignore-missing-imports airy')


@task
def py_unit():
    with virtualenv():
        local('py.test -v -x --pdb '
              '--cov airy '
              '--cov-config .coveragerc '
              'airy/tests')


@task
def frontend():
    js()
    css()
    html()


@task
def backend():
    py_style()
    py_security()
    py_types()
    py_unit()


@task(default=True)
def all():
    frontend()
    backend()
