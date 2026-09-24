import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) { toast.warn("Enter text or a URL first."); return; }
    try {
      setIsLoading(true);
      setQrCodeImage(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(inputValue.trim())}`);
    } catch (error) {
      toast.error(error.message || "Unable to generate the QR code.");
    } finally { setIsLoading(false); }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(inputValue.trim())}`, { responseType: "blob" });
      const fileUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = fileUrl; link.download = "qr-code.png"; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(fileUrl);
    } catch (error) { toast.warn(error.message || "Unable to download the QR code."); }
  };

  return <div className={styles.container}>
    <div className={styles.title}>QR Code Generator</div>
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField value={inputValue} onChange={(event) => setInputValue(event.target.value)} label="Text or URL" placeholder="https://example.com" fullWidth className={styles.inputValue} />
      <Button type="submit" variant="contained" className={styles.generateButton} disabled={isLoading || !inputValue.trim()}>{isLoading ? <CircularProgress size={22} color="inherit" /> : "Generate"}</Button>
    </form>
    <div className={styles.qrCodeImageContainer}>{qrCodeImage ? <img className={styles.qrCodeImage} src={qrCodeImage} alt="Generated QR code" /> : <span className={styles.emptyState}>Your QR code will appear here</span>}</div>
    <Button variant="outlined" className={styles.downloadButton} disabled={!qrCodeImage} onClick={downloadFile}><FaDownload /> Download QR code</Button>
  </div>;
};
export default Generator;
