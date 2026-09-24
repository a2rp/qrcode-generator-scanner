import React from "react";
import styles from "./styles.module.scss";
import Generator from "./generator";
import ImageScanner from "./imageScanner";

const QrCode = () => <section className={styles.container} aria-labelledby="page-title">
  <div className={styles.intro}><span className={styles.eyebrow}>BROWSER UTILITY</span><h1 id="page-title">QR Code Studio</h1><p>Generate a QR code from text or a URL, or scan one from an image in seconds.</p></div>
  <div className={styles.generatorScannerContainer}><section className={styles.panel} aria-labelledby="generator-title"><Generator /></section><section className={styles.panel} aria-labelledby="scanner-title"><ImageScanner /></section></div>
</section>;
export default QrCode;
