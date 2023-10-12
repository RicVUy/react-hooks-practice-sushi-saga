import React, {useState, useEffect} from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushis, setSushis] = useState([])
 const [wallet, setWallet] = useState(100)
  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(sushis => { 
      const modifiedSushis = sushis.map(sushi => {
        return {...sushi, isEaten:false}
      })
      setSushis(modifiedSushis)
    })
  }, [])

  function handleEatSushi(eatenSushi) {
    const updatedSushis = sushis.map((sushi) => {
      if (sushi.id === eatenSushi.id) {
        return {...sushi, isEaten:true}

      } else {
        return sushi 
      }
    })
    setSushis(updatedSushis)
  }
  const emptyPlates = sushis.filter((sushi) => sushi.isEaten)
  console.log(sushis)
  return (
    <div className="app">
      <SushiContainer sushis={sushis} onEatSushi={handleEatSushi}/>
      <Table plates={emptyPlates} wallet={wallet}/>
    </div>
  );
}

export default App;
