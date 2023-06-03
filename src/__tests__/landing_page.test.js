import axios from "axios";
import dataOne from "../data/Alldata";
import { ApiCall } from "../components/HomePage/HomePage";
// Rest of your code...

// Assuming you have a function that makes an API call
async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

// Jest test case
describe("API call test", () => {
  it("should make an API call and return data", async () => {
    // Mock the axios.get function to return a mock response
    axios.get = jest.fn().mockResolvedValue({ data: dataOne });

    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const data = await ApiCall(url);

    // Expect the axios.get function to be called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(url);

    // Expect the returned data to match the mock response
    expect(data).toEqual(dataOne);
  });
});
