import Header from "../../Compoments/Header"
import './index.css'

export default function IntroPage(){
    return (
        <div className="intro-container">
            <Header></Header>
            <main>
                {/* <img width={'100px'} height={"100px"} src="../../../public/images/qrcode.png" alt="QRcode"/>
                 */}
                 <div className="site-qrcode"></div>
                <h3>本站網址:</h3>
                <a href="https://charis321.github.io/yinyang-react" target="_blank"  rel="noreferrer noopener">
                https://charis321.github.io/yinyang-react/</a>
                <span className="loading-icon"></span>
                kjdsalfjdaskjfkjl
            </main>
        </div>
    )
}