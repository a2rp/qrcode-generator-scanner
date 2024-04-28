import React, { useState } from "react"
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import Generator from "./generator";
import ImageScanner from "./imageScanner";

const QrCode = () => {

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>QR Code</div>

                <div className={styles.generatorScannerContainer}>
                    <Generator />
                    <ImageScanner />
                </div>
            </div>
        </div>
    )
}

export default QrCode

