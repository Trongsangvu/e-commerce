"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import http from 'http';
const database_1 = require("./config/database");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const Errorhandler_1 = __importDefault(require("./middleware/Errorhandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Connect to MongoDB
(0, database_1.connectDB)();
// Webhook
app.use('/api/webhook', express_1.default.raw({ type: 'application/json' }), webhook_routes_1.default);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Create http server
// export const server = http.createServer(app);
// Routes
app.use('/api/products', product_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/carts', cart_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.use('/api/payment', payment_routes_1.default);
// Handler Error
app.use(Errorhandler_1.default);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map