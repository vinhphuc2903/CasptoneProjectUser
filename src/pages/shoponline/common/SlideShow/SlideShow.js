import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Slide1,Slide2,Slide3,Slide4 } from "../../../../assets/images";
import Styles from "./SlideShow.scss"

const fadeImages = [
    Slide1,
    Slide2,
    Slide3,
    Slide4
  ];

export default function SlideShow () {
    return (
    <div className={Styles.slideContainer}>
        <Fade Styles={{ 
                height: '400px', 
                width: '80%',
                justifyContent: 'center'
            }}>
            <div className="each-fade">
                <img src={fadeImages[0]} 
                    style={{
                        width: '100%',
                        height: 500,
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[1]} 
                    style={{
                        width: '100%',
                        height: 500,
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[2]} 
                    style={{
                        width: '100%',
                        height: 500,
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[3]} 
                    style={{
                        width: '100%',
                        height: 500,
                    }}
                />
            </div>
        </Fade>
    </div>    
    )
}
