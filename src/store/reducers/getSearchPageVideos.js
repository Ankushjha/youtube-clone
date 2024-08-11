import { createAsyncThunk } from "@reduxjs/toolkit";  //this will simplify asyncronus calls and also we dispatch action based on results
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
// console.log("API Key:", API_KEY);

export const getSearchPageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async (isNext, { getState }) => {     //getState is used to access current redux state {enable redux state}, isNext is boolean to check wether we're fetching the data or not.

        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState();

        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`);
        const items = response.data.items;
        const parsedData = await parseData(items);

        return { parsedData: [...videos, ...parsedData], nextPageToken: nextPageTokenFromState }
    }
)