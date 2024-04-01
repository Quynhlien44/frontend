import visitApi from "../services/visitApi";
import axiosClient from "../services/utils/axiosClient";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, VISIT_ENDPOINT } from "../services/utils/configApi";
import { DOCTOR_TOKEN, VISIT_MOCK_DATA } from "./helper";

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

describe("visitApi - getAll", () => {
  test("should retrieve visits successfully with Doctor token", async () => {
    // Mock data for successful response
    const responseData = VISIT_MOCK_DATA;

    mock.onGet(`${BASE_URL}${VISIT_ENDPOINT}`).reply(200, responseData);

    // Set the doctor token in local storage:
    localStorage.setItem("token", DOCTOR_TOKEN);

    const response = await visitApi.getAll();

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${BASE_URL}${VISIT_ENDPOINT}`);

    // Verify the request headers contain the doctor's token
    expect(mock.history.get[0].headers.Authorization).toBe(
      `Bearer ${DOCTOR_TOKEN}`
    );

    // Verify the response data
    expect(response).toMatchObject(responseData);
    expect(response.length).toEqual(responseData.length);
  });
});

describe("visitApi - create", () => {
  test("should create a visit successfully with Doctor token", async () => {
    // Mock data for successful response
    const responseData = VISIT_MOCK_DATA[0];

    mock.onPost(`${BASE_URL}${VISIT_ENDPOINT}`).reply(201, responseData);

    // Set the doctor token in local storage:
    localStorage.setItem("token", DOCTOR_TOKEN);

    const response = await visitApi.create({});

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${BASE_URL}${VISIT_ENDPOINT}`);

    // Verify the request headers contain the doctor's token
    expect(mock.history.post[0].headers.Authorization).toBe(
      `Bearer ${DOCTOR_TOKEN}`
    );

    // Verify the response data
    expect(response).toMatchObject(responseData);
  });
});
