"use client";

import { faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from 'react-bootstrap'; 
import Header from "../components/Header";
import "./profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfos, getResults,updateInfos } from '../actions';
import GlobalContext from '../context';
import { useContext} from 'react';





const resultsPerPage = 10; 

export default function Profile() {

  const context = useContext(GlobalContext);

  const {gUsername,setGUsername} = {...context}
  const [username,setUsername] = useState("loading...")



  const [currentPage, setCurrentPage] = useState(1);
  const [showModal,setShowModal] = useState(false)
  const [userDto,setUserDto] = useState<any>(null);
  const [resultsDto,setResultsDto] = useState<any[]>([])
  const [idValue,setIdValue] = useState(1)
  const [nameValue,setNameValue] = useState("")
  const [ageValue,setAgeValue] = useState("")
  const [emailValue,setEmailValue] = useState("")
  const [phoneValue,setPhoneValue] = useState("")
  const [sexValue,setSexValue] = useState("")
  const [usernameValue,setUserNameValue] = useState("")
  const [passwordValue,setPasswordValue] = useState("")
  const [countryValue,setCountryValue] = useState("")

  // for the pagination 
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = resultsDto.slice(indexOfFirstResult, indexOfLastResult);
  const pageNumbers = Math.ceil(resultsDto.length / resultsPerPage);

  // for the Modal 
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => { 
 
    const userDto1 : any  = {
      id: Number(idValue),
      name: nameValue,
      age: Number(ageValue),
      email: emailValue,
      phone: Number(phoneValue),
      sex: sexValue,
      username: usernameValue,
      password: passwordValue,
      country: countryValue
  };
    if(userDto1){
      updateInfos(userDto1)
      setGUsername(userDto1.username)
    }
    setShowModal(false)
  }

  const fetchUserData = async () => {
    try{
      const data = await getUserInfos(username);
      setUserDto(data)
    }catch(e){}
  }

  const fetchUserResults = async () => {
    try{
      if (username){
        const data = await getResults(username);
        setResultsDto(data)
      }
    }catch(e){
    }
  }

  useEffect(()  => {
    fetchUserData();
  },[username])

  useEffect(()=>{
    if (gUsername)
        setUsername(gUsername)
  },[gUsername])


  useEffect(()=>{
    if(userDto)
      fetchUserResults();
    if(userDto)
   {
    setNameValue(userDto.name);
    setAgeValue(userDto.age);
    setEmailValue(userDto.email);
    setPhoneValue(userDto.phone);
    setSexValue(userDto.sex);
    setUserNameValue(userDto.username)
    setCountryValue(userDto.country)
   }
  },[userDto])


  useEffect(()=>{

  },[username])


  return (
    <>
      <Header />
      <div className="container profile-container">
        <div className="userSection">
          <div className="user-info">
            <FontAwesomeIcon className="user-icon" icon={faUser} />
            <div className="user-details">
              <h2 className="user-name">{username? username:'loading...'}</h2>
            </div>
          </div>
          <FontAwesomeIcon className="btn edit-icon" icon={faPen} onClick={()=>handleOpenModal()} />
        </div>

        <div className="result-table mt-5">

          <table className="custom-table table-striped table-dark">
            <thead>
              <tr>
                <th>WPM</th>
                <th>Characters</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result, index) => (
                 <tr key={index}>
                  <td>{result.wpm}</td>
                  <td>{result.chars}</td>
                  <td>{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <Pagination className="justify-content-center custom-pagination">
  <Pagination.Prev
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
  />
  {[...Array(pageNumbers)].map((_, index) => (
    <Pagination.Item
      key={index + 1}
      active={index + 1 === currentPage}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ))}
  <Pagination.Next
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers))}
  />
</Pagination>

        </div>
      </div>


      <Modal show={showModal} onHide={() => setShowModal(false)} className='modal'>
  <Modal.Body className='modalBbody'>
    <label htmlFor="name">Name</label>
    <input 
      type="text" 
      name="name" 
      id="name" 
      value={nameValue} 
      onChange={(e) => setNameValue(e.target.value)} 
    />

    <label htmlFor='age'>Age</label>
    <input 
      type="text" 
      name="age" 
      id="age" 
      value={ageValue} 
      onChange={(e) => setAgeValue(e.target.value)} 
    />

    <label htmlFor="phone">Phone</label>
    <input 
      type="text" 
      name="phone" 
      id="phone" 
      value={phoneValue} 
      onChange={(e) => setPhoneValue(e.target.value)} 
    />

    <label htmlFor="sex">Sex</label>
    <input 
      type="text" 
      name="sex" 
      id="sex" 
      value={sexValue} 
      onChange={(e) => setSexValue(e.target.value)} 
    />

    <label htmlFor="country">Country</label>
    <input 
      type="text" 
      name="country" 
      id="country" 
      value={countryValue} 
      onChange={(e) => setCountryValue(e.target.value)} 
    />

    <label htmlFor="email">Email</label>
    <input 
      type="email" 
      name="email" 
      id="email" 
      value={emailValue} 
      onChange={(e) => setEmailValue(e.target.value)} 
    />

    <label htmlFor="username">Username</label>
    <input 
      type="text" 
      name='username' 
      id='username' 
      value={usernameValue} 
      onChange={(e) => setUserNameValue(e.target.value)} 
    />

    <label htmlFor="password">Password</label>
    <input 
      type="text" 
      name="password" 
      id="password" 
      value={passwordValue}
      onChange={(e) => setPasswordValue(e.target.value)} 
    />
  </Modal.Body>
  <Modal.Footer className='footer'>
    <Button onClick={handleCloseModal}> Save </Button>
  </Modal.Footer>
</Modal>



    </>
  );
}
