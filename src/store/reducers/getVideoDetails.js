import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { timeSince } from "../../utils/timeSince";
import { convertRawtoStrings } from "../../utils/convertRawtoStrings";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
    "youtube/App/videoDetails",
    async (id, { rejectWithValue }) => {
        try {
        const {
            data: { items },
        } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`);

                
        if(!items || items.length === 0) {
            throw new Error("No video details found");
          }

        const parsedData = await parseData(items[0]);
        // console.log("Parsed Data in Thunk:", parsedData);
        return parsedData;

    } catch (error) {
        console.error("Error fetching video details:", error);
        return rejectWithValue("Failed to fetch video details");
    }

    }
);

const parseData = async (item) => {
    // console.log("async item:", item)
    const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`)
    // console.log("channelResponse data:", channelResponse)
    // console.log("channelResponse data with item[0]:", channelResponse.data.items[0])
    const snippet = item.snippet;
    const id = item.id;
    const statistics = item.statistics;

    const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
    const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;


    return {
        videoId: id,
        videoTitle: snippet.title,
        videoDescription: snippet.description,
        videoViews: convertRawtoStrings(
            statistics.viewCount
        ),
        videoLikes: convertRawtoStrings(
            statistics.likeCount
        ),
        videoAge: timeSince(new Date(snippet.publishedAt)
        ),
        channelInfo: {
            id: snippet.channelId,
            image: channelImage,
            name: snippet.channelTitle,
            subscribers: convertRawtoStrings(subscriberCount, true),
        }
    }
}