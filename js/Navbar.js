function Nav(props) {
    return (
        <>
            <header className={`topbar ${props.headerClassName}`}>
                <h1 className="logo">
                    <a href="./index.html"><img src={props.logoImg} alt="小農好忙Logo" /></a>
                </h1>
                <nav className="nav-content">
                    {/* 按鈕區 */}
                    <ul className={`nav-links ${props.textColor}`}>
                        <li><a href="./philanthropy.html">公益理念</a></li>
                        <li><a href="./cooperation.html">關於小農</a></li>
                        <li><a href="./customized.html">客製果乾</a></li>
                        <li><a href="./activity.html">GO 遊趣</a></li>
                    </ul>

                    {/* 小農商城 */}
                    <ul>
                        <h2 className="shopping-btn">
                            <a href="./shopping.html" className="shopping-txt">
                                <img src="./images/shared/bambooHat.png" alt="進入小農商城" />
                                <div>
                                    <div>小農</div>
                                    <div className="shopping-txt">商城</div>
                                </div>

                            </a>
                        </h2>
                    </ul>
                </nav>
            </header>
        </>
    )
}