import './roomParent.css';
import {useState} from "react";
import axios from "axios";
import Person from './Person.js';
import Partner from './Partner.js';
import EightPersonRoom from "./eightPersonRoom";
import FourPersonRoom from "./fourPersonRoom";
import QRCode from './QRCode.svg'

export default function RoomParent () {
    const [roomData, setRoomData] = useState([]);
    const [names, setNames] = useState([]);
    const [code, setCode] = useState();
    const [showNamesOrRefresh, setShowNamesOrRefresh] = useState("Show Names:")
    const [roomCodeGenerated, setRoomCodeGenerated] = useState(false);
    //const [info, setInfo] = useState();
    const [roomsDisplay, setRoomsDisplay] = useState(null);
    const [judgesDisplay, setJudgesDisplay] = useState(null);
    const [generateButtonText, setGenerateButtonText] = useState("Generate This Room:")
    const [generatedRooms, setGeneratedRooms] = useState(false);
    function GenerateRoomCodeButton() {


        /**
         * Uses math.random to generate a room code; a 6-digit number that can't start with zero.
         *
         * @returns {number}
         */
        function roomCodeGenerationFunction() {
            return 111111;
            //return Math.floor(Math.random()*900000+100000);
        }

        //Possible improvements include making a probing function so there is no repeated room codes.

        function generateRoom() {
            let x = roomCodeGenerationFunction();
            setRoomCodeGenerated(true);
            setCode(x);
        }


        return (
            <div className={"generateRoomCodeButton"} >
                <button className="buttons" onClick={generateRoom} > Room Code: </button>
                <div id="roomCode">{code}</div>
            </div>
        )
    }

    function ShowRoomButton() {

        function parseCSV(csvText) {
            const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
            const data = [];        // Initialize an array to store the parsed data

            for (let i = 0; i < rows.length; i++) {
                const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
                data.push(rowData);
            }
            return data;
        }

        function grabOnlyRoom(parsedData) {
            const roomData = [];
            for (let i = 1; i < parsedData.length; i++) {
                const rowData = parsedData[i];
                if (rowData[1] === code.toString()) {
                    roomData.push(rowData);
                }
            }
            return roomData;
        }

        function FetchCSVData() {
            const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTWANstk4plawTbwxRkiRWqbqC3ZfXiIbkbHrQIkuMkKrliMe0A1Wvv43jPMeQCh1vbaLPB37-yG2RU/pub?output=csv';
            axios.get(csvUrl)    // Use Axios to fetch the CSV data
                .then((response) => {
                    const parsedData = parseCSV(response.data);
                    const parsedRoomData = grabOnlyRoom(parsedData);
                    setRoomData(parsedRoomData);
                    showNames(parsedRoomData);
                })
                .catch((error) => {
                    console.error('Error fetching CSV data:', error);
                });

        }

        function showNames(parsedData) {
            const names = [];
            for (let i = 0; i < parsedData.length; i++) {
                const string = parsedData[i][2];
                if (i < parsedData.length-1) {
                    names.push(string + ", ");
                }
                else {
                    names.push(string);
                }
            }

            setNames(names);
            setShowNamesOrRefresh("Refresh Names:");
        }

        return (
            <div>
                {roomCodeGenerated && <button className="buttons" onClick={FetchCSVData} > {showNamesOrRefresh} </button>}
                <div className="names" id="nameList">{names}</div>
                {/**<div id="info">{info}</div>**/}
            </div>
        )
    }

    function shuffleArray (array) {
        return array.sort(() => 0.5 - Math.random());
    }

    function GenerateRoomButton () {

        let [partnershipsArr] = useState([]);
        let [judgesArr] = useState([]);
        let [allRoomsArr] = useState([]);

        function generatePartnershipsAndJudgesFromCSVData () {
            setGenerateButtonText("Regenerate Rooms:");
            setGeneratedRooms(true);
            partnershipsArr = [];
            judgesArr = [];
            let stayingArr = [];
            for (let i = 0; i < roomData.length; i++) {
                const person = new Person(
                    roomData[i][2], //name
                    roomData[i][3], //skill
                    roomData[i][5], //staying
                    roomData[i][6], //preference
                    roomData[i][4]) //partner
                if (roomData[i][5] === "No") {
                    judgesArr.push(person);
                } else {
                    stayingArr.push(person);
                }
            }

            let numStaying = stayingArr.length;
            let remainder = numStaying % 8;
            let numberOfJudgesToAdd = remainder % 4;

            let roomDataRemaining = [];
            let leftoverArr = [];
            //Partner Check
            for (let i = 0; i < stayingArr.length-1; i++) {
                for (let j = i + 1; j < stayingArr.length; j++) {
                    //Check for shared partnership
                    if (stayingArr[j].getName() === stayingArr[i].getPartner() &&
                        stayingArr[j].getPartner() === stayingArr[i].getName() ) {
                        //Create partner object and move to storage bin.
                        const partnership = new Partner(stayingArr[i], stayingArr[j]);
                        partnershipsArr.push(partnership);
                        console.log(partnership);
                        console.log(stayingArr[i]);
                        console.log(i);
                        console.log(stayingArr[j]);
                        console.log(j);
                        roomDataRemaining[i] = "checked";
                        roomDataRemaining[j] = "checked";
                    }
                }
                if (roomDataRemaining[i] !== "checked") {
                    leftoverArr.push(stayingArr[i]);
                    roomDataRemaining[i] = "checked";
                }
            }
            console.log(partnershipsArr);
            console.log(roomDataRemaining);
            if (roomDataRemaining[stayingArr.length-1] !== "checked") {
                leftoverArr.push(stayingArr[stayingArr.length-1]);
                roomDataRemaining[stayingArr.length-1] = "checked";
            }

            console.log("leftoverArr")
            console.log(leftoverArr);

            let shuffledArr;
            let judgeArr = [];
            let eitherArr = [];
            let debateArr = [];
            for (let i = 0; i < leftoverArr.length; i++ ) {
                if (leftoverArr[i].getDebateJudgePreference() === "Judge") {
                    judgeArr.push(leftoverArr[i]);
                } else if (leftoverArr[i].getDebateJudgePreference() === "Debate") {
                    debateArr.push(leftoverArr[i]);
                } else {
                    eitherArr.push(leftoverArr[i]);
                }
            }
            if(numberOfJudgesToAdd < judgeArr.length) {
                shuffledArr = shuffleArray(judgesArr);
            } else if (numberOfJudgesToAdd < (judgeArr.length + eitherArr.length)) {
                numberOfJudgesToAdd = numberOfJudgesToAdd - judgeArr.length;
                //either is potArr, completely add judge
                judgesArr = judgesArr.concat(judgeArr);
                shuffledArr = shuffleArray(eitherArr);
            } else {
                //debate is potArr, completely add judge and either
                numberOfJudgesToAdd = numberOfJudgesToAdd - judgeArr.length;
                numberOfJudgesToAdd = numberOfJudgesToAdd - eitherArr.length;
                judgesArr = judgesArr.concat(judgeArr);
                judgesArr = judgesArr.concat(eitherArr);
                shuffledArr = shuffleArray(debateArr)
            }

            judgesArr = judgesArr.concat(shuffledArr.slice(0, numberOfJudgesToAdd));
            console.log(leftoverArr)
            console.log(judgesArr);

            let leftoverArrWithoutJudges = [];

            for (let x = 0; x < leftoverArr.length; x++) {
                if (!(judgesArr.includes(leftoverArr[x]))) {
                    leftoverArrWithoutJudges.push(leftoverArr[x]);
                }
            }

            console.log(leftoverArrWithoutJudges)


            function randomizingAndCreatingPartnerships (leftoverArr) {
                let buildArr = []
                for (let i = 0; i < leftoverArr.length; i = i+2) {
                    if (i+1 === leftoverArr.length) {
                        console.error("problemWithPartnering")
                    }
                    const partnership = new Partner(leftoverArr[i], leftoverArr[i+1])
                    buildArr.push(partnership);
                }
                return buildArr;
            }

            partnershipsArr = partnershipsArr.concat(randomizingAndCreatingPartnerships(leftoverArrWithoutJudges))
            console.log(partnershipsArr)
            generateRooms();
        }

        function generateRooms() {
            //Sorting so rooms can have best skill distributions
            partnershipsArr.sort((a, b) => {
               return a.calcSkill() - b.calcSkill();
            });
            const numPartners = partnershipsArr.length
            if (numPartners % 4 === 2) {
                //Make 4 people room first
                let fourPlayerArr = shuffleArray(partnershipsArr.slice(0, 2));
                allRoomsArr.push( new FourPersonRoom(fourPlayerArr[0], fourPlayerArr[1]));
                //Then make the rest of the rooms
                for (let i = 2; i < partnershipsArr.length; i = i+4) {
                    //Assign each group of four into a room randomly.
                    let roomInput = shuffleArray(partnershipsArr.slice(i, i+4));
                    allRoomsArr.push( new EightPersonRoom(roomInput[0], roomInput[1], roomInput[2], roomInput[3]));
                }
            } else if (numPartners % 4 === 0) {
                for (let i = 0; i < partnershipsArr.length; i = i+4) {
                    //Assign each group of four into a room randomly.
                    let roomInput = shuffleArray(partnershipsArr.slice(i, i+4));
                    allRoomsArr.push( new EightPersonRoom(roomInput[0], roomInput[1], roomInput[2], roomInput[3]));
                }
            } else {
                console.error("Partnerships Formed Improperly, Retry");
            }

            setRoomsDisplay(allRoomsArr.map((room, roomIndex) => (
                <div key={`room-${roomIndex}`} className = "room">
                    <h3>Room {roomIndex + 1}</h3>
                    {/* Display partnerships */}
                    {room.getPartnerships().map((partnership, partnershipIndex) => (
                        <div key={`partnership-${partnershipIndex}`} >
                            <div>{partnership.getNameOne()}, {partnership.getNameTwo()}</div>
                        </div>
                    ))}
                </div>
            )));
            console.log(judgesArr);
            setJudgesDisplay(
                judgesArr.map((judge, judgeIndex) => (
                <div key={`judge-${judgeIndex}`}>
                    <div>{judge.getName()}</div>
                </div>

            )))

        }


        return (
            <div>
                {roomCodeGenerated &&
                    <button className="buttons" onClick={generatePartnershipsAndJudgesFromCSVData}> {generateButtonText} </button>}
                {generatedRooms &&
                    <div>Judges: </div>}
                {judgesDisplay}
                {roomsDisplay}
            </div>
        )
    }


    return (
        <div className="main">
            <div className="setupButtons">
                <img className="QRCode" src={QRCode} alt={"Form QR Code"}/>
                <GenerateRoomCodeButton/>
                <ShowRoomButton/>
            </div>

            <GenerateRoomButton/>
        </div>
    )
}