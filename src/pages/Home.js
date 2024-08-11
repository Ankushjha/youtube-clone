import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner from '../component/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../component/Card';

export default function Home() {

    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    // console.log(videos)
    useEffect(() => {
        dispatch(getHomePageVideos(false));
        // console.log(videos)
    }, [dispatch])

    return (
        <div className='max-h-screen overflow-auto'>
            <div style={{ height: "7.5vh" }}>
                <Navbar />
            </div>
            <div className='flex' style={{ height: "92.5vh" }}>
                <Sidebar />
                {
                    videos.length ? (
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos(true))}
                            hasMore={videos.length < 500}
                            Loader={<Spinner />}
                            height={650}
                        >
                            <div className='grid gap-y-14 gap-x-8 grid-cols-4 p-8'>
                                {videos.map((item) => {
                                    return <Card data={item} key={item.videoId} />
                                })}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <Spinner />
                    )
                }

            </div>
        </div>
    );
}
