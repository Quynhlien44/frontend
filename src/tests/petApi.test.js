import petApi from "../services/petApi";
import axiosClient from "../services/utils/axiosClient";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL, PET_ENDPOINT } from "../services/utils/configApi";
import {
  PETS_MOCK_DATA,
  DOCTOR_TOKEN,
  INVALID_TOKEN,
  OWNER1_TOKEN,
} from "./helper";

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

describe("petApi - getAll", () => {
  it("should retrieves all pets successfully by doctors", async () => {
    const responseData = PETS_MOCK_DATA;

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}`).reply(200, responseData);

    // TODO: Set the doctor token in local storage:
    localStorage.setItem("token", DOCTOR_TOKEN);

    const response = await petApi.getAll();

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

    // Verify the request headers contain the doctor's token
    expect(mock.history.get[0].headers.Authorization).toBe(
      `Bearer ${DOCTOR_TOKEN}`
    );

    // Verify the response data
    expect(response).toMatchObject(responseData);
    expect(response.length).toEqual(responseData.length);
  });

  it("should fails to retrieve all pets by invalid token", async () => {
    localStorage.setItem("token", INVALID_TOKEN);

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}`).reply(401);
    try {
      await petApi.getAll();
    } catch (error) {
      // Verify that the request was made:
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

      // Verify that the request headers contain the invalid token:
      expect(mock.history.get[0].headers.Authorization).toBe(
        `Bearer ${INVALID_TOKEN}`
      );

      // Verify that the error response status is 401:
      expect(error.response.status).toBe(401);
    }
  });

  it("Should retrieves all pets successfully by an owner", async () => {
    const ownerId = 1;
    const ownerToken = OWNER1_TOKEN;
    const ownerPets = PETS_MOCK_DATA.filter((pet) => pet.ownerId === ownerId);
    console.log("Owner Pets", ownerPets);

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}`).reply(200, ownerPets);

    localStorage.setItem("token", ownerToken);
    console.log("Owner token: ", ownerToken);

    const response = await petApi.getAll();

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

    // Verify the request headers contain the owner's token
    expect(mock.history.get[0].headers.Authorization).toBe(
      `Bearer ${ownerToken}`
    );

    // Verify the response data contains only pets belonging to the owner
    expect(response).toMatchObject(ownerPets);
    expect(response.length).toEqual(ownerPets.length);
    console.log("response ", response);
  });
});

describe("petApi - getOne", () => {
  it("should retrieve a pet successfully", async () => {
    const petId = 1;
    const pet = PETS_MOCK_DATA.find((pet) => pet.id === petId);

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(200, pet);

    const response = await petApi.getOne(petId);

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}/${petId}`);

    expect(response).toMatchObject(pet);
  });

  it("should fail to retrieve a pet with an invalid id", async () => {
    const petId = 100;

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(404);

    try {
      await petApi.getOne(petId);
    } catch (error) {
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(
        `${BASE_URL}${PET_ENDPOINT}/${petId}`
      );

      expect(error.response.status).toBe(404);
    }
  });

  it("should fail to retrieve a pet with an invalid token", async () => {
    const petId = 1;

    localStorage.setItem("token", INVALID_TOKEN);

    mock.onGet(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(401);

    try {
      await petApi.getOne(petId);
    } catch (error) {
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(
        `${BASE_URL}${PET_ENDPOINT}/${petId}`
      );

      expect(error.response.status).toBe(401);
    }
  });

  it;
});

describe("petApi - create", () => {
  it("should create a pet successfully", async () => {
    const newPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    mock.onPost(`${BASE_URL}${PET_ENDPOINT}`).reply(201, newPet);

    const response = await petApi.create(newPet);

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

    expect(response).toMatchObject(newPet);
  });

  it("should fail to create a pet with an invalid token", async () => {
    const newPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    localStorage.setItem("token", INVALID_TOKEN);

    mock.onPost(`${BASE_URL}${PET_ENDPOINT}`).reply(401);

    try {
      await petApi.create(newPet);
    } catch (error) {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

      expect(error.response.status).toBe(401);
    }
  });

  it("should fail to create a pet with missing fields", async () => {
    const newPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
    };

    mock.onPost(`${BASE_URL}${PET_ENDPOINT}`).reply(400);

    try {
      await petApi.create(newPet);
    } catch (error) {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

      expect(error.response.status).toBe(400);
    }
  });

  it("should fail to create a pet with an invalid ownerId", async () => {
    const newPet = {
      ownerId: 100,
      name: "Buddy",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    mock.onPost(`${BASE_URL}${PET_ENDPOINT}`).reply(404);

    try {
      await petApi.create(newPet);
    } catch (error) {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}`);

      expect(error.response.status).toBe(404);
    }
  });
});

describe("petApi - update", () => {
  it("should update a pet successfully", async () => {
    const petId = 1;
    const updatedPet = {
      ownerId: 1,
      name: "Lucky",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    mock.onPut(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(200, updatedPet);

    const response = await petApi.update(petId, updatedPet);

    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toBe(`${BASE_URL}${PET_ENDPOINT}/${petId}`);

    expect(response).toMatchObject(updatedPet);
  });

  it("should fail to update a pet with an invalid token", async () => {
    const petId = 1;
    const updatedPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    localStorage.setItem("token", INVALID_TOKEN);

    mock.onPut(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(401);

    try {
      await petApi.update(petId, updatedPet);
    } catch (error) {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(
        `${BASE_URL}${PET_ENDPOINT}/${petId}`
      );

      expect(error.response.status).toBe(401);
    }
  });

  it("should fail to update a pet with missing fields", async () => {
    const petId = 1;
    const updatedPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
    };

    mock.onPut(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(400);

    try {
      await petApi.update(petId, updatedPet);
    } catch (error) {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(
        `${BASE_URL}${PET_ENDPOINT}/${petId}`
      );

      expect(error.response.status).toBe(400);
    }
  });

  it("should fail to update a pet with an invalid id", async () => {
    const petId = 100;
    const updatedPet = {
      ownerId: 1,
      name: "Buddy",
      petType: "dog",
      status: "alive",
      dob: "2019-10-07",
    };

    mock.onPut(`${BASE_URL}${PET_ENDPOINT}/${petId}`).reply(404);

    try {
      await petApi.update(petId, updatedPet);
    } catch (error) {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(
        `${BASE_URL}${PET_ENDPOINT}/${petId}`
      );

      expect(error.response.status).toBe(404);
    }
  });
});
