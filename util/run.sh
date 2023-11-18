#!/bin/sh

npm run css-prod
poetry run python manage.py collectstatic --noinput
poetry run python manage.py migrate
poetry run gunicorn chatapodjavorinou.wsgi --bind=0.0.0.0:80

