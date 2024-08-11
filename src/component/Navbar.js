import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa6";
import { RiVideoAddLine } from "react-icons/ri"
import { GoBell } from "react-icons/go";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { changeSearchTerm, clearVideos } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

const Navbar = () => {

    const location = useLocation(); //this hook is used to get location
    const navigate = useNavigate(); //this hook is used to get navigation
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    const handleSearch = () => {
        if (location.pathname != '/search') navigate("/search");
        else {
            dispatch(clearVideos);
            dispatch(getSearchPageVideos(false));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    }

    return (
        <div className='flex justify-between px-14 h-14 items-center bg-[#212121] opacity-95 sticky'>
            <div className='flex gap-8 items-center text-2xl'>
                <div>
                    <GiHamburgerMenu />
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <FaYoutube className='tex-3xl text-red-600' />
                    <span className='text-2xl'> Youtube </span>
                </div>
            </div>
            <div className='flex items-center justify-center gap-5'>
                <form onSubmit={handleSubmit}>
                    <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl'>
                        <div className='flex gap-8 items-center pe-5'>
                            <input type="text" placeholder='Search' className='w-96 bg-zinc-900 focus:outline-none border-none' value={searchTerm} onChange={e => dispatch(changeSearchTerm(e.target.value))} />
                        </div>
                        <button className='h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl'>
                            <AiOutlineSearch className='flex items-center' />
                        </button>
                    </div>
                </form>
                <div className='text-xl p-3 bg-zinc-900 rounded-full'>
                    <FaMicrophone />
                </div>
            </div>
            <div className='flex gap-5 items-center text-xl'>
                <RiVideoAddLine />
                <div className='relative'>
                    <GoBell />
                    <span className='absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1'>9+</span>
                </div>
                <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile-logo" className='w-9 h-9 rounded-full' />
            </div>
        </div>
    );
}

export default Navbar;
