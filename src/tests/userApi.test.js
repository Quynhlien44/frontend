import userApi from "../services/userApi";
import axiosClient from "../services/utils/axiosClient";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, USER_ENDPOINT } from "../services/utils/configApi";
import { DOCTOR_TOKEN, USER_MOCK_DATA } from "./helper";

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

describe("userApi - getUser", () => {
  test("should retrieve users successfully with Doctor token", async () => {
    mock.onGet(`${BASE_URL}${USER_ENDPOINT}`).reply(200, USER_MOCK_DATA);

    // Set the doctor token in local storage:
    localStorage.setItem("token", DOCTOR_TOKEN);

    const response = await userApi.getUser();

    //console.log("User test response", response);

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${BASE_URL}${USER_ENDPOINT}`);

    // Verify the request headers contain the doctor's token
    expect(mock.history.get[0].headers.Authorization).toBe(
      `Bearer ${DOCTOR_TOKEN}`
    );

    // Verify the response data
    expect(response).toMatchObject(USER_MOCK_DATA);
    expect(response.length).toEqual(USER_MOCK_DATA.length);
  });
});
