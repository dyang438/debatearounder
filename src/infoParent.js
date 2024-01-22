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
                <p>3. Make sure everyone is present by refreshing names! You can also delete people by clicking them. </p>
                <p>4. Generate rooms and regenerate until satisfied.</p>
                <p>5. Alternatively swap players however you wish! Just click two people to switch them. (visual indication coming soon)</p>
                <p> IMPORTANT: IF YOU WANT TO TEST HOW IT WORKS MANUALLY INPUT ROOM CODE 11. </p>
                <p>Creature Comforts: If you filled out the form wrong or was accidentally deleted just resubmit and it will use the most recent one! (Currently barely-tested)</p>
                <p> Future features: Adding judges directly to rooms.</p>
                <p>Contact Information for developer: <a id = "mailLink" href="mailto:dyang438@SEAS.upenn.edu">dyang438@SEAS.upenn.edu</a>
                </p>
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