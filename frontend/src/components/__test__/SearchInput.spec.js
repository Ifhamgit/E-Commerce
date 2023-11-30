import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "../Form/SearchInput";
import axios from "axios";

jest.mock("../../context/search", () => ({
  useSearch: () => [{ keyword: "test", results: [] }, jest.fn()], // Mock useSearch with default values
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(), // Mock useNavigate with a mock function
}));

jest.mock("axios");

describe("SearchInput", () => {
  it("submits search and navigates to search page", async () => {
    const mockData = [{ id: 1, name: "Product_1" }, { id: 2, name: "Product_2" }];
    const mockSetValues = jest.fn();
    const mockNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    // Mock axios.get to return mockData when called with a specific URL
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { getByPlaceholderText, getByText } = render(<SearchInput />);

    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.submit(getByText("Search"));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/api/v1/product/search/test");
      
    });
  });
});






