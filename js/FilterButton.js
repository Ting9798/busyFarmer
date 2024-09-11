const { useState, useEffect, useRef } = React;
function FilterButton(props) {

    const { filtertitle } = props;
    const [filterOptions] = useState({
        區域: [
            { id: 'north', name: '北部' },
            { id: 'central', name: '中部' },
            { id: 'south', name: '南部' },
            { id: 'east', name: '東部' },
            { id: 'outerIslands', name: '外島' }
        ],
        水果: [
            { id: 'banana', name: '香蕉' },
            { id: 'guava', name: '芭樂' },
            { id: 'apple', name: '蘋果' },
            { id: 'citrus', name: '柑橘' },
            { id: 'avocado', name: '酪梨' },
            { id: 'grapefruit', name: '柚子' },
            { id: 'watermelon', name: '西瓜' },
            { id: 'lemon', name: '檸檬' },
            { id: 'mango', name: '芒果' },
            { id: 'pineapple', name: '鳳梨' },
            { id: 'kiwi', name: '奇異果' },
            { id: 'passionFruit', name: '百香果' },
            { id: 'dragonFruit', name: '火龍果' },
            { id: 'longan', name: '龍眼' },
        ],
        商品: [
            { id: 'driedFruits', name: '果乾' },
            { id: 'marmalade', name: '果醬' },
            { id: 'fruitVinegar', name: '果醋' },
            { id: 'wine', name: '果酒' },
        ],
        其他: [
            { id: 'sightsee', name: '觀光' },
            { id: 'fair', name: '市集' },
        ]
    });

    const handleButtonClick = (id) => {
        console.log(`Button with id ${id} clicked`);
    };

    const renderButtons = (items) => {
        return items.map((item) => (
            <button
                key={item.id}
                id={item.id}
                className="filter-buttons"
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
