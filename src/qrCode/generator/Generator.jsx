import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Generator = () => {
    const qrCodeImageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [downloadDisabled, setDownloadDisabled] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(inputValue, "inputValue");
        if (inputValue.trimEnd().length === 0) {
            return toast.warn("Input value is empty");
        }

        try {
            setIsLoading(true);
            const qrImageURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${inputValue}`;
            setQrCodeImage(qrImageURL);
            setDownloadDisabled(false);
            // setInputValue("");
        } catch (error) {
            console.error(error, "generate error");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = async () => {
        try {
            const options = {
                method: "GET",
                url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${inputValue}`,
                responseType: "blob"
            };
            const response = await axios(options);
            const file = response.data;
            const tempFile = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = tempFile;
            a.download = "qrCode.png";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.log(error, "dowm;load error");
            toast.warn(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>QR Code Generator</div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    label="Enter text here"
                    placeholder="Enter text here"
                    fullWidth
                    className={styles.inputValue}
                />
                <Button
                    type="submit"
                    variant="contained"
                    className={styles.generateButton}
                    disabled={isLoading || inputValue.trim().length === 0}
                >{isLoading ? <CircularProgress sx={{ padding: "10px" }} /> : "Generate"}</Button>
            </form>

            <div className={styles.qrCodeImageContainer}>
                <img className={styles.qrCodeImage} ref={qrCodeImageRef} src={qrCodeImage} alt="" />
            </div>

            <div className={styles.downloadQrCode}>
                <Button
                    variant="contained"
                    className={styles.downloadButton}
                    disabled={downloadDisabled}
                    onClick={downloadFile}
                >
                    <FaDownload className={styles.downloadIcon} />
                    <div className={styles.downloadText}>Download</div>
                </Button>
            </div>
        </div>
    )
}

export default Generator

