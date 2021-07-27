import { useEffect, useState, React } from 'react';
import { Route, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';


import FoodList from './components/FoodList';
import AddFoodForm from './components/AddFoodForm';
import FeedbackTab from './components/FeedbackTab';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import "./App.css";


function App({ foods, setFoods, feedbacks, setFeedbacks, comments, setComments, admins, setAdmins}) {
  const [selectedFoodLabel, setSelectedFoodLabel] = useState("");
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterFeedbacks  = () => {
    if(!selectedFoodLabel){
        setFilteredFeedbacks( feedbacks.filter(feedback=>feedback.type===selectedFeedbackType))
    }
    if(!selectedFeedbackType){
        setFilteredFeedbacks(feedbacks.filter(feedback=>feedback.food_id.name===selectedFoodLabel))
    }
    if(selectedFeedbackType && selectedFoodLabel){
        setFilteredFeedbacks( feedbacks.filter(feedback=> feedback.food_id.name === selectedFoodLabel && feedback.type===selectedFeedbackType))
    }
    if(!selectedFeedbackType && !selectedFoodLabel){
        setFilteredFeedbacks( feedbacks )
    }
}


  useEffect(() => {
    axios.get('http://localhost:8000/foods').then((res) => {
      setFoods(res.data);
    })
    axios.get('http://localhost:8000/feedbacks').then((res) => {
      setFeedbacks(res.data);
    })
    axios.get('http://localhost:8000/comments').then((res) => {
      setComments(res.data);
    })
    axios.get('http://localhost:8000/admins').then((res) => {
      setAdmins(res.data);
    })
  }, [])


  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks])
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modalHeader">
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <AddFoodForm
            foods={foods}
            setFoods={setFoods}/>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <header>
        <h1>Food Dishes</h1>
        <nav>
          <Link to="/foods"><a href="#"> Food List</a></Link>
          <a href="#" onClick={handleShow}>Add Food</a>
          <Link to="/feedback"><a href="#">Feedbacks</a></Link>
          <Link to="/admins"><a href="#">Admin Login</a></Link>
        </nav>
      </header>
      {/* FOODLIST */}
      <Route path="/foods">
        <FoodList
          foods={foods}
          setFoods={setFoods}
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}/>
      </Route>
      {/* FEEDBACK */}
      <Route path="/feedback">
        <div className="select">
          <span>Food Name: </span>
          <select value={selectedFoodLabel} onChange={(e)=>{setSelectedFoodLabel(e.target.value)}}>
                    <option value="">All</option>
                    {
                        foods.map( food => {
                            return (<option value={food.name}>{food.name}</option>)
                        })
                    }
          </select>
          <span>Type of Feedback: </span>
          <select value={selectedFeedbackType} onChange={(e)=>{setSelectedFeedbackType(e.target.value)}}>
                    <option value="">All</option>
                    <option value="request">request a feature</option>
                    <option value="report">report a bug</option>
                    <option value="about">about the food</option>
          </select>
          <button onClick={filterFeedbacks}>Filter</button>
        </div>
        {
           filteredFeedbacks.sort((a,b) => b.votes - a.votes).map(feedback => {
                return(<FeedbackTab 
                  feedback={feedback}
                  feedbacks={feedbacks}
                  setFeedbacks={setFeedbacks}
                  comments={comments}
                  setComments={setComments}
                  foods={foods}/>
                  )
          })
        }
      </Route>
      <Route exact path="/admins">
          <AdminLogin 
            admins={admins}
            setAdmins={setAdmins}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
            comments={comments}
            setComments={setComments}/>
      </Route>
      <Route  path="/admindashboard">
        <AdminDashboard
                  feedbacks={feedbacks}
                  setFeedbacks={setFeedbacks}
                  comments={comments}
                  setComments={setComments}
                  foods={foods}/>
      </Route>

    </div>
  );
}
const mapStateToProps = ({ foods, feedbacks, comments, admins }) => {
	return {
    foods,
    feedbacks,
    comments,
    admins
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
    setFoods: (foods) => {
      dispatch({type: "setFoods", payload: foods })
    },
    setFeedbacks: (feedbacks) => {
      dispatch({type: "setFeedbacks", payload: feedbacks})
    },
    setComments: (comments) => {
      dispatch({type: "setComments", payload: comments})
    },
    setAdmins: (admins) => {
      dispatch({type: "setAdmins", payload: admins})
    }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
