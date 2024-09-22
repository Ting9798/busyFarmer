const { useState, useEffect, useRef } = React;
function FilterButton(props) {
    const { onFilterClick } = props;
    const [filterOptions] = useState({
        區域: [
            { id: '北部', name: '北部' },
            { id: '中部', name: '中部' },
            { id: '南部', name: '南部' },
            { id: '東部', name: '東部' },
            { id: '外島', name: '外島' }
        ],
        水果: [
            { id: '香蕉', name: '香蕉' },
            { id: '水梨', name: '水梨' },
            { id: '荔枝', name: '荔枝' },
            { id: '芭樂', name: '芭樂' },
            { id: '蘋果', name: '蘋果' },
            { id: '柑橘', name: '柑橘' },
            { id: '西瓜', name: '西瓜' },
            { id: '檸檬', name: '檸檬' },
            { id: '芒果', name: '芒果' },
            { id: '鳳梨', name: '鳳梨' },
            { id: '香瓜', name: '香瓜' },
            { id: '葡萄', name: '葡萄' },
            { id: '楊桃', name: '楊桃' },
            { id: '火龍果', name: '火龍果' },
            { id: '釋迦', name: '釋迦' },
            { id: '龍眼', name: '龍眼' },
        ],
        商品: [
            { id: '果乾', name: '果乾' },
            { id: '果醬', name: '果醬' },
            { id: '果醋', name: '果醋' },
            { id: '果酒', name: '果酒' },
        ],
        其他: [
            { id: '觀光', name: '觀光' },
            { id: '市集', name: '市集' },
        ]
    });
    const [activeId, setActiveId] = useState(null);
    const handleButtonClick = (id) => {
        if (onFilterClick) {
            onFilterClick(id);
        }
        setActiveId(id);
    };

    const renderButtons = (items) => {
        return items.map((item) => (
            <button
                key={item.id}
                id={item.id}
                className={`filter-buttons ${activeId === item.id ? 'active' : ''}`}
                onClick={() => handleButtonClick(item.id)}
            >
                {item.name}
            </button>
        ));
    };
    return (
        <div className="filter-buttons-container" id="filter-buttons-container">
            <div className="filter-button-item">
                {/*按鈕*/}
                <div>
                    {Object.keys(filterOptions).map((category) => (
                        <div key={category}>
                            <h3 className="filter-button-title">{category}</h3>
                            <div >{renderButtons(filterOptions[category])}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

<script src="https://code.jquery.com/jquery-3.7.1.js"
    integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
