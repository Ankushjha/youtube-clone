import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';

export default function Home() {
    const dispatch = useAppDispatch();
    const videos = useAppSelector( (state)=> state.youtubeApp.videos );

    useEffect(() => {
        dispatch(getHomePageVideos(false));
    }, [dispatch])
    
    return (
        <div>
           <Navbar/>
           <Sidebar />
        </div>
    );
}
