"use client"
import Header from "../components/Header";
import "./css.css"
import Test from '../components/Test';
import { useState } from "react";
import Result from "../components/Result";


export default function Home() {

  const [result,setResult] = useState(false);
  const [ts,setTs] = useState(0);
  const [wpm,setWpm] = useState(0);
  const [nc,setNc] = useState(0);
  const [nw,setNw] = useState(0);

    
  const getInfos = (start:Date,end:Date,corretIds:number[],wrongIds:number[]) => {
    
    setNc(corretIds.length)
    setNw(wrongIds.length)
    let ts = (end.getTime() - start.getTime()) / 1000;
    setTs(ts)
    let tm = ts / 60;
    const words = corretIds.length / 5;
    const wpm = Math.round(words / tm);
    setWpm(wpm)
    setResult(true)
  } 

  return (
    <>
      <Header></Header>
      <main>
      {!result && <Test  getInfos={getInfos}  />}

      {result && <Result  updateState={()=> setResult(false)} wpm={wpm} ts={ts} nc={nc} nw={nw} />}
      
      </main>
      
    </>
  );
}
