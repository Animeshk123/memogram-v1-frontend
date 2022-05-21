import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const uploadFile = (file, setProgress, cb) => {
    if (!file) return;
    try {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (progress < 100) {
                setProgress({ file: file, label: `uploading...${progress}%` });
            }
            else {
                setProgress({ file: file, label: `upload completed` });
            }
        }, (err) => {
            cb({ status: false, err: err.message });
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                cb({ status: true, url: url });
            })
        });
    }
    catch (err) {
        cb({ status: false, err: err.message });
    }
}


export default uploadFile;