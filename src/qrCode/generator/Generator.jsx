import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value) { toast.warn("Enter text or a URL first."); return; }
    try {
      setIsLoading(true);
      const image = await QRCode.toDataURL(value, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 300,
      });
      setQrCodeImage(image);
    } catch (error) {
      toast.error(error.message || "Unable to generate the QR code.");
    } finally { setIsLoading(false); }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setQrCodeImage(null);
  };

  const downloadFile = () => {
    if (!qrCodeImage) return;
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return <div className={styles.container}>
    <h2 id="generator-title" className={styles.title}>QR Code Generator</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField value={inputValue} onChange={handleInputChange} disabled={isLoading} label="Text or URL" placeholder="https://example.com" fullWidth className={styles.inputValue} />
      <Button type="submit" variant="contained" className={styles.generateButton} disabled={isLoading || !inputValue.trim()}>{isLoading ? <CircularProgress size={22} color="inherit" /> : "Generate"}</Button>
    </form>
    <div className={styles.qrCodeImageContainer}>{qrCodeImage ? <img className={styles.qrCodeImage} src={qrCodeImage} alt="Generated QR code" /> : <span className={styles.emptyState}>Your QR code will appear here</span>}</div>
    <Button variant="outlined" className={styles.downloadButton} disabled={!qrCodeImage} onClick={downloadFile}><FaDownload /> Download QR code</Button>
  </div>;
};
export default Generator;
