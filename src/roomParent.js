import './showRoomButton.css';
import {useState} from "react";
import axios from "axios";

export default function RoomParent () {
    const [csvData, setCsvData] = useState([]);
    const [names, setNames] = useState([]);
    const [code, setCode] = useState();
    const [showNamesOrRefresh, setShowNamesOrRefresh] = useState("Show Names:")
    const [roomCodeGenerated, setRoomCodeGenerated] = useState(false);

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
                <text id="roomCode">{code}</text>
            </div>
        )
    }

    function ShowRoomButton() {

        function parseCSV(csvText) {
            const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
            const data = [];        // Initialize an array to store the parsed data

            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
                data.push(rowData);
            }
            return data;
        }

        function FetchCSVData() {
            const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdFVk4mpgNKNyGPXBTAtABrPep7Df6d3i2EO7n_4OrouLSwqudI6hH9panHGuDjJ-b23tBC6K92p6F/pub?output=csv';
            axios.get(csvUrl)    // Use Axios to fetch the CSV data
                .then((response) => {
                    const parsedData = parseCSV(response.data)
                    setCsvData(parsedData);
                    showNames(parsedData);
                })
                .catch((error) => {
                    console.error('Error fetching CSV data:', error);
                });

        }

        function showNames(parsedData) {
            const names = [];
            for (let i = 1; i < parsedData.length; i++) {
                if (code == parsedData[i][4]) {
                    const string = parsedData[i][3];
                    if (i < parsedData.length-1) {
                        names.push(string + ", ");
                    }
                    else {
                        names.push(string);
                    }
                }
            }
            setNames(names);
            setShowNamesOrRefresh("Refresh Names:");
        }

        return (
            <div>
                {roomCodeGenerated && <button className="buttons" onClick={FetchCSVData} > {showNamesOrRefresh} </button>}
                <text className="names" id="nameList">{names}</text>
            </div>
        )
    }

    function GenerateRoomButton () {

        function generateRoomFromCSVData () {
            const numPeople = csvData.length;
            const numRounds = numPeople / 8;
            const numJudges = numPeople % 8;
            // I should probably just finalize the form now before I have to rewrite the function.
        }



        return (
            <div>
                {roomCodeGenerated && <button className="buttons" onClick={generateRoomFromCSVData}> Generate This Room: </button>}
            </div>
        )
    }




    return (
        <div>
            <GenerateRoomCodeButton/>
            <ShowRoomButton/>
            <GenerateRoomButton/>
        </div>
    )
}