import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import QrScanner from "qr-scanner";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ImageScanner = () => {
    const qrTextRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [qrText, setQrText] = useState("QR Code value");
    const [copyTitle, setCopyTitle] = useState("Copy text");
    const [disableGet, setDisableGet] = useState(true);

    const handleFileChange = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setDisableGet(false);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const getQrCode = async () => {
        try {
            const response = await QrScanner.scanImage(selectedFile);
            setQrText(response);
            qrTextRef.current.value = response;
        } catch (error) {
            console.error(error.message, "get qrcode error");
            toast.warn();
        }
    };

    const copyText = () => {
        navigator.clipboard.writeText(qrText);
        setCopyTitle("Text copied");
        setTimeout(() => { setCopyTitle("Copy text") }, 1000 * 3);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Image scanner</div>

            <div className={styles.main}>
                <Button
                    variant="contained"
                    component="label"
                    className={styles.scanButton}
                    fullWidth
                >
                    Select image file
                    <input
                        type="file"
                        accept=".png, jpg, .jpeg"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <div className={styles.qrCodeImageContainer}>
                    {selectedFile && <img className={styles.qrCodeImage} src={preview} alt="" />}
                </div>

                <div className={styles.detailsContainer}>
                    <Button
                        variant="contained"
                        onClick={getQrCode}
                        disabled={disableGet}
                    >Get</Button>
                    <TextField
                        ref={qrTextRef}
                        fullWidth
                        label="Scanned value"
                        placeholder="Scanned value"
                        value={qrText}
                    />
                    <Tooltip title={copyTitle} onClick={copyText}>
                        <IconButton>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ImageScanner

