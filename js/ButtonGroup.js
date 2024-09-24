function ButtonGroup(props) {
    const {
        preBtnSrc,
        preBtnClass,
        nextBtnSrc,
        nextBtnClass,
        btnPosition,
        nextbtnName,
        preBtnName,
        onClick,
        cart,
        shouldCheckCart = false,
    } = props;

    const handleClick = (e) => {
        if (shouldCheckCart && cart.length === 0) {
            e.preventDefault(); // 阻止下一頁
            alert('請添加物品進入購物車！');
        } else if (onClick) {
            onClick(e);
        }
    };

    return (
        <div className={`button-group ${btnPosition || ''}`} onClick={handleClick}>
            <div className={`button-group-box ${btnPosition || ''}`}>
                {preBtnClass && (
                    <a href={preBtnSrc || ''} className={`button ${preBtnClass || ''}`}>{preBtnName || ''}</a>
                )}
                <a href={nextBtnSrc || ''} className={`button ${nextBtnClass || ''}`}>{nextbtnName}</a>
            </div>
        </div>
    );
}
