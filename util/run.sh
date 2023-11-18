#!/bin/sh

npm run css-prod
poetry run python manage.py collectstatic --noinput
poetry run python manage.py migrate
poetry run gunicorn django_project.wsgi --bind=0.0.0.0:80

