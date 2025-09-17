Got it—you want to run **Kafka with Docker** on your local Ubuntu system. The easiest way is using **Docker + Docker Compose** so both Kafka and Zookeeper run together with proper networking.

Here’s the full setup:

---

## **Step 1: Install Docker & Docker Compose**

If you don’t have them already:

```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

Log out and log back in to apply the group change.

---

## **Step 2: Create a `docker-compose.yml`**

Create a folder:

```bash
mkdir kafka-docker && cd kafka-docker
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.1
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.6.1
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    ports:
      - "8081:8081"
    depends_on:
      - kafka
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092
      KAFKA_CLUSTERS_0_ZOOKEEPER: zookeeper:2181
```

---

## **Step 3: Start Kafka & Zookeeper**

Run:

```bash
docker-compose up -d
```

Check logs:

```bash
docker-compose logs -f kafka
```

---

## **Step 4: Create a Kafka Topic**

```bash
docker exec -it $(docker ps --filter "name=kafka" --format "{{.ID}}") \
  kafka-topics --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

---

## **Step 5: Produce & Consume Messages**

* **Producer**:

```bash
docker exec -it $(docker ps --filter "name=kafka" --format "{{.ID}}") \
  kafka-console-producer --topic test-topic --bootstrap-server localhost:9092
```

* **Consumer**:

```bash
docker exec -it $(docker ps --filter "name=kafka" --format "{{.ID}}") \
  kafka-console-consumer --topic test-topic --bootstrap-server localhost:9092 --from-beginning
```

---

## **Step 6: Stop the Services**

```bash
docker-compose down
```
