# Kafka Example
Based on: https://medium.com/@theotow/event-sourcing-with-kafka-and-nodejs-9787a8e47716

## How did I create a topic?
- `docker-compose up`
- `docker run --rm -it --net=host landoop/fast-data-dev kafka-topics --zookeeper 127.0.0.1:2181 --topic TutorialTopic --replication-factor 1 --partitions 100 --create`

## avro:
avsc is the nodejs equivalent of avro. Within `src/producer/schema` is a example for making a schema with nest object
encoding the schema approved object and decoding the object back into human readable text.

## run steps:
Assuming a topic has already been created
- `docker-compose up`
- TERM1: `npm run start-consumer`
- TERM2: `npm run start-producer`
