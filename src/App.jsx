import { useEffect, useState } from 'react'

function App() {

  const [gridSize,setGridSize] = useState(2)
  const [grid,setGrid] = useState([]);
  const [filled,setFilled] = useState([]);
  const [disabled,setDisabled] = useState(false);
  const [result,setResult] = useState(false);
  const [solved,setSolved] = useState([]);

  function handleGridSize(e){
    if(e > 1 && e < 11){
      setGridSize(e);
    }
  }

  useEffect(()=>{
    setDisabled(false);
    setSolved([]);
    setResult(false);
    let grid = gridSize * gridSize;
    let gridNum = Math.floor(grid/2);
    let cards = new Array(gridNum).fill("").map((_,i)=>i+1)
    let newCards = [...cards,...cards].sort(()=>Math.random()-0.5).map((number,index)=>({id:index,num:number}))
    setGrid(newCards);

  },[gridSize])

  function handleClickCard(index){
    if(filled.length==0){
      setFilled([index])
      return;
    }

    if(filled.length==1){
      setDisabled(true);
      if(filled[0]!==index){
        setFilled([...filled,index])
        let [firstid] = filled;
        if(grid[firstid].num == grid[index].num){
          setSolved([...solved,firstid,index]);
          setDisabled(false)
          setFilled([]);
        }
        else{
          setTimeout(()=>{
            setDisabled(false)
            setFilled([]);
          },1500)
        }
      }
      else{
        setFilled([]);
        setDisabled(false);
      }
    }
  }

  useEffect(()=>{
    if(solved.length == grid.length && grid.length>0)
      setResult(true)
  },[grid,solved])

  function handleResetGame(){
    if(result){
      setGridSize(2)
      setFilled([]);
      setDisabled(false);
      setSolved([]);
      setResult(false)
    }
    else{
      setFilled([]);
      setDisabled(false);
      setSolved([]);
    }
  }

  const isFilled = (index) => filled.includes(index) || solved.includes(index)
  const isShowed = (index) => solved.includes(index)
  return (
    <>
      <h1>Memory Number Game</h1>
      <label htmlFor="grid_size">Enter Grid Size: </label><input type="number" id="grid_size" value={gridSize} onChange={(e)=>handleGridSize(e.target.value)} min={2} max={10}></input>
      <br/><br/>
      <div style={{display:"grid", gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`, width:`min(100%,${gridSize*2.5}rem)`}}>
        {grid.map((i,index)=>{
          return <div key={i.id} style={{width:40,height:40,border: "1px solid black",cursor:"pointer",alignContent:"center",textAlign:"center", backgroundColor: isFilled(i.id) ? isShowed(i.id) ? "lightgreen" : "lightblue" : "lightyellow"}} onClick={()=>handleClickCard(i.id)}>{isFilled(i.id) ? i.num : "?"}</div>
        })}
      </div>
      <br/>
      {result && <div>WON!!</div>}
      <br/>
      <button onClick={handleResetGame}>{result ? "New Game" : "Reset"}</button>
    </>
  )
}

export default App
