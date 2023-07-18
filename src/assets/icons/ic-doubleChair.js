import React from "react";

export default function IconDoubleChair(props)
{
    const { text } = props
    return (
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4V16H19V4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4Z" fill="#E638D3" stroke="black" stroke-linejoin="round"/>
            <path d="M3.51308 16.3762C2.89875 16.8864 1.93324 17.8337 2.00365 18.7C2.05168 19.291 2.59566 20.0142 2.86034 20.3342C2.94941 20.4418 3.08279 20.5 3.22253 20.5H20.7775C20.9172 20.5 21.0506 20.4418 21.1397 20.3342C21.4043 20.0142 21.9483 19.291 21.9964 18.7C22.0668 17.8337 21.1013 16.8864 20.4869 16.3762C20.1772 16.119 19.7817 16 19.3791 16H4.62091C4.2183 16 3.8228 16.119 3.51308 16.3762Z" fill="#E638D3" stroke="black" stroke-linejoin="round"/>
            <path d="M2.00365 18.7C1.99874 18.6396 1.99886 18.5788 2.00356 18.5177L2 10.9989C2 10.4466 2.44772 10 3 10H4.5C4.77614 10 5 10.2239 5 10.5V16H4.62091C4.2183 16 3.8228 16.119 3.51308 16.3762C2.94159 16.8508 2.0662 17.7037 2.00356 18.5177L2.00365 18.7Z" fill="#E638D3" stroke="black" stroke-linejoin="round"/>
            <path d="M21.9964 18.7C22.0013 18.6396 22.0011 18.5788 21.9964 18.5177L22 10.9989C22 10.4466 21.5523 10 21 10H19.5C19.2239 10 19 10.2239 19 10.5V16H19.3791C19.7817 16 20.1772 16.119 20.4869 16.3762C21.0584 16.8508 21.9338 17.7037 21.9964 18.5177L21.9964 18.7Z" fill="#E638D3" stroke="black" stroke-linejoin="round"/>
            <path d="M5.5 22V20.5H18.5V22H5.5Z" fill="#E638D3" stroke="black" stroke-linejoin="round"/>
            <text x="50%" y="50%" text-anchor="middle" font-size="6.5" fontWeight={500} fill="black">{text}</text>
        </svg>
    )
}