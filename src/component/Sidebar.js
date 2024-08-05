import React from 'react';
import { AiFillHome, AiOutlineLike  } from "react-icons/ai";
import { MdSlowMotionVideo, MdSubscriptions, MdOutlineVideoLibrary, MdOutlineHistory, MdOutlineWatchLater } from "react-icons/md";

const Sidebar = () => {

    const mainLinks = [
        {
            icon:  <AiFillHome className='text-xl'/>,
            name: 'Home'
        },
        {
            icon:  <MdSlowMotionVideo className='text-xl'/>,
            name: 'Shorts'
        },
        {
            icon:  <MdSubscriptions className='text-xl'/>,
            name: 'Subscriptions'
        }
    ]

    const otherLinks = [
        {
            icon:  <MdOutlineVideoLibrary className='text-xl'/>,
            name: 'Library'
        },
        {
            icon:  <MdOutlineHistory className='text-xl'/>,
            name: 'History'
        },
        {
            icon:  <MdOutlineWatchLater className='text-xl'/>,
            name: 'Watch Later'
        },
        {
            icon:  <AiOutlineLike className='text-xl'/>,
            name: 'Liked Videos'
        },
    ]

    return (
        <div className='w-2/12 bg-[#212121] p-2 pr-5 overflow-auto pb-8 h-screen'>
            <ul className='flex flex-col border-b-2 border-gray-800 '> 
                {mainLinks.map(
                    ({icon, name}) => {
                        return (
                            <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 ${name === "Home" ? "bg-zinc-600" : " "} rounded-xl`}>
                                <a href="#" className='flex items-center gap-5'>
                                    {icon}
                                    <span className='text-sm tracking-wider'>{name}</span> 
                                    {/* tracking-wider means letter-spacing 0.05em  */}
                                </a>
                            </li>
                        )
                })}
            </ul>
            <ul className='flex flex-col border-b-2 border-gray-800'> 
                {otherLinks.map(
                    ({icon, name}) => {
                        return (
                            <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 ${name === "Home" ? "bg-zinc-600" : " "} rounded-xl`}>
                                <a href="#" className='flex items-center gap-5'>
                                    {icon}
                                    <span className='text-sm tracking-wider'>{name}</span> 
                                    {/* tracking-wider means letter-spacing 0.05em  */}
                                </a>
                            </li>
                        )
                })}
            </ul>

        </div>
    );
}

export default Sidebar;
