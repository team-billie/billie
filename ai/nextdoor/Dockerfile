FROM python:3.10-slim

WORKDIR /app

# 시스템 의존성 (Pillow 등)
RUN apt-get update \
  && apt-get install -y build-essential libglib2.0-0 libglib2.0-dev \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]