import { createAsyncThunk } from "@reduxjs/toolkit";  //this will simplify asyncronus calls and also we dispatch action based on results
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
// console.log("API Key:", API_KEY);

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async (isNext, { getState }) => {     //getState is used to access current redux state {enable redux state}, isNext is boolean to check wether we're fetching the data or not.

const {
    youtubeApp : {nextPageToken : nextPageTokenFromState,videos},
} = getState();

const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="t-series"&key=${API_KEY}&part=snippet&type=video&${
    isNext ? `pageToken=${nextPageTokenFromState}` : ""
  }`);
const items = response.data.items;
// console.log(items)
const parsedData = await parseData(items);
return {parsedData:[...videos,...parsedData],nextPageToken:nextPageTokenFromState}
}
)



// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { parseData } from "../../utils/parseData";

// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY

// export const getHomePageVideos = createAsyncThunk(
//   "youtube/App/homePageVideos",
//   async (isNext, { getState }) => {
//     try {
//       console.log("API Key:", API_KEY); // Log the API key
      
//       const {
//         youtubeApp: { nextPageToken: nextPageTokenFromState, videos }
//       } = getState();

//       const url = 'https://youtube.googleapis.com/youtube/v3/search';
//       const params = {
//         part: 'snippet',
//         maxResults: 20,
//         q: 'drop x out',
//         key: API_KEY,
//         type: 'video',
//         ...(isNext && { pageToken: nextPageTokenFromState })
//       };

//       console.log("Request URL:", url);
//       console.log("Request Params:", params);

//       const response = await axios.get(url, { params });

//       console.log("Response status:", response.status);
//       console.log("Response data:", response.data);

//       const items = response.data.items;
//       const parsedData = await parseData(items);

//       return { 
//         parsedData: [...videos, ...parsedData], 
//         nextPageToken: response.data.nextPageToken 
//       };
//     } catch (error) {
//       console.error("Error in getHomePageVideos:", error);
//       if (error.response) {
//         console.error("Error response data:", error.response.data);
//         console.error("Error response status:", error.response.status);
//         console.error("Error response headers:", error.response.headers);
//       } else if (error.request) {
//         console.error("Error request:", error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
//       throw error;
//     }
//   }
// );