import React from "react";
import './Footer.css';

function getYearsActiveText(): string
{
    let currentYear = new Date().getFullYear();
    if (currentYear === 2019)
        return "2019";
    
    return `2019-${currentYear}`;
}

const Footer: React.FC = () => 
<>
    <footer className={"Footer"}>
        <p>© Copyright edgyn Group {getYearsActiveText()}</p>
    </footer>
</>;

export default Footer;