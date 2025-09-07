import { producer } from "../config/kafka/kafka";

export const sendOrderToWarehouse = async (order: any) => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: "ai-ecommerce",
    messages: [{ value: JSON.stringify(order) }],
  }),
    await producer.disconnect();
};
