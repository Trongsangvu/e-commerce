- components/: Tái sử dụng UI component
- context/: Quản lý global state
- features/: Nhóm chức năng theo tính năng
- hooks/: Custom hooks
- pages/: Các trang chính của ứng dụng
- services/: Xử lý API và logic nghiệp vụ
- types/: Định nghĩa TypeScript
- utils/: Các hàm tiện ích

Frontend: React + TypeScript
Backend: Node.js/Express
Quản lý state: Context API
Routing: React Router
Styling: Tailwind CSS
AI tích hợp ở cả frontend/backend


# features/search:
        search/               # Tính năng tìm kiếm
│       ├── components/       # Chứa các component liên quan đến tìm kiếm
│       │   ├── SearchBar.tsx # Component tìm kiếm
│       │   └── SearchResults.tsx  # Component hiển thị kết quả tìm kiếm
│       │
│       ├── api/              # Các service gọi API
│       │   └── searchService.ts # Gọi API backend để tìm kiếm
│       │
│       ├── searchSlice.ts    # Redux slice quản lý state tìm kiếm
│       └── index.ts          # Dùng để export tất cả các phần liên quan đến search feature
- app/store.ts: config Redux store

