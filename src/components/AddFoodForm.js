import axios from 'axios';
import {React, useState} from 'react'
import "./css/AddFoodForm.css"

const AddFoodForm = ({foods, setFoods}) => {
    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState("")

    const [emptyFieldMessage, setEmptyFieldMessage] = useState(false)

    const addFoodBtn = () => {
        if(!name || !details || !image){
            setEmptyFieldMessage(true)
        }
        else {
            axios.post('http://localhost:8000/foods/', {
                name,
                details,
                image
            }).then(res => {
                alert("Food Added!")
                let foodsCopy = [...foods];
                foodsCopy.push(res.data);
                setFoods(foodsCopy);
                setName("");
                setDetails("");
                setImage("");
            })
        }
    }

    return (
        <div className="addFoodFormModal">
            <span>Name: </span>
            <input type="text" 
                    value={name}
                    onChange={(e)=>{setName(e.target.value); if(emptyFieldMessage){setEmptyFieldMessage(false)}}}/> <br />
            <span>Details: </span>
            <textarea   cols="30" rows="3"
                        value={details}
                        onChange={(e)=>{setDetails(e.target.value); if(emptyFieldMessage){setEmptyFieldMessage(false)}}}></textarea><br />
            <span>Image: </span>
            <input type="url" 
                    value={image}
                    onChange={(e)=>{setImage(e.target.value); if(emptyFieldMessage){setEmptyFieldMessage(false)}}}/> <br />
            <button onClick={addFoodBtn}>Add Food</button>
        </div>
    )
}

export default AddFoodForm
