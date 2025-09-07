import request from "supertest";
import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test endpoint working" });
});

describe("App Tests", () => {
  test("should return 200 for test endpoint", async () => {
    const response = await request(app).get("/test").expect(200);

    expect(response.body).toEqual({ message: "Test endpoint working" });
  });

  test("should return 404 for non-existent endpoint", async () => {
    await request(app).get("/non-existent").expect(404);
  });
});
