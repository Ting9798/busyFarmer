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
        isButton = false // 新增屬性
    } = props;

    const handleClick = (e) => {
        if (shouldCheckCart && cart.length === 0) {
            // 如果購物車是空的
            e.preventDefault(); // 阻止下一頁
            alert('請添加物品進入購物車！');
        } else if (onClick) {
            onClick(e);
        }
    };

    const Wrapper = isButton ? 'button' : 'div'; // 根據 isButton 判斷包裝器

    return (
        <di className={`button-group ${btnPosition || ''}`} onClick={handleClick}>
            <Wrapper className={`button-group-box ${btnPosition || ''}`}>
                {preBtnClass &&
                    (<a href={preBtnSrc || ''} className={`button ${preBtnClass || ''}`}>{preBtnName || ''}</a>)
                }
                <a href={nextBtnSrc || ''} className={`button ${nextBtnClass || ''}`}>{nextbtnName}</a>
            </Wrapper>
        </di>
    );
}