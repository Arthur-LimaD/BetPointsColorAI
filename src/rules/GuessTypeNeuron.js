export const GuessType = (weight, point)=> {
    let sum = point.x * weight.x + point.y * weight.y;
    return sum > 0 ? 1 : -1;
}

export const GenerateRandomWeights = ()=> {
    return {
        x: Math.random() *2 -1,
        y: Math.random() *2 -1
    }
}


export const Train = (weights, point, expectedType)=> {
    
    let guess = GuessType(weights, point)
    let error = expectedType - guess;

    return {
        x: weights.x + error * point.x,
        y: weights.y + error * point.y
    }
}