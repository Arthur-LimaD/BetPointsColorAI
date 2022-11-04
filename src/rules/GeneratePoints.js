export const GeneratePoints = (qtd)=>{
    let points = []
    for(let i = 1; i <= qtd; i++){
        points.push(GeneratePoint())
    }
    return points
}

export const GetType = ({x, y})=> {
    return (x > y) ? 1 : -1;
}

export const GeneratePoint =()=> {
    return {
        x: Math.random() * 100,
        y: Math.random() * 100
    }
}