"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";


type imageChangerProps = {
    dir: string;
    maxCount: number;
}



export default function ImageChanger({ dir, maxCount }: imageChangerProps) {
    let [currentImage, setCurrentImage] = useState(0);
    let [nextImage, setNextImage] = useState(1);

    const curr = useRef<any>();
    const next = useRef<any>();

    async function changeImage() {
        console.log(currentImage, nextImage);
        if (!curr.current || !next.current) { return; }
        if (next.current.style.opacity == 0) {
            setNextImage((next) => next == maxCount ? 0 : next + 1);
            gsap.to(next.current, { opacity: 1, duration: 2 });
            gsap.to(curr.current, {
                opacity: 0, duration: 2, onComplete: () => {
                    setTimeout(() => {
                        changeImage()
                    }, 2000);
                }
            });
        } else {
            setCurrentImage((curr) => curr == maxCount ? 0 : curr + 1)
            gsap.to(curr.current, { opacity: 1, duration: 2 });
            gsap.to(next.current, {
                opacity: 0, duration: 2, onComplete: () => {
                    setTimeout(() => {
                        changeImage()
                    }, 2000);
                }
            });
        }
    }


    useEffect(() => {

        changeImage();

    }, [])

    return (
        <div className="relative w-full h-full overflow-hidden ">
            <img ref={curr} className="absolute top-0 h-full w-full object-cover  " src={`/9ff/${dir}${currentImage}.jpg`}></img>
            <img ref={next} className="absolute top-0 h-full w-full object-cover " src={`/9ff/${dir}${nextImage}.jpg`}></img>
        </div>
    )
}