import loginApi from "../services/loginApi";
import axiosClient from "../services/utils/axiosClient";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, LOGIN_ENDPOINT } from "../services/utils/configApi";

describe("loginApi", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axiosClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test("login sends request with correct data", async () => {
    const loginData = { username: "doctor@pets.com", password: "Pet1234" };
    const responseData = {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng",
      id: 0,
    };

    mock.onPost(LOGIN_ENDPOINT).reply(200, responseData);

    const response = await loginApi.login(loginData);

    // Verify the endpoint is correct
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${BASE_URL}${LOGIN_ENDPOINT}`);

    // Verify the request data
    expect(JSON.parse(mock.history.post[0].data)).toMatchObject(loginData);

    // Verify the response data
    expect(response).toMatchObject(responseData);
  });

  test("login sends request with incorrect data", async () => {
    const loginData = { username: "doctor@pets.com", password: "Pet1113" };
    const errorResponse = {
      message:
        "The submitted credentials could not be validated. Please check your input. ",
    };

    mock.onPost(LOGIN_ENDPOINT).reply(401, errorResponse);

    try {
      await loginApi.login(loginData);
    } catch (error) {
      // Verify the endpoint is correct
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${BASE_URL}${LOGIN_ENDPOINT}`);

      // Verify the request data
      expect(JSON.parse(mock.history.post[0].data)).toMatchObject(loginData);

      // Verify the error response
      expect(error.response.status).toBe(401);
      expect(error.response.data).toMatchObject(errorResponse);
    }
  });
});
