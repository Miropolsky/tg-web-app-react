import React from "react";
import type { Product } from "../../types/product";
import Button from "../Button/Button";
import "./ProductItem.css";

interface ProductItemProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  quantity,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(product.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(product.id, newQuantity);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("ru-RU");
  };

  return (
    <div
      className={`product-item ${
        !product.inStock ? "product-item--out-of-stock" : ""
      }`}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="product-out-of-stock">
            <span>Нет в наличии</span>
          </div>
        )}
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-category">{product.category}</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">
            <span className="price-value">{formatPrice(product.price)} ₽</span>
          </div>

          <div className="product-actions">
            {quantity > 0 ? (
              <div className="quantity-controls">
                <Button
                  className="quantity-btn quantity-btn--decrease"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  title="Уменьшить количество"
                >
                  −
                </Button>
                <span className="quantity-value">{quantity}</span>
                <Button
                  className="quantity-btn quantity-btn--increase"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  title="Увеличить количество"
                >
                  +
                </Button>
                <Button
                  className="quantity-btn quantity-btn--remove"
                  onClick={handleRemoveFromCart}
                  title="Удалить из корзины"
                >
                  🗑️
                </Button>
              </div>
            ) : (
              <Button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                title={
                  product.inStock ? "Добавить в корзину" : "Товар недоступен"
                }
              >
                {product.inStock ? "В корзину" : "Нет в наличии"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
