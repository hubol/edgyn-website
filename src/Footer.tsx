import React from "react";
import './Footer.css';
import {Button, Icon} from "antd";

function getYearsActiveText(): string
{
    let currentYear = new Date().getFullYear();
    if (currentYear === 2019)
        return "2019";
    
    return `2019-${currentYear}`;
}

const Footer: React.FC = () => 
<>
    <footer className="Footer">
        <p className="copyright">© Copyright edgyn Group {getYearsActiveText()}</p>
        <div className="red" />
        <div className="yellow" />
        <div className="blue" />
        <div className="social-media">
        <Button href="https://twitter.com/EdgynGroup" shape={"circle"} type={"primary"}>
            <Icon type="twitter" />
        </Button>
        </div>
    </footer>
</>;

export default Footer;