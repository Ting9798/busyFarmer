<script type="text/babel" src="./js/ButtonGroup.js"></script>
const { useState, useEffect, forwardRef, useImperativeHandle } = React;

const FloatCart = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([
        {
            id: 'unique-item-id',
            src: '商品圖片URL',
            title: '商品標題',
            name: '商品名稱',
            egName: '商品英文名稱',
            price: 100,
            discountPrice: 80,
            quantity: 1,
            notes: '備註信息'
        }
    ]);

    // 切換購物車顯示狀態
    const toggleCart = () => {
        setIsOpen(prevState => !prevState);
    };

    // 讀取本地存儲中的購物車資料
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // 更新購物車的函數，並同步更新本地存儲
    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // 處理從 Option 組件添加商品到購物車
    const handleAddToCart = (newItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === newItem.id);
            const updatedCart = existingItem
                ? prevCart.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
                : [...prevCart, newItem];
            updateCart(updatedCart);
            return updatedCart;
        });
    };

    // 將值傳送
    useImperativeHandle(ref, () => ({
        addItemToCart: handleAddToCart
    }));

    // 增加數量
    const handleIncrement = (itemId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
            updateCart(updatedCart);
            return updatedCart;
        });
    };

    // 減少數量
    const handleDecrement = (itemId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            );
            updateCart(updatedCart);
            return updatedCart;
        });
    };

    // 刪除商品
    const handleDeleteItem = (itemId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== itemId);
            updateCart(updatedCart);
            return updatedCart;
        });
    };

    // 計算總金額
    const totalPrice = cart.reduce((total, item) => {
        const priceToUse = item.discountPrice || item.price;
        return total + priceToUse * item.quantity;
    }, 0);

    return (
        <div className={`floating-cart ${isOpen ? 'open' : ''}`}>
            <div className="shoppingDot"><span>{cart.length}</span></div>
            <div className="cart-header" onClick={toggleCart} >
                <figure className="cart-icon">
                    <img src="./images/shared/icon2_cart-w.svg" alt="購物車" />
                </figure>
                <span className="cart-title">購物車</span>
            </div>
            <div className="cart-content">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        目前購物車是空的喔！
                    </div>
                ) : (
                    <>
                        <ul className="cart-items-box">
                            {/* 商品列表 */}
                            {cart.map(item => (
                                <li key={item.id} className="cart-items">
                                    <figure><img src={item.src} alt={item.name} /></figure>
                                    <div className="item-info">
                                        <div className="item-header">
                                            <h2 className="item-name">
                                                <div>商品 / {item.name}</div>
                                                <div>{item.egName}</div>
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
                                            <div className="quantity-controls-price">{item.discountPrice ? `NT.${item.discountPrice}` : `NT.${item.price}`}</div>
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
                                                <div>備註: {item.notes}</div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            小計 <span id="total-price">NT.{totalPrice}</span>
                        </div>
                        <ButtonGroup
                            nextBtnClass="account"
                            nextBtnSrc="./cart.html"
                            nextbtnName="結帳"
                        />
                    </>
                )}
            </div>
        </div>
    );
});