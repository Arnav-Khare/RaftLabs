import React,{useState} from "react";
import styled from "styled-components";
import { Button } from "../Components/Buttons";
import { Marginer } from "../Components/Marginer";
import { Modal } from 'react-bootstrap';

// import axios from "axios";





const InputForm = styled.input`
display:flex;
justify-content:center;
outline: 0;
background: #f2f2f2;
width: 80%;
border: 0;
border-radius: 5px;
margin: 0 auto;
padding: 15px;
box-sizing: border-box;
font-size: 14px;
font-family: 'Comfortaa', cursive;`;

const Center = styled.div`
    color:#A5A5A5;
    display:flex;
    justify-content:center;
    cursor:pointer;

`


  function MyVerticallyCenteredModalRegister(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [campusId, setCampusId] = useState("");
    const [errorMessage,setErrorMessage] = useState("")
    const handleSubmit = async(e) => {
     e.preventDefault();
      if (email === "" || password === "" || name ===" " || phonenumber === " " || confirmPassword === " ") {
        setErrorMessage('Please Enter the Required Field')
      } else if(confirmPassword != password){
        setErrorMessage("Password MisMatch...!")
      }
      else{
        const userDetails = {
          name,
          email,
          password,
          phonenumber,
          campusId,
        }
      //   axios.post('http://localhost:6001/register',userDetails).then((response) => {
      //     if(response.status === 200){
      //       localStorage.setItem("isAuthenticated", "true");
      //       navigate('user',{ state: response.data})
      //     }
      //   }, (error) => {
      //     setErrorMessage('Invalid Login Details')
      //   });
        
       }
    }
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <InputForm
          type="text" 
          value={name}
          placeholder="FullName"
          name="fullname"
          onChange={(e) =>setName(e.target.value)}
        />
        <Marginer direction="vertical" margin={10}></Marginer>
         <InputForm
          type="text" 
          placeholder="Email"
          value={email}
          name="email"
          onChange={(e) =>setEmail(e.target.value)}
        />
        <Marginer direction="vertical" margin={10}></Marginer>
         <InputForm
          type="numbr" 
          placeholder="PhoneNumber"
          value={phonenumber}
          name="phonenumber"
          onChange={(e) =>setPhoneNumber(e.target.value)}
        />
        <Marginer direction="vertical" margin={10}></Marginer>
         <InputForm
          type="password" 
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) =>setPassword(e.target.value)}
        />
        <Marginer direction="vertical" margin={10}></Marginer>
         <InputForm
          type="password" 
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={(e) =>setConfirmPassword(e.target.value)}
        />
        <Marginer direction="vertical" margin={10}></Marginer>
         <InputForm
          type="text" 
          placeholder="Campus ID (Optional)"
          value={campusId}
          name="campusId"
          onChange={(e) =>setCampusId(e.target.value)}
        />
          <Center>
        {errorMessage && (
          <p className="text-danger"> {errorMessage} </p>
        )}
        </Center>
        <Marginer direction="vertical" margin={20}></Marginer>
        <Center>
            <Button width={80} center={true} onClick={(e)=>{handleSubmit(e)}}>
                Register As Candidate
            </Button>
        </Center>

        <Marginer direction="vertical" margin={20}></Marginer>
        </Modal.Body>
        <Modal.Footer>
           
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export function ModalContainer(props){
    const [modalShow, setModalShow] = React.useState(props.modal);
    const [modalRegisterShow, setModalRegisterShow] = React.useState(props.modal);
    const [show, setShow] = useState(props.modal);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
       
    </>
        )
  
     }

   