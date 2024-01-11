import {useState} from "react";
import './roomCodeStyle.css';

export default function GenerateRoomCodeButton() {

    const [count, setCount] = useState();

    /**
     * Uses math.random to generate a room code; a 6-digit number that can't start with zero.
     *
     * @returns {number}
     */
    function roomCodeGenerationFunction() {
        return Math.floor(Math.random()*900000+100000);
    }

    //Possible improvements include making a probing function so there is no repeated room codes.

    function generateRoom() {
        let x = roomCodeGenerationFunction();
        setCount(x);
    }


return (
        <div className={"generateRoomCodeButton"} >
            <button id = "roomCodeButton" onClick={generateRoom} > Room Code: </button>
            <text id="roomCode">{count}</text>
        </div>
    )
}