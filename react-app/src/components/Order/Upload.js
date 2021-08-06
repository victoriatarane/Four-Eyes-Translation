import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const UploadFile = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [file, setFile] = useState(null);
    const [document_url, setDocumentUrl] = useState('hhhh');
    const [fileLoading, setFileLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setFileLoading(true);

        const res = await fetch('/api/documents', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setFileLoading(true);
            history.push("/documents");
        }
        else {
            setFileLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setDocumentUrl(file)
        console.log(file)
    }

    return (
        <div>
            <input
                type="file"
                accept="file/*"
                onChange={updateFile}
                // value={document_url}
            />
            {(fileLoading) && <p>Loading...</p>}
        </div>
    )
}

export default UploadFile;