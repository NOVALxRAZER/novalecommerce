import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, stateGetProduct, stateGetUser } from "../../redux/apiCalls";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import "./newUser.css";

export default function NewUser() {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errors1, setErrors1] = useState({ username });
    const [errors2, setErrors2] = useState({ password })
    const [errors3, setErrors3] = useState({ email })
    const [errors4, setErrors4] = useState({ phone })
    const [errors5, setErrors5] = useState({ address })
    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
    });
    const [sukses, setSukses] = useState(false);
    const dispatch = useDispatch();
    const adminRef = useRef();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange1 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors1({ username: '' })
        setUsername(e.target.value);
        let reg = new RegExp(/^[A-Za-z0-9]{4,12}$/).test(e.target.value)
        if (!reg) {
            setErrors1({ username: 'Username should be only 4-12 Characters and/or Numbers' })
        }
    }

    const handleChange2 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors2({ password: '' })
        setPassword(e.target.value);
        let reg2 = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/).test(e.target.value)
        if (!reg2) {
            setErrors2({ password: "Password should be 6-16 characters, and atleast containt 1 Number" })
        }
    }

    const handleChange3 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors3({ email: '' })
        setEmail(e.target.value)
        let reg3 = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(e.target.value)
        if (!reg3) {
            setErrors3({ email: "Email should be a Valid Email and containt 1 '@ + .com' Character" })
        }
    }

    const handleChange4 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors4({ phone: '' })
        setPhone(e.target.value)
        let reg4 = new RegExp(/^[0-9]{12,12}$/).test(e.target.value)
        if (!reg4) {
            setErrors4({ phone: 'Phone should be only 12 Numbers' })
        }
    }

    const handleChange5 = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors5({ address: '' })
        setAddress(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (!values.username) {
            setErrors1({ username: "Username is Required" })
        }
        if (!values.password) {
            setErrors2({ password: "Password is Required" })
        }
        if (!values.email) {
            setErrors3({ email: "Email is Required" })
        }
        if (!values.phone) {
            setErrors4({ phone: "Phone is Required" })
        }
        if (!values.address) {
            setErrors5({ address: "Address is Required" })
        }

        if (values.username && values.password && values.email && values.phone && values.address) {
            if (file) {
                const fileName = new Date().getTime() + file.name;
                const storage = getStorage(app);
                const StorageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(StorageRef, file);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function (snapshot) {
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
                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
                        addUser({
                            ...values,
                            image: downloadURL,
                            isAdmin: adminRef.current.value,
                        }, dispatch)
                        setSukses(true)
                    });
                });
            } else {
                addUser({
                    ...values,
                    isAdmin: adminRef.current.value,
                }, dispatch)
                setSukses(true)
            }
        }
    }

    useEffect(() => {
        stateGetUser(dispatch);
        stateGetProduct(dispatch);
    }, [dispatch]);

    const handleClose = () => {
        setSukses(false);
    }

    return (
        <div className="newUser">
            <>
                <Dialog
                    fullScreen={fullScreen}
                    open={sukses}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Success"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            User Has been Successfully Created!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <TextField
                        id="Username"
                        label="Username"
                        variant="standard"
                        type="text"
                        name="username"
                        placeholder="Input Username"
                        onChange={handleChange1}
                        error={Boolean(errors1?.username)}
                        helperText={(errors1?.username)}
                    />
                </div>
                <div className="newUserItem">
                    <TextField
                        id="Password"
                        label="Password"
                        variant="standard"
                        type="text"
                        name="password"
                        placeholder="Input Password"
                        onChange={handleChange2}
                        error={Boolean(errors2?.password)}
                        helperText={(errors2?.password)}
                    />
                </div>
                <div className="newUserItem">
                    <TextField
                        id="Email"
                        label="Email"
                        variant="standard"
                        type="email"
                        name="email"
                        placeholder="Input Email"
                        onChange={handleChange3}
                        error={Boolean(errors3?.email)}
                        helperText={(errors3?.email)}
                    />
                </div>
                <div className="newUserItem">
                    <TextField
                        id="Phone"
                        label="Phone"
                        variant="standard"
                        type="text"
                        name="phone"
                        placeholder="Input Phone"
                        onChange={handleChange4}
                        error={Boolean(errors4?.phone)}
                        helperText={(errors4?.phone)}
                    />
                </div>
                <div className="newUserItem">
                    <TextField
                        id="Address"
                        label="Address"
                        variant="standard"
                        type="text"
                        name="address"
                        placeholder="Input Address"
                        onChange={handleChange5}
                        error={Boolean(errors5?.address)}
                        helperText={(errors5?.address)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className="newUserItem">
                    <label>Admin</label>
                    <select className="newUserSelect" name="isAdmin" id="active" ref={adminRef}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <button className="newUserButton" onClick={handleClick}>Create</button>
            </form>
        </div>
    );
}
