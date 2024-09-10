const { useState, useEffect, forwardRef, useImperativeHandle } = React;


const FloatCart = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // 讀取 localStorage 中的購物車資料
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(cart);
    }, []);

    // 更新購物車的函數
    const updateCart = (newItems) => {
        setItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    // 從 JSON 文件加载商品
    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetch('../public/item.json');
                const data = await response.json();
                const initialItems = getInitialItems();
                // 更新商品数据
                setItems(data.map(item => {
                    const savedItem = initialItems.find(i => i.id === item.id);
                    return savedItem ? savedItem : item;
                }));
            } catch (error) {
                console.error('Failed to load items:', error);
            }
        };
        loadItems();
    }, []);

    // 更新 localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    // 將值傳送
    useImperativeHandle(ref, () => ({
        addItemToCart: (newItem) => {
            setItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === newItem.id);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                } else {
                    return [...prevItems, newItem];
                }
            });
        }
    }));

    // 購物車收合
    const toggleCart = () => {
        setIsOpen(prevState => !prevState);
    };

    // 增加数量
    const handleIncrement = (itemId) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // 减少数量
    const handleDecrement = (itemId) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    };

    // 删除商品
    const handleDeleteItem = (itemId) => {
        // 從列表中移除商品
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        
        // 更新 localStorage
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    // 計算總金額
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div className={`floating-cart ${isOpen ? 'open' : ''}`}>
                <div className="shoppingDot"><span>{items.length}</span></div>
                <div className="cart-header" onClick={toggleCart} >
                    <figure className="cart-icon">
                        <img src="./images/shared/icon2_cart-w.svg" alt="購物車" />
                    </figure>
                    <span className="cart-title">購物車</span>
                </div>
                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            目前購物車是空的喔！
                        </div>
                    ) : (
                        <>
                            <ul className="cart-items-box">
                                {/* 商品列表 */}
                                {items.map(item => (
                                    <li key={item.id} className="cart-items">
                                        <figure><img src={item.image} alt={item.name} /></figure>
                                        <div className="item-info">
                                            <div className="item-header">
                                                <h2 className="item-name">
                                                    <div>商品 / {item.name}</div>
                                                    <div>{item.nameEg}</div>
                                                </h2>
                                                <button className="delItem" onClick={() => handleDeleteItem(item.id)}>
                                                    <svg width="16" height="16" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_1915_6560)">
                                                            <rect x="8" y="8" width="8" height="8" rx="4" transform="rotate(-180 8 8)" fill="#6C8C42" />
                                                            <path d="M5.75874 2.65465C5.83908 2.57431 5.83908 2.44406 5.75874 2.36372C5.67841 2.28339 5.54816 2.28339 5.46782 2.36372L2.36463 5.46691C2.28429 5.54725 2.28429 5.6775 2.36463 5.75784C2.44497 5.83817 2.57522 5.83817 2.65555 5.75784L5.75874 2.65465Z" fill="#F1F1F1" />
                                                            <path d="M5.46596 5.75777C5.54629 5.8381 5.67655 5.8381 5.75688 5.75777C5.83722 5.67743 5.83722 5.54718 5.75688 5.46684L2.65369 2.36365C2.57336 2.28332 2.44311 2.28332 2.36277 2.36365C2.28243 2.44399 2.28243 2.57424 2.36277 2.65458L5.46596 5.75777Z" fill="#F1F1F1" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1915_6560">
                                                                <rect x="8" y="8" width="8" height="8" rx="4" transform="rotate(-180 8 8)" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="quantity-controls">
                                                <div className="quantity-controls-price">NT.{item.price}</div>
                                                <div className="quantity-controls-buttons">
                                                    <button className="decrement" onClick={() => handleDecrement(item.id)}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="16" height="16" rx="4" fill="#6C8C42" />
                                                            <path d="M12.6577 8.73405C12.9017 8.73405 13.0996 8.53618 13.0996 8.2921C13.0996 8.04802 12.9017 7.85016 12.6577 7.85016L3.22949 7.85016C2.98541 7.85016 2.78755 8.04802 2.78755 8.2921C2.78755 8.53618 2.98541 8.73405 3.22949 8.73405L12.6577 8.73405Z" fill="#F1F1F1" />
                                                        </svg>
                                                    </button>

                                                    <label htmlFor={`quantity-input-${item.id}`}></label>
                                                    <input type="text" className="quantity-input" id={`quantity-input-${item.id}`} value={item.quantity} readOnly />

                                                    <button className="increment" onClick={() => handleIncrement(item.id)}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="16" height="16" rx="4" fill="#6C8C42" />
                                                            <path d="M12.6577 8.73405C12.9017 8.73405 13.0996 8.53618 13.0996 8.2921C13.0996 8.04802 12.9017 7.85016 12.6577 7.85016L3.22949 7.85016C2.98541 7.85016 2.78755 8.04802 2.78755 8.2921C2.78755 8.53618 2.98541 8.73405 3.22949 8.73405L12.6577 8.73405Z" fill="#F1F1F1" />
                                                            <path d="M7.50087 13.0062C7.50087 13.2503 7.69874 13.4481 7.94282 13.4481C8.1869 13.4481 8.38477 13.2503 8.38477 13.0062L8.38477 3.57801C8.38477 3.33393 8.1869 3.13607 7.94282 3.13607C7.69874 3.13607 7.50087 3.33393 7.50087 3.57801L7.50087 13.0062Z" fill="#F1F1F1" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            {item.notes && (
                                                <div className="item-notes">
                                                    <div>備註:</div> {item.notes}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-total">
                                小計 <span id="total-price">NT.{totalPrice}</span>
                            </div>
                            <div className="button-group">
                                <a href="./cart.html" className="button account">結帳</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
});