import uploadFile from '../config/Upload';


const onClickFileUpload = (fileState, setFileState, setError, setLoader, cb) => {
    if (fileState.file == null) {
        setError("please Select A file", { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
        return;
    }
    setLoader(20);
    uploadFile(fileState.file, setFileState, setLoader,(response) => {
        if (response.status) {
            setFileState({ file: null, label: "Upload Profile Photo" });
            cb(response.url);
        }
        else {
            setError(response.message, { appearance: "error", autoDismautoDismissTimeout: 4000 });
        }
    })
}

const showLoader = (setLoader) => {
    let couter = 10;
    let interval = setInterval(() => {
        setLoader(couter);
        if (couter < 100) {
            couter += 10;
        }
        else {
            couter = 10;
            clearInterval(interval);
        }

    }, 100);
}



export { onClickFileUpload, showLoader };
