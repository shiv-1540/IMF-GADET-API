const request = require("supertest");
const server = require("../server"); // Import the running server

let token;

beforeAll(async () => {
  const loginResponse = await request(server)
    .post("/api/login")
    .send({ username: "imf_agent", password: "password123" });

  token = loginResponse.body.token;
});

afterAll(async () => {
  server.close(); // Close the server after tests
});

describe("IMF Gadget API", () => {
  test("GET /api/gadgets - should return gadgets list", async () => {
    const response = await request(server)
      .get("/api/gadgets")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("POST /api/gadgets - should create a new gadget", async () => {
    const response = await request(server)
      .post("/api/gadgets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "The Nightingale" });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("The Nightingale");
  });

  test("POST /api/gadgets/:id/self-destruct - should destroy gadget", async () => {
    const createResponse = await request(server)
      .post("/api/gadgets")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "The Kraken" });

    const gadgetId = createResponse.body.id;

    const destroyResponse = await request(server)
      .post(`/api/gadgets/${gadgetId}/self-destruct`)
      .set("Authorization", `Bearer ${token}`);

    expect(destroyResponse.statusCode).toBe(200);
    expect(destroyResponse.body.message).toBe("Gadget destroyed");
  });
});
