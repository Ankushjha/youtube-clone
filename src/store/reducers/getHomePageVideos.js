import { createAsyncThunk } from "@reduxjs/toolkit";  //this will simplify asyncronus calls and also we dispatch action based on results
import axios from "axios";
import parseData from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;


export const getHomePageVideos = createAsyncThunk (
    "youtube/App/homePageVideos",
    async(isNext, {getState}) => {     //getState is used to access current redux state {enable redux state}, isNext is boolean to check wether we're fetching the data or not.

        const {
            youtubeApp: {nextPageToken:nextPageTokenFromState, videos}
        } = getState();
        // const {
        //     data: {items, nextPageToken},
        // }

        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="tseries"&key=${API_KEY}&part=snippet&type='video`);

        const items = response.data.items;
        console.log(response);

        const parsedData = await parseData(items);
    }
)