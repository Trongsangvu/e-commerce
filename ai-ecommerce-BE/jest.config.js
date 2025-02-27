module.exports = {
    preset: 'ts-jest',  // Hỗ trợ TypeScript
    testEnvironment: 'node', // Chạy Jest trong môi trường Node.js
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  };
  