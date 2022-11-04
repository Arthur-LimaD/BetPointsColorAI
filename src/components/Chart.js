import React, {useState, useEffect} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import {GeneratePoint, GeneratePoints, GetType } from '../rules/GeneratePoints';
import { GuessType, GenerateRandomWeights } from '../rules/GuessTypeNeuron';
import { Train } from '../rules/GuessTypeNeuron';

export default function Chart () {

    const referenceLineData = [{x: 0, y: 0}, {x: 100, y: 100}];
    const [points, setPoints] = useState([])
    const [weights, setWeights] = useState()
    const [TrainingInteractions, setTrainingIteractions] = useState(100)

    useEffect(()=> {
        setPoints(GeneratePoints(100))
        setWeights(GenerateRandomWeights)
    }, [])

    const ChartPointClassifier = (point)=> {
        return GuessType(weights, point)
        //return GetType(point)
    }

    const OnTrainClick = ()=> {
        console.log('Training...')
        let newWeights = weights;
        for(let i = 0; i < TrainingInteractions; i++){
            let newPoint = GeneratePoint();
            newWeights = Train(newWeights, newPoint, GetType(newPoint) )
        }
        setWeights(newWeights)
    }
    
    const redPoints = points.filter(point => ChartPointClassifier(point) >= 0);
    const greenPoints = points.filter(point => ChartPointClassifier(point) <= 0);

    return (
        <>
        <ScatterChart width={400} height={400}>
            <ReferenceLine segment={referenceLineData} stroke="yellow"/>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Scatter data={redPoints} fill="red" name="red" />
            <Scatter data={greenPoints} fill="green" name="green" />
        </ScatterChart><br/>
        <p>
            Weights: X {weights && weights.x}, Y: {weights && weights.y}
        </p><br/>
        <p>
            <label>Set Interactions per Training</label><br/>
            <input defaultValue={100} onChange={(e)=> {setTrainingIteractions(e.target.value)}} type="number" max={1500}/> <br/>
            <button onClick={OnTrainClick} className="button">
                Train
            </button>
        </p>
        </>
    )
}