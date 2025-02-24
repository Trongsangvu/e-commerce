"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const Errorhandler_1 = __importDefault(require("./middleware/Errorhandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Connect to MongoDB
(0, database_1.connectDB)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
// Handler Error
app.use(Errorhandler_1.default);
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map