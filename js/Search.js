const { useState, useEffect } = React;
function SearchItem(props) {
    return (
        <>
            <div className="search-suggestion-item">
               
                <a href="./planting.html">{props.searchTitle}</a>
            </div>
        </>
    )
}
function Search() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    // 顯示建議框
    const onInput = () => {
        setIsSearchVisible(true);
    };

    // 隱藏建議框
    const outInput = (e) => {
        if (!e.target.closest('.productList-search')) {
            setIsSearchVisible(false);
        }
    };

    // 設置和清除全局的點擊事件監聽器
    useEffect(() => {
        document.addEventListener('click', outInput);
        return () => {
            document.removeEventListener('click', outInput);
        };
    }, []);

    return (
        <>
            <div className="productList-search">
                <form>
                    <input
                        type="text"
                        name="query"
                        className="productList-search-input"
                        id="productList-search-input"
                        placeholder="找果乾、小農、農場"
                        onFocus={onInput}
                    />
                    <div className={`search-suggestions ${isSearchVisible ? '' : 'hidden'}`}>
                        <SearchItem searchTitle="張美阿姨" />
                        <SearchItem searchTitle="橘子醬" />
                        <SearchItem searchTitle="橘子果乾" />
                        <SearchItem searchTitle="台北農場" />
                    </div>
                    <button type="submit" className="search-button">
                        <img src="./images/shopping/Search.svg" alt="點擊搜尋" />
                    </button>
                </form>
            </div>
        </>
    )
}
