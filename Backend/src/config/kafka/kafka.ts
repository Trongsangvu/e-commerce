import { Kafka } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");

const kafka = new Kafka({
  clientId: "ai-ecommerce",
  brokers,
});

const producer = kafka.producer(); // Send message
const consumer = kafka.consumer({ groupId: "order-group" }); // Listen event from topic

export { producer, consumer };
