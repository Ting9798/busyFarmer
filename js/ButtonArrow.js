function ButtonArrow(props) {
    // 設置 CSS 變數
    const arrowStyle = {
        '--arrow-color': props.arrowColor,
    };
    return (
        <>
            <a href={props.arrowHref} className="buttonArrow-box" style={arrowStyle}>
                <div className={`buttonArrow ${props.textColor}`}>
                    <div className="buttonArrow-text">{props.btnName}</div>
                    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L12 12.1818L2 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
            </a>
        </>
    )
}
