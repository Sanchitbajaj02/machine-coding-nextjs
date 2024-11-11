"use server";
import axios from "axios";

export const searchUser = async (filter: string) => {
  const url = `https://dummyjson.com/users/search?q=${filter}`;
  try {
    const { data: apiResponse } = await axios.get(url);

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};
