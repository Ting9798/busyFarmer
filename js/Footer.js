function Footer() {
    return (
        <>
            <footer>
                <div id="footer1">
                    <div id="footer-content">
                        <div className="footer-content-box">
                            <div className="footer-contact">
                                <div className="footer-contact-box">
                                    <div className="media">
                                        <a href="#"><img src="./images/shared/line.svg" alt="連接到line官方" /></a>
                                        <a href="#"><img src="./images/shared/facebook.svg" alt="連接到facebook官方" /></a>
                                        <a href="#"><img src="./images/shared/instagram.svg" alt="連接到instagram官方" /></a>
                                    </div>

                                    <address className="information">
                                        <div>地址：台北市中正區農村路123號</div>
                                        <div>電話：+886-2-1234-5678</div>
                                        <div>電子郵件：info@farmersbusy.com</div>
                                        <div>傳真：+886-2-1234-5679</div>
                                    </address>
                                </div>
                                <div className="company"><img src="./images/shared/company-right.svg" alt="小農logo" /></div>
                            </div>
                            <div className="footer-map">
                                <a href="./index.html">首頁</a>
                                <a href="./philanthropy.html">公益理念</a>
                                <a href="./cooperation.html">關於小農</a>
                                <a href="./shopping.html">小農商城</a>
                                <a href="./customized.html">客製果乾</a>
                                <a href="#">GO遊趣</a>
                            </div>
                            <div className="copyright">©小農好忙有限公司</div>
                        </div>
                    </div>
                    <div className="footerBg">
                        <img className="footer-pre" src="./images/shared/footer-pre.png" alt="footer" />
                        <img className="footer-back" src="./images/shared/footer-back.png" alt="footer" />
                    </div>
                </div>
                <div id="footer2">
                    <div className="copyright">
                        <div>©小農好忙有限公司</div>
                        <div className="media">
                            <a href="#"><img src="../images/shared/line.svg" alt="連接到line官方" /></a>
                            <a href="#"><img src="../images/shared/facebook.svg" alt="連接到facebook官方" /></a>
                            <a href="#"><img src="../images/shared/instagram.svg" alt="連接到instagram官方" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}