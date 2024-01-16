import {useState} from "react";
import "./roomParent.css"

export default function InfoParent () {
    const [showInfo, setShowInfo] = useState(false);
    const [showOrHideWords, setShowOrHideWords] = useState("Show Info")
    function showHideInfo () {
        setShowInfo(!showInfo)
        if(!showInfo) {
            setShowOrHideWords("Hide Info");
        } else {
            setShowOrHideWords("Show Info");
        }
    }

    function Info () {
        return (
            <div className="info">
                <p>1. Have the practice runner generate a room code by pressing "Room Code:"</p>
                <p>2. Everyone participating should scan the QR code and fill out the resulting form with the generated QR Code</p>
                <p>3. Make sure by showing and refreshing names everyone is present! </p>
                <p>4. Generate rooms and regenerate until satisfied.</p>
                <p>Promised future features: Specific pro/con pairs, brushing up this god-awful UI, and judges assigned to rooms directly.</p>
            </div>
        )
    }


    return (
        <div className = "infoParent">
            <button className = "infoButton" onClick={showHideInfo}> {showOrHideWords} </button>
            {showInfo && <Info/>}
        </div>
    )
}