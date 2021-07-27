import {useState,React} from 'react'
import "./css/AdminLogin.css"

const AdminLogin = ({comments, setComments, feedbacks, setFeedbacks, admins, setAdmins}) => {
    const [loginPassword, setLoginPassword] = useState("")
    const [login, setLogin] = useState(false)

 

    const adminLoginBtn = () => {
        admins.map(admin => {
            if(loginPassword === admin.name){
                window.location.href = "/admindashboard";
                window.localStorage.setItem("admin_login",JSON.stringify(admin._id));
            } else {
                alert("wrong password")
            }
        })
    }
    console.log(admins)
    return (
        <div className="adminLogin">
            <span>Admin Login: </span>
            <input type="password"
                    onChange={(e)=>{setLoginPassword(e.target.value)}}
                    value={loginPassword} /> <br/>
            <button onClick={adminLoginBtn}>Login</button>
        </div>
    )
}

export default AdminLogin
