import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import app from "../firebase";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { updateUser } from "../redux/apiCalls";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/profile.css"
 
const Profile = () => {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const adminRef = useRef();

    const player = useSelector(state => state.user.currentUser);

    const handleChange = (e) => {
        setInputs(prev => {
        return {...prev, [e.target.name]: e.target.value}
        });
    }

    const handleClick = (e) => {
        e.preventDefault();

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
                dispatch(updateUser(player._id,{
                ...inputs,
                image:downloadURL,
                isAdmin: adminRef.current.value,
                }))
            });
        });
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
              src={player ? player.image : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"}
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
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
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
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={player.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={player.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={player.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder={player.address}
                  className="userUpdateInput"
                  onChange={handleChange}
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
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Profile
