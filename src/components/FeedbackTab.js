import axios from 'axios';
import {useState,React} from 'react'
import { Modal, Button } from 'react-bootstrap';
import "./css/FeedbackTab.css"

const FeedbackTab = ({feedbacks, setFeedbacks, comments, setComments, foods, feedback}) => {
    const [newComments, setNewComments] = useState("")
    const [name, setName] = useState("")

    const [emptyField, setEmptyField] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const feedBackChangeHandler = (feedback) => {
    //     handleShow();
    //     setSelectedFeedback(feedback);

    // }


    const addVoteBtn = () => {
        axios.put('http://localhost:8000/feedbacks/'+ feedback._id, {
            votes: feedback.votes + 1
        }).then( res => {
            let feedbacksCopy = [...feedbacks];
            const feedbackIndex = feedbacksCopy.findIndex( feed => feed._id === res.data._id);
            feedbacksCopy[feedbackIndex] = res.data;
            setFeedbacks(feedbacksCopy);
        })
    }

    const addCommentBtn = () => {
        if(!newComments) {
            setEmptyField(true)
        } else {
            axios.post('http://localhost:8000/comments/', {
                comment : newComments,
                feedback_id : feedback._id,
                name

            }).then(res => {
                let commentsCopy = [...comments];
                commentsCopy.push(res.data);
                setComments(commentsCopy);
                setNewComments("")
                setName("")
                
            })
        }
    }
    return (
        <div className="feedbackContainer">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="modalHeader">
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="addFoodFormModal">
                        {emptyField?<p className="error">Cannot be Empty</p>: null}
                        <span>Name: </span> <input type="text"
                                                    placeholder="Your Name"
                                                    value={name}
                                                    onChange={(e)=>{setName(e.target.value); if(emptyField){setEmptyField(false)}}} /> <br />
                        <span>Comment: </span><textarea value={newComments} 
                                    placeholder="Your Comment"
                                    value={newComments}
                                    onChange={(e)=>{setNewComments(e.target.value); if(emptyField){setEmptyField(false)}}} 
                                    cols="50" 
                                    rows="2">
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                <Button variant="primary" onClick={addCommentBtn}>
                    Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
           
                <div className="feedbackBox">
                            <span>user: {feedback.name}</span> <br />
                            <hr />
                            <span>type: {feedback.type}</span> <br />
                            <hr />
                            <span>details: {feedback.details}</span> <br />
                            <hr />
                            <span>votes: {feedback.votes}</span> <img id="upvote" onClick={addVoteBtn} src="https://image.flaticon.com/icons/png/512/992/992703.png" width={15} />
                            <hr />
                            <p>COMMENTS: </p> 
                            <hr />
                            <div className="commentContainer">
                                <p>
                                    {
                                        comments.map(comment => {
                                            if(comment.feedback_id === feedback._id){
                                                return (
                                                    <div className="commentBox">
                                                        <span>Name: {comment.name}</span> <br />
                                                        <span>Comment: {comment.comment}</span>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </p>
                            </div>
                            <button id="addCommentBtn" onClick={handleShow}>Add a Comment</button>
                </div>
        </div>
    )
}

export default FeedbackTab


   