import app from "../../firebase";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./newUser.css";
import { addUser } from "../../redux/apiCalls";

export default function NewUser() {
  const [file, setFile] = useState(null)
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const adminRef = useRef();

  // const handleChange = (e) => {
  //   setInputs(prev => {
  //     return {...prev, [e.target.name]: e.target.value}
  //   });
  // }

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
        const tambahUser = { 
          image:downloadURL,
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          phone: phoneRef.current.value,
          address: addressRef.current.value,
          isAdmin: adminRef.current.value,
        };
        addUser(tambahUser, dispatch)
      });
    });
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="Username" ref={usernameRef}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="Email" ref={emailRef}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" ref={passwordRef}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input name="phone" type="text" placeholder="+62 123 4567 8910" ref={phoneRef}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input name="address" type="text" placeholder="Alamat" ref={addressRef}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="active" ref={adminRef}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
