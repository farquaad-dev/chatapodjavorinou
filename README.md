# Chata pod Javorinou web

## Inštalácia

Na spustenie je potrebné mať [NodeJS](https://nodejs.org/en), [Python 3.9](https://python.org/) a [Poetry](https://python-poetry.org/docs/#installation).

Inštalácia dependencies:

```bash
  npm install
  poetry install
```

Aplikovanie Django migrácií (štandardne sa vyrobí SQlite databáza):

```bash
  poetry shell
  cd chatapodjavorinou
  python3 manage.py migrate
```

Vytvorenie admin usera:

```bash
  python3 manage.py createsuperuser
```

Spustenie TailwindCSS a vývojového Django servera:

```bash
  npm run css-dev & python3 manage.py runserver && fg
```
