import { useMemo, useState } from "react";
import { mockProducts } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { useTelegramOrder } from "../../hooks/useTelegramOrder";
import type { Product } from "../../types/product";
import { ProductItem } from "../ProductItem/ProductItem";
import "./ProductList.css";

export const ProductList = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleOrderSuccess = () => {
    clearCart();
  };

  useTelegramOrder({
    cart,
    onOrderSuccess: handleOrderSuccess,
  });

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(mockProducts.map((product) => product.category))
    );
    return uniqueCategories.sort();
  }, []);

  // Фильтруем продукты
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1 className="product-list-title">🛍️ Каталог товаров</h1>

        {cart.items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-info">
              <span className="cart-items-count">
                🛒 {cart.totalItems}{" "}
                {cart.totalItems === 1
                  ? "товар"
                  : cart.totalItems < 5
                  ? "товара"
                  : "товаров"}
              </span>
              <span className="cart-total-price">
                {cart.totalPrice.toLocaleString()} ₽
              </span>
            </div>
            <button
              className="clear-cart-btn"
              onClick={clearCart}
              title="Очистить корзину"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className="product-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={getItemQuantity(product.id)}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))
        ) : (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="cart-footer">
          <div className="cart-footer-info">
            <span className="cart-footer-text">
              Итого: <strong>{cart.totalItems} товаров</strong> на сумму{" "}
              <strong>{cart.totalPrice.toLocaleString()} ₽</strong>
            </span>
          </div>
          <div className="cart-footer-note">
            <p>📱 Нажмите кнопку "Купить" внизу экрана для оформления заказа</p>
          </div>
        </div>
      )}
    </div>
  );
};
