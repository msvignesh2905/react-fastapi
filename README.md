## Introduction

Simple User Login and Registration using **React** and **Fast API** with **OAUTH** authentication with **JWT** token

## Technologies Used

- React
- FastAPI
- OAuth
- JWT
- SQLAlchemy (ORM)
- SQLite (Database)

## Prerequisites
1. Install Node.js
2. Install Python 3.7+
3. Install Pip (python package manager )

## Running Locally
**1. Clone the Repo**

```shell
git clone https://github.com/msvignesh2905/react-fastapi.git
cd react-fastapi
git checkout master
```
**2. Install Node.js on your machine**

**3. Install frontend dependencies**

```shell
cd frontend
npm install
```
**4. Install backend dependencies**

create virtual environment and activate it. Here i create for linux

```shell
cd backend
python -m venv venv
cd source venv/bin/activate
pip install -r requirements.txt
```
**5. Start backend service**

```shell
uvicorn main:app --reload
```
**6. Start frontend service**

```bash
cd frontend
npm strat
```
Your Application is now ready to serve.
