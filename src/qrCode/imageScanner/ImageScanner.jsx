import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import QrScanner from "qr-scanner";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ImageScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [qrText, setQrText] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setQrText("");
  };

  useEffect(() => {
    if (!selectedFile) { setPreview(null); return undefined; }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const getQrCode = async () => {
    if (!selectedFile) return;
    try { setQrText(await QrScanner.scanImage(selectedFile)); toast.success("QR code scanned."); }
    catch (error) { toast.warn(error.message || "No readable QR code was found in this image."); }
  };

  const copyText = async () => {
    if (!qrText) return;
    await navigator.clipboard.writeText(qrText);
    toast.success("Scanned value copied.");
  };

  return <div className={styles.container}>
    <div className={styles.title}>Image Scanner</div>
    <Button variant="contained" component="label" className={styles.scanButton} fullWidth>Select image file<input type="file" accept="image/png, image/jpeg" hidden onChange={handleFileChange} /></Button>
    <div className={styles.qrCodeImageContainer}>{preview ? <img className={styles.qrCodeImage} src={preview} alt="Selected QR code preview" /> : <span className={styles.emptyState}>Selected image preview appears here</span>}</div>
    <div className={styles.detailsContainer}>
      <Button variant="outlined" onClick={getQrCode} disabled={!selectedFile} className={styles.getDetailsButton}>Scan</Button>
      <TextField fullWidth label="Scanned value" placeholder="Scanned value" value={qrText} onChange={(event) => setQrText(event.target.value)} className={styles.inputField} />
      <Tooltip title="Copy text"><span><IconButton aria-label="Copy scanned value" onClick={copyText} disabled={!qrText} className={styles.copyButton}><ContentCopyIcon /></IconButton></span></Tooltip>
    </div>
  </div>;
};
export default ImageScanner;
