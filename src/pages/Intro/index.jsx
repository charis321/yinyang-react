import Header from "../../Compoments/Header"
import './index.css'

export default function IntroPage(){
    return (
        <div className="intro-container">
            <Header></Header>
            <main>
                {/* <img width={'100px'} height={"100px"} src="../../../public/images/qrcode.png" alt="QRcode"/>
                 */}
                 <div className="link-container">
                   
                    <div className="site-qrcode">
                    </div>
                    <div className="site-link">
                        <h3>本站網址: </h3>
                         <a href="https://charis321.github.io/yinyang-react" 
                            target="_blank"  
                            rel="noreferrer noopener"> 
                            https://charis321.github.io/yinyang-react/</a>  
                    </div>
                   
                 </div>       
            </main>
            <footer className="flex-col">
                <p>===本站可以在手機、電腦、平板上遊覽===</p>
                <p>===可以直接下載成app===</p>
                <p>===登入功能暫不開放===</p>
                <h1>===持續更新中===</h1>
                <p>Copyright © 2025 charis321.</p>
            </footer>
        </div>
    )
}