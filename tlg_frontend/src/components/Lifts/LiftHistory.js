import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { useLifts } from "../../Providers/LiftProvider";
import { useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';

const AthleteLiftHistory = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { getLiftHistory, lifts, setLifts } = useLifts();
    var randomColor = require('randomcolor');
    let dataLength = 0;

    useEffect(() => {
        const getLifts = async () => {
            await getLiftHistory(currentUser.id)
        }
        getLifts()
    }, [])

    const displayLifts = () => {
        if (lifts) {
            return lifts.map((lift, idx) => {
                return {
                    id: idx,
                    date: lift.date_of_lift,
                    lift: lift.lift,
                    weight: lift.weight
                }
            })
        }
        else {
            return (
                [{
                    id: 1,
                    date: "06/25/2022",
                    lift: "example",
                    weight: 50
                }]
            )
        }
    }
    // creating dataset for each lift
    const createDataSet = () => {
        const liftTypes = {'power_clean':'', 'front_squat':'', 'squat_clean':'', 'push_jerk':'', 'power_snatch': '', 'squat_snatch': ''};
        lifts.map((lift)=> {
            if (liftTypes[lift.lift]) {
                liftTypes[lift.lift]['data'].push(lift.weight)
            }
            else {
                liftTypes[lift.lift] = 
                {
                    label: lift.lift,
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: randomColor(),
                    borderColor: 'black',
                    borderWidth: 2,
                    data: [lift.weight]
                }
            }
        })
        console.log('lift types are ', Object.values(liftTypes))
        dataLength = liftTypes.length
        return Object.values(liftTypes)
    }
    console.log('lift dates', lifts.map((lift) => lift.date_of_lift))
    // lift weight data
    // lifts.map((lift) => {
    //     return ({
    //         label: lift.lift,
    //         fill: false,
    //         lineTension: 0.5,
    //         backgroundColor: randomColor(),
    //         borderColor: 'black',
    //         borderWidth: 2,
    //         data: [lift.weight]
    //     })
    // })


    const data = {
        // labels are dates on x axis
        labels : lifts.map((lift, idx) => idx + 1),
        datasets: createDataSet(),
    }
    const displayGraph = () => {
        return (
            <Line
                type="line"
                data={data}
                options={{
                    title:{
                    display:true,
                    text:'Athlete Lift History',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    },
                    scales:{
                        xAxis: {
                            // type: 'time',
                            // time: {
                            //     unit:'day'
                            // },
                            // min: '2022-06-01',
                            // max: '2022-06-30',
                            ticks:{
                                display: true,
                                autoSkip: true,
                                // maxTicksLimit: 4
                            },
                            title: {
                                display: true,
                                text: 'Lift Sesh Progress By #Lifts',
                                padding: 10,
                                font: {
                                    size:15
                                }
                            }
                        },
                        yAxis: {
                            title: {
                                display: true,
                                text: 'Weight (in Lbs)',
                                padding: 10,
                                font: {
                                    size:15
                                }
                            }
                        }
                    }
                }}
            />
        )
    }

    console.log('the lift history is ', lifts);
    return (
        <Container sx={{
            backgroundColor: "whitesmoke"
        }}>
            <div style={{ height: 300, width: "100%" }}>
            <DataGrid
                columns={[
                    { field: "date", headerName: "Date", width: 333 },
                    { field: "lift", headerName: "Lift", width: 333 },
                    { field: "weight", headerName: "Weight", width: 333 },
                ]}
                rows={ displayLifts() }
                components={{ Toolbar: GridToolbar }}
            />
            </div>
            <div>
                { lifts && displayGraph() }
            </div>
        </Container>
        );
    };

export default AthleteLiftHistory;
