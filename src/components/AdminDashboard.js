import React from 'react'
import axios from 'axios'
import "./css/adminDashboard.css"

const adminDashboard = ({feedbacks, setFeedbacks, comments, setComments, foods}) => {
    const deleteFeedbackBtn = (feedback) => {
        axios.delete('http://localhost:8000/feedbacks/' + feedback._id)
        .then( res => {
            alert("deleted successfuly");
            let updatedFeedback = feedbacks.filter(feedback => feedback._id !== res.data._id);
            setFeedbacks(updatedFeedback);
            
        })
    }

    const deleteComment = (comment) => {
        axios.delete('http://localhost:8000/comments/' + comment._id)
        .then( res => {
            alert("deleted successfuly");
            let updatedComment = comments.filter(comment => comment._id !== res.data._id);
            setComments(updatedComment);
            
        })
    }

    return (
        <div className="adminContainer">
            <a id="logout" href="/foods">Logout</a>
           {
               feedbacks.map(feedback => {
                   return(
                    <div className="feedbackBoxAdmin">
                    <img id="delete" onClick={()=>{deleteFeedbackBtn(feedback)}} src="https://image.flaticon.com/icons/png/512/1828/1828665.png" width={15} /> <br />
                    <span>user: {feedback.name}</span> <br />
                    <hr />
                    <span>type: {feedback.type}</span> <br />
                    <hr />
                    <span>details: {feedback.details}</span> <br />
                    <hr />
                    <span>votes: {feedback.votes}</span> <img id="upvote" src="https://image.flaticon.com/icons/png/512/992/992703.png" width={15} /> 

                    <p>COMMENTS: </p> 
                    <div className="commentContainer">
                        <p>
                            {
                                comments.map(comment => {
                                    if(comment.feedback_id === feedback._id){
                                        return (
                                            <div className="commentBox">
                                                <img id="delete" onClick={()=>{deleteComment(comment)}} src="https://image.flaticon.com/icons/png/512/1828/1828665.png" width={15} />
                                                <span>Name: {comment.name}</span> <br />
                                                <span>Comment: {comment.comment}</span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </p>
                    </div>
                    </div>
                   )
               })
           }
        </div>
    )
}

export default adminDashboard
