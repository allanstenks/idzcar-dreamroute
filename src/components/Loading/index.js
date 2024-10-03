import { Ring } from "@uiball/loaders";
import React from "react";

import "./Loading.scss"


export default function LoadingRing({height, background}) {

    return (
        <div className="loading-ring" style={{ height: `${height}px`, background: `#${background}` }}>
            <Ring color='#B8A558'></Ring>
        </div>
    )
}