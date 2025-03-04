### **🔹 5. Xử lý Đơn Hàng (Order Management)**

📌 **Các API quan trọng**:

- `POST /api/orders/create` → Tạo đơn hàng.
- `GET /api/orders` → Lấy danh sách đơn hàng của khách.
- `PUT /api/orders/:id/status` → Cập nhật trạng thái đơn hàng.

📌 **Quy trình xử lý**:
1️⃣ Khi thanh toán thành công, tạo đơn hàng mới.

2️⃣ Giảm số lượng hàng trong kho.

3️⃣ Gửi email xác nhận đơn hàng.

4️⃣ Gửi đơn hàng tới hệ thống vận chuyển.

📌 **Công nghệ**:

- **RabbitMQ / Kafka**: Đảm bảo đơn hàng được xử lý chính xác.
- **Twilio / Firebase Cloud Messaging**: Gửi thông báo đơn hàng cho khách.

---

**Workflow - Orders - test in Postman:**

- /api/users/login: Get user’s token
- /api/products: Get id products
- /api/carts: In this step we must make sure that Redis connected
- Create orders: /api/orders/create:
    - Get user’s token in login step
    - body: products: [{productId: …, quantity: …}], totalAmount: …, paymentMethod: …
- Get orders: /api/orders
    - Get user’s token

---

- **Send order to Kafka:**
    - When the order is created, it will be sent to kafka (sendOrderToWarehouse()) to synchronize with the warehouse
- **Send Notification Firebase:**
    - If user have **uerFcmToken**, Firebase will send  push notifications about orders.
- **Send SMS messages via Twilio:**
    - If user have phone number, Twilio will messages confirm order.
- **Delete cache redis:**
    - when a new order is created, the order list cache is cleared to update with new data.

[Kafka with docker](https://www.notion.so/Kafka-with-docker-1aae121cf50c8007938ec7c140577e6f?pvs=21)



stripe listen --forward-to http://localhost:3000/api/webhook/stripe 

Khi có webhook, Stripe CLI sẽ log stripe-signature, ví dụ:
Webhook received: payment_intent.succeeded
Stripe-Signature: t=1710001234,v1=abc123,v0=xyz456

console.log("Received Stripe Signature:", req.headers["stripe-signature"]);

stripe payment_intents confirm pi_3QymivQ4ZCJ00Aki2Hwq3dUb --payment-method=pm_card_visa