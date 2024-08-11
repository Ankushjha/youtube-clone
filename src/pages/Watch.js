import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import RecommendedVideoCard from "../component/RecommendedVideoCard";
import Navbar from "../component/Navbar"

export default function Watch() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // console.log("Dispatch:", dispatch)
    const currentPlaying = useAppSelector(
        (state) => state.youtubeApp.currentPlaying
    );

    console.log("currentPlaying in Watch.js: ", currentPlaying);

    const recommendedVideos = useAppSelector(
        (state) => state.youtubeApp.recommendedVideo
    );

    useEffect(() => {
        if (id) {
            console.log("useEffect id for dispatch:", id)
            dispatch(getVideoDetails(id));
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch]);

    useEffect(() => {
        if (currentPlaying && id) dispatch(getRecommendedVideos(id));
    }, [currentPlaying, dispatch, id]);

    return (
        <>
            {/* {currentPlaying && currentPlaying?.videoId === id && ( */}
            {currentPlaying ? (
                currentPlaying.videoId === id ? (
                    <div className="max-h-screen overflow-hidden">
                        <div className="flex--1">
                            <div >
                                <Navbar />
                            </div>
                            <div>
                                <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                    frameBorder="0"
                                    width="800"
                                    height="502"
                                    allowFullScreen
                                    title="Youtube Player">
                                </iframe>
                            </div>
                        </div>
                        <div className="w-[350px] bg-[#0f0f0f] overflow-y-auto">
                            {recommendedVideos.map((item) => {
                                return <RecommendedVideoCard key={item.videoId} video={item} />;
                            })}
                        </div>
                    </div>
                ) : (
                    <p>Video not found</p>
                )
            ) : (
                <p>Loading...</p>
            )}

        </>
    );
}
