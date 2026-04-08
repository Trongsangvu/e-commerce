import { Kafka } from "kafkajs";
import { CONSTANTS } from "../configs/constants";

const brokers = (CONSTANTS.KAFKA_BROKERS || "localhost:9092").split(",");

const kafka = new Kafka({
  clientId: "ai-ecommerce",
  brokers,
});

export const producer = kafka.producer(); // Send message
export const consumer = kafka.consumer({ groupId: "order-group" }); // Listen event from topic

export const sendOrderToWarehouse = async (order: any) => {
  // Producing
  await producer.connect();
  (await producer.send({
    topic: "ai-ecommerce",
    messages: [{ value: JSON.stringify(order) }],
  }),
    await producer.disconnect());
};
