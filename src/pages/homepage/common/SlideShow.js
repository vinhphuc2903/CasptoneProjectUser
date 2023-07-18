/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Styles from "./SlideShow.scss"
import {ImageMain1, ImageMain2, ImageMain3, ThuyQuai} from "../../../assets/images";
const fadeImages = [
    ThuyQuai,
    ImageMain2,
    ImageMain3
  ];

const fadeProperties = {
    duration: 3000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    arrows: true
}
export default function SlideShow () {
    return (
    <div 
        className={Styles.slideContainer}
    >
        <Fade 
            Styles={{ 
                // height: '400px', 
                width: '100%',
                justifyContent: 'center',
               
            }}
            {...fadeProperties}
        >
            <div className="each-fade">
                <img src={fadeImages[0]} 
                    style={{
                        width: '100%',
                        // height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[1]} 
                    style={{
                        width: '100%',
                        // height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[2]} 
                    style={{
                        width: '100%',
                        // height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
        </Fade>
    </div>    
    )
}
