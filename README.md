# About The Project

This Project is constructed using Javascript to create a Neuron that tries betting the position of a point in a Chart;

there a Graphic and two types of ball (Red and Green) and try to separate them where all red balls be on a side and the green balls on the another one, on this project, we will use the Classification Supervisioned Machine Learning to identify, label, define and qualify the balls. 

Each more interations we do, more this Flow Occurs and consequently, more adjusted the weights are and more accurate the Neuron is, and after some clicks, the Neuron finnally learned how to classify correctly the Balls.

# Features Used

- Recharts javascript Library To Build the Chart
- ReactJS to build the front-end
- Classification Supervisioned Machine Learning

These are the Steps to create this project:

First thing, we will create a function that generates an array with random numbers that will set the points’ postition on the Chart.

```jsx
export const GeneratePoints = (qtd)=>{
    let points = []
    for(let i = 1; i <= qtd; i++){
        points.push({
            x: Math.random() * 100,
            y: Math.random() * 100
        })
    }
    return points
}
```

Then we generated a Simple Scatter chart using ReChartJs Library:

```jsx
import React, {useState, useEffect} from 'react';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import {GeneratePoints} from '../rules/GeneratePoints';

export default function Chart () {

    const referenceLineData = [{x: 0, y: 0}, {x: 100, y: 100}];
    const [points, setPoints] = useState([])

    useEffect(()=> {
        setPoints(GeneratePoints(100))
    }, [])

    return (
        <>
            <ScatterChart width={400} height={400}>
            <ReferenceLine segment={referenceLineData} stroke="red"/>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Scatter data={points} fill="green" />
            </ScatterChart>
        </>
    )
}export const GeneratePoints = (qtd)=>{
    let points = []
    for(let i = 1; i <= qtd; i++){
        points.push({
            x: Math.random() * 100,
            y: Math.random() * 100
        })
    }
    return points
}
```


Output

Thats possible to classify a variable by using a function, that here will be our Hidden Layer. In this case, we are gonna create a function that identify if a ball is higher or lower than the line. To do this, on the GeneratePoints component, the function will seems like this:

```jsx
export const GetType = ({x, y})=> {
    return (x > y) ? 1 : -1;
}
```

Then, to differentiate the balls between the cases, on the Chart component, we will create another function that identify the value set by the “GetType” function and classify it to the Chart, and then create a fucntion to set Red and Green Points: 

```jsx
//function that gets the type of the point
const ChartPointClassifier = (point)=> {
    return GetType(point)
}

//function to classify and separate points by classes
const redPoints = points.filter(point => ChartPointClassifier(point) >= 0);
const greenPoints = points.filter(point => ChartPointClassifier(point) <= 0);

//on JSX, two classifiers, one shows the red points and another, the green points
<Scatter data={redPoints} fill="red" name="red" />
<Scatter data={greenPoints} fill="green" name="green" />
```

Output

**Its time to Implement the Neuron!**

As we are working on Classification Supervisioned Machine learning, the neuron connection will set and classify a gorup of variables, in this case, the balls. There are many ways to “teach” a Neural Network how to set a varibale correctly, in this case.

> The Neural Network will bet a classify value and we are going to set a reward to it throught a positive or negative weight, this way communicating to the Neural Network if its on the correct way to understand
> 

Now we are going to create this function, on the rules folder, so the function will receive two parameters: the weight of the proof and the poit itself (the variable);

The flow to process information on the neuron seems like this:

1. The Neuron will attribute (multiply) the input’s values to the weight
2. Add the results
3. And then fromulate the output by this.

The flow will works presupposing the weight is on the same format of the input’s values.

```jsx
export const guessType = (weight, point)=> {
    let sum = point.x * weight.x + point.y * weight.y;
    return sum > 0 ? 1 : -1;
}
```

This function is called as activation function, this function return 1 or -1, then 1 activate the forward neuron and -1 doesnt.

As the function receives an input, it also must receive a weight, in this case we will create a random weight generator.

The weight will be used only on the first requisition, and then, depending of the output and validation of the weight (if its innibitory or excitatory), the Neuron will adjust it to help the Neuron to bet correctly and set it as a State on our application.

```jsx
export const GenerateRandomWeights = ()=> {
    return {
        x: Math.random() *2 -1,
        y: Math.random() *2 -1
    }
}
```

Now we already can use the Neuron to try classificating the balls instead of our function “GetType”:

```jsx
const ChartPointClassifier = (point)=> {
    return GuessType(weights, point)
    //return GetType(point)
}
```

As we can see, the Neuron Try betting their value on every time: 

![The neuron bet similar to the correct way](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/39c0314b-1243-473a-9aad-03b7a39c051c/Untitled.png)

The neuron bet similar to the correct way

![The Neuron bet all balls are green](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dd0b97fa-07e5-4da7-b5c4-bb31690a8ac1/Untitled.png)

The Neuron bet all balls are green

![The neuron bet all balls are red](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6f9813e-378e-43a4-8e11-50b38d48f123/Untitled.png)

The neuron bet all balls are red

As the demonstrations above, the Neuron is still betting on a completely random way, now we have to teach it how to bet correctly, where its the function that realizes the **training**.

So we are gonna create a Function that realizes the training.

```jsx
export const Train = (weights, point, expectedType)=> {
    
    let guess = GuessType(weights, point)
    let error = expectedType - guess;

    return {
        x: weights.x + error * point.x,
        y: weights.y + error * point.y
    }
}
```

Basically the function receives a 

1. Weights
2. The Point itself
3. And a ExpectedType

It First tries to guess The Point type (remember that the GessType function returns 1 or -1), and them ele avaliate It was a correct bet by The weights, If The guess os equal to The error, The output Will be zero, If not, The weights Will be attributed to The output with a positive pra negative way, depending of The guess result.

```
export const Train = (weights, point, expectedType)=> {
    
    let guess = GuessType(weights, point)
    let error = expectedType - guess;

    return {
        x: weights.x + error * point.x,
        y: weights.y + error * point.y
    }
}
```

Calling the train function

Set a function that generate just one Random Point:

```jsx

export const GeneratePoints = (qtd)=>{
    let points = []
    for(let i = 1; i <= qtd; i++){
				//pushing the GeneratePoint const
        points.push(GeneratePoint())
    }
    return points
}

export const GeneratePoint =()=> {
    return {
        x: Math.random() * 100,
        y: Math.random() * 100
    }
}
```

Now we have to use the training function, controlled by the interactions we can set, interactions are the times the Neuron will bet:

```jsx
const TrainingInteractions = 100;

    const OnTrainClick = ()=> {
        let newWeights = weights;
        for(let i = 0; i < TrainingInteractions; i++){
            let newPoint = GeneratePoint();
            newWeights = Train(newWeights, newPoint, GetType(newPoint) )
        }
        setWeights(newWeights)
    }
```

As we have to controll the Training, we will create a button that on clicked, calls the function.

```jsx
<button onClick={onTrainClick}> Train </button>
```

So the code is still generating random points, but now on every time we click the button, the “Train” function is executed, it bets the value and we inibe or excite this behavior, then the Neuron adjusts the “Weights” state to get each time more similar results to the “GetType” function;

Each more interations we do, more this Flow Occurs and consequently, more adjusted the weights are and more accurate the Neuron is, and after some clicks, the Neuron finnally learned how to classify correctly the Balls:

Congratulations 🗿
