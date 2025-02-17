# Các thư mục cần thiết (Necessary):
- api products 
- Note: 
    - Sử dụng JWT token cho authentication
    - Phân quyền rõ ràng (user thường/admin)
    - Validate dữ liệu đầu vào

*JWT token*:
    - Token nên bao gồm: userId, role, expiration time
    - Nên set thời gian hết hạn (expiration time) phù hợp, thường là 24h-48h
    - Lưu token trong httpOnly cookie thay vì localStorage để tránh XSS
    - Nên có refresh token để cấp mới access token
    - Blacklist token khi user logout

- Một số trường hợp sử dụng JWT:
    - Authentication: Xác thực người dùng đã đăng nhập
        1. User gửi email/password
        2. Server check thông tin
        3. Nếu đúng -> tạo JWT token
        4. Gửi token về client
        5. Client lưu token và gửi kèm mỗi request

    - Authorization: Kiểm tra quyền truy cập API
        - Xác định người dùng có quyền làm gì trong hệ thống

    - Single Sign On: Đăng nhập một lần cho nhiều service
        - Cho phép đăng nhập 1 lần, dùng nhiều service

    - API Gateway: Verify request trước khi forward
        - Là cổng kiểm soát request trước khi đến services:
            1. Nhận request từ client
            2. Verify JWT token
            3. Nếu hợp lệ -> chuyển request đến service tương ứng
            4. Nếu không -> trả về lỗi

## API Public (Không cần JWT):
*API đăng nhập/đăng ký*
- API xem sản phẩm 
- API tìm kiếm
- API xem danh mục

*API Private (Cần JWT):*
- API thêm vào giỏ hàng
- API đặt hàng
- API xem thông tin cá nhân
- API quản lý sản phẩm (admin)

*Quy trình sử dụng JWT:*
1. User đăng nhập thành công -> nhận JWT
2. Frontend lưu JWT (thường trong cookie)
3. Mỗi lần gọi API private:
   - Frontend tự động gửi JWT trong header
   - Backend kiểm tra JWT trước khi xử lý request
4. Nếu JWT hết hạn -> yêu cầu đăng nhập lại



┃ ┣ 📂 controllers      *Xử lý logic API*
- Chứa các controller xử lý request/response
- Điều phối luồng dữ liệu giữa client và server
- Gọi các service để xử lý logic nghiệp vụ

┃ ┣ 📂 middleware       *Xác thực, bảo mật*
- Xử lý authentication/authorization
- Validate request
- Xử lý lỗi
- Các middleware khác như logging, CORS...

┃ ┣ 📂 routes          *Định tuyến API endpoint*
- Định nghĩa các endpoint API
- Kết nối URL với controller tương ứng
- Phân nhóm các route theo chức năng

┃ ┣ 📂 services        *Xử lý nghiệp vụ*
- Chứa business logic
- Tương tác với database thông qua Prisma
- Xử lý các nghiệp vụ phức tạp

┃ ┣ 📂 prisma          *Prisma ORM config*
- Schema định nghĩa cấu trúc database
- Cấu hình kết nối database
- Migration files

┃ ┣ 📂 Models: *Định nghĩa schema database*

┃ ┣ 📜 app.ts       *Khởi chạy server*
- Entry point của ứng dụng
- Cấu hình Express/Node server
- Kết nối các middleware và routes

# Các thư mục tùy chọn (Optional):

┃ ┣ 📂 utils           *Các hàm hỗ trợ*
- Helper functions
- Constants
- Common utilities

┃ ┣ 📂 tests          *Các test case*
- Unit tests
- Integration tests
- Test utilities

┃ ┣ 📂 docs           *Các tài liệu*
- API documentation
- Setup guides
- Other documentation

┃ ┣ 📂 types          *Các kiểu dữ liệu*
- TypeScript interfaces
- Type definitions
- Custom types

## API:
*Authentication APIs:*

POST /api/auth/register - Đăng ký tài khoản
POST /api/auth/login - Đăng nhập
POST /api/auth/logout - Đăng xuất

*Product APIs:*

GET /api/products - Lấy danh sách sản phẩm
GET /api/products/{id} - Lấy chi tiết một sản phẩm
GET /api/products/categories - Lấy danh sách danh mục
GET /api/products/search - Tìm kiếm sản phẩm

*Cart APIs:*

GET /api/cart - Xem giỏ hàng
POST /api/cart - Thêm sản phẩm vào giỏ
PUT /api/cart/{id} - Cập nhật số lượng
DELETE /api/cart/{id} - Xóa sản phẩm khỏi giỏ

*Order APIs:*

POST /api/orders - Tạo đơn hàng
GET /api/orders - Xem danh sách đơn hàng
GET /api/orders/{id} - Xem chi tiết đơn hàng
PUT /api/orders/{id} - Cập nhật trạng thái đơn hàng

*User Profile APIs:*

GET /api/users/profile - Xem thông tin cá nhân
PUT /api/users/profile - Cập nhật thông tin
GET /api/users/addresses - Quản lý địa chỉ giao hàng

*Review & Rating APIs:*

POST /api/products/{id}/reviews - Đánh giá sản phẩm
GET /api/products/{id}/reviews - Xem đánh giá