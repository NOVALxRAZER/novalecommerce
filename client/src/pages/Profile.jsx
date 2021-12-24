import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    // Publish,
} from "@material-ui/icons";
import TextField from '@mui/material/TextField';
import app from "../firebase";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { updateUser } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/profile.css"
 
const Profile = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorText, setErrorText] = useState("")
  const [errors1, setErrors1] = useState({email})
  const [errors2, setErrors2] = useState({phone})
  const [errors3, setErrors3] = useState({address})
  const [values, setValues] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [file, setFile] = useState(null)
  const dispatch = useDispatch();
  const player = useSelector(state => state.user.currentUser);


  const handleChange1 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})
    setErrors1({ email: '' })
    setEmail(e.target.value)
    let reg1 = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(e.target.value)
    if(!reg1){
        setErrors1({ email: "Email should be a Valid Email and containt 1 '@ + .com' Character" })
    }
  }

  const handleChange2 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})
    setErrors2({ phone: '' })
    setPhone(e.target.value)
    let reg = new RegExp(/^[0-9]{12,12}$/).test(e.target.value)
    if(!reg){
        setErrors2({ phone: 'Phone should be only 12 Numbers' })
    }
  }

  const handleChange3 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})
    setErrors3({ address: '' })
    setAddress(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!values.email){
      setErrors1({ email: "Email is Required" })
    }if(!values.phone){
      setErrors2({ phone: "Phone is Required" })
    }if(!values.address){
      setErrors3({ address: "Address is Required" })
    }if(!file){
      setErrorText("Please Input 1 Image")
    }else{
      setErrorText("")
    }if(values.email && values.phone && values.address && file){

      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(StorageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
          case 'paused':
          console.log('Upload is paused');
          break;
          case 'running':
          console.log('Upload is running');
          break;
        default:
      }
      }, function(error) {
      // Handle unsuccessful uploads
      }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(function(downloadURL) {
          if(values.email && values.phone && values.address && file){
            updateUser(player._id, {
              ...values,
              image: downloadURL,
            }, dispatch)
            alert("Profile has been Updated");
          }
        });
      });
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <button className="userBack" >
          <a href="/" style={{textDecoration:"none", color:"white"}}>Back to Homepage</a>
        </button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={player ? player.image : "https://p.kindpng.com/picc/s/22-223863_no-avatar-png-circle-transparent-png.png"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{player.username}</span>
              <span className="userShowUserTitle">Happy Me</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{player.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{player.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{player.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{player.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Email</label>
                <TextField 
                  id="standard-basic" 
                  label="Email" 
                  variant="standard" 
                  type="email"
                  name="email"
                  placeholder={player.email}
                  onChange={handleChange1}
                  error={Boolean(errors1?.email)}
                  helperText={(errors1?.email)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <TextField 
                  id="standard-basic" 
                  label="Phone" 
                  variant="standard" 
                  type="text"
                  name="phone"
                  placeholder={player.phone}
                  onChange={handleChange2}
                  error={Boolean(errors2?.phone)}
                  helperText={(errors2?.phone)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <TextField 
                  id="standard-basic" 
                  label="Address" 
                  variant="standard" 
                  type="text"
                  name="address"
                  placeholder={player.address}
                  onChange={handleChange3}
                  error={Boolean(errors3?.address)}
                  helperText={(errors3?.address)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={player.image || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"}
                  alt=""
                />
                {/* <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label> */}
              </div>
              <input className="uploadInput" type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
              <span style={{color: "red", marginTop: "-25px"}}>{errorText}</span>
              <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
