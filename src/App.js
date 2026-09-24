import React, { useEffect, useState } from "react";
import { FiArrowUp, FiCoffee, FiExternalLink, FiGithub, FiHeart, FiLinkedin, FiMail, FiMap, FiStar, FiYoutube } from "react-icons/fi";
import QrCode from "./qrCode/QrCode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const links = [
  ["Portfolio", "https://www.ashishranjan.net/", FiMap],
  ["GitHub", "https://github.com/a2rp", FiGithub],
  ["CodePen", "https://codepen.io/ash1198", FiExternalLink],
  ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin],
  ["Facebook", "https://www.facebook.com/theash.ashish/", FiHeart],
  ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiYoutube],
  ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
  ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
  ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
  ["Patreon", "https://patreon.com/a2rp", FiStar],
];

const App = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="appShell" id="top">
    <header className="siteHeader"><div className="headerContent">
      <a className="brand" href="#top"><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" /><span><small>UTILITY</small><strong>QR Code Studio</strong></span></a>
      <a className="headerLink" href="https://github.com/a2rp/qrcode-generator-scanner" target="_blank" rel="noopener noreferrer"><FiGithub /> Source</a>
    </div></header>
    <main className="pageContent"><QrCode /></main>
    <footer className="siteFooter">
      <p>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
      <div className="footerLinks">{links.map(([label, href, Icon]) => <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"><Icon /></a>)}</div>
    </footer>
    {showTop && <button className="scrollTop" type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiArrowUp /></button>}
    <ToastContainer position="bottom-right" autoClose={2800} />
  </div>;
};
export default App;
