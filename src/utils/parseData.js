import React from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

const ParseData = async(items) => {

    console.log(items)
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach( (item) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoIds)
        });

        const {
            data: {item:  channelsData},

        } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet.contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);

        const parsedChannelsData = [];
        channelsData.forEach((channel) => parsedChannelsData.push({
            id:channel.id,
            image:channel.snippet.thumbnails.default.url
        })
           
        )
    }

    return (
        <div>
            
        </div>
    );
}

export default ParseData;
