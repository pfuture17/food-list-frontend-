import axios from 'axios';
import {React, useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import "./css/FoodList.css"

const FoodList = ({foods, setFoods, feedbacks, setFeedbacks}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");

    const [emptyField, setEmptyField] = useState(false)

    const [selectedFood, setSelectedFood] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const feedBackChangeHandler = (food) => {
        handleShow();
        setSelectedFood(food);
    }

    const addFeedBackBtn = () => {
        if(!name || !details){
            setEmptyField(true)
        } else {
            axios.post('http://localhost:8000/feedbacks/', {
                   name,
                   type,
                   details,
                   votes : 0,
                   food_id : selectedFood._id
                }).then(res => {
                    alert("Feedback Added!")
                    let feedbacksCopy = [...feedbacks];
                    feedbacksCopy.push(res.data);
                    setFeedbacks(feedbacksCopy);
                    setName("");
                    setDetails("");
                    setType("");
                })
        }
    }

    return (
        <div className="foodContainer">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="modalHeader">
                <Modal.Title>Add Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    {emptyField?<p className="empty">Input field cannot be blank</p>:null}
                    <div className="addFoodFormModal">
                        <span>Name: </span>
                        <input type="text"  value={name} onChange={(e)=>{setName(e.target.value); if(emptyField){setEmptyField(false)}}}/> <br />
                        <span>Type: </span>
                        <select onChange={(e)=>{setType(e.target.value)}}>
                            <option value=" "> </option>
                            <option value="request">feature request</option>
                            <option value="report">report a bug</option>
                            <option value="about">about the food</option>
                        </select> <br />
                        <span>Details: </span> 
                        <textarea value={details} onChange={(e) => {setDetails(e.target.value);if(emptyField){setEmptyField(false)}}} cols="30" rows="3"></textarea> <br />
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                <Button variant="primary" onClick={addFeedBackBtn}>
                    Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            {
                foods.map( food => {
                    return( 
                    <div className="foodBox">
                        <span>Name: {food.name}</span> <br />
                        <span>Details: {food.details}</span> <br />
                        <img id="img" src={food.image} width={300} /> <br />
                        <button id="addFeedbackBtn" onClick={()=>{feedBackChangeHandler(food)}}>Add Feedback</button> <br />
                        {/* <span>feedbacks: 
                        {
                            feedbacks.map(feedback => {
                                if( feedback.food_id === food._id){
                                    return console.log(feedback)
                                }
                            })
                        }
                        </span> */}
                    </div>)
                })
            }
        </div>
    )
}

export default FoodList
