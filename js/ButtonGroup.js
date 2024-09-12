function ButtonGroup(props) {
    const {
        preBtnSrc,
        preBtnClass,
        nextBtnSrc,
        nextBtnClass,
        btnPosition,
        nextbtnName,
        preBtnName,
        onClick
    } = props;
    return (
        <div className={`button-group ${btnPosition || ''}`} onClick={onClick || ''}>
            <div className={`button-group-box ${btnPosition || ''}`}>
                {preBtnClass &&
                    (<a href={preBtnSrc || ''} className={`button ${preBtnClass || ''}`}>{preBtnName || ''}</a>)
                }
                <a href={nextBtnSrc || ''} className={`button ${nextBtnClass || ''}`}>{nextbtnName}</a>
            </div>
        </div>
    )
}