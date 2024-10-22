"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TestProps } from '../provider';
import "./result.css"
import { useContext, useEffect } from 'react';
import {sendResult} from '../actions';
import GlobalContext from '../context';

export default function Result({updateState,wpm,ts,nc,nw}:TestProps) {

    const context = useContext(GlobalContext);
    const {folder_Id} = {...context}
    console.log("this the folder id : " ,folder_Id)

    const addingResult = async () => {

        const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate.getDate()
            .toString()
            .padStart(2, '0')} ${currentDate.getHours()
            .toString()
            .padStart(2, '0')}:${currentDate.getMinutes()
            .toString()
            .padStart(2, '0')}`;

        const resultDto : any = {folder_Id:folder_Id,wpm:Number(wpm),date : formattedDate, chars:`${nc} / ${nw}` }
        const data = sendResult(resultDto);
    }
    useEffect(()=>{
        try{
            addingResult();
        }catch(e){}

    },[])


    return (
        <div className="Resultcontainer">
            <div className="wpm">
                <label htmlFor="">wpm</label>
                <div className="div">{wpm}</div>
            </div>
            <div className="container1">
                <div className="characters">
                    <label htmlFor="">characters</label>
                    <div className="char">
                        <span className='correctNc'>{nc}</span>
                        <span> / </span>
                        <span className='wrongNw'>{nw}</span>
                        </div>
                </div>
                <div className="time">
                    <label htmlFor="">time</label>
                    <div className="tm">{Math.floor(ts || 0)} <span className='seconds'>s</span></div>
                </div>
            </div>
            <div className="button-container">
                <button className="icon-button" onClick={updateState}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}
