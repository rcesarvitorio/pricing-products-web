import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
const ItemType = "ITEM";

const Item = ({ item, moveItemToLeft }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: item.id, name: item.name, unit: item.unit },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: isDragging ? "#ddd" : "#fff",
        border: "1px solid #ccc",
        cursor: "move",
      }}
    >
      {item.name} ({item.unit})
    </div>
  );
};

const DroppedItem = ({ item, onRemove, onChange }) => {
  return (
    <div
      style={{
        position: "relative",
        padding: "8px",
        margin: "4px",
        backgroundColor: "#e6ffe6",
        border: "1px solid #ccc",
      }}
    >
      <button
        onClick={() => onRemove(item.id)}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          background: "transparent",
          border: "none",
          color: "#ff3333",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ×
      </button>

      <div><strong>Nome:</strong> {item.name}</div>
      <div><strong>Medida:</strong> {item.unit}</div>
      <div>
        <strong>Quantidade:</strong>
        <input
          type="number"
          min="0"
          step="1"
          value={item.quantity || ""}
          onChange={(e) => onChange(item.id, e.target.value)}
          placeholder="Preencha a quantidade..."
          style={{ marginTop: "4px", width: "100%" }}
        />
      </div>
    </div>
  );
};

const DragAndDropBoard = ({ ingredients, onDroppedItemsChange }) => {
  const [items, setItems] = useState(ingredients);
  const [droppedItems, setDroppedItems] = useState([]);

  useEffect(() => {
    setItems(ingredients);
  }, [ingredients]);

  useEffect(() => {
    if (onDroppedItemsChange) {
      onDroppedItemsChange(droppedItems);
    }
  }, [droppedItems, onDroppedItemsChange]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (draggedItem) => handleDrop(draggedItem),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleQuantityChange = (id, value) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const handleDrop = (item) => {
    setDroppedItems((prev) => [...prev, { ...item, quantity: "" }]);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveDroppedItem = (id) => {
    const removedItem = droppedItems.find((item) => item.id === id);
    if (!removedItem) return;

    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
    setItems((prev) => [...prev, { id: removedItem.id, name: removedItem.name, unit: removedItem.unit }]);
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div
        ref={drop}
        style={{
          flex: 1,
          minHeight: "300px",
          padding: "10px",
          backgroundColor: isOver ? "#f0fff0" : "#f9f9f9",
          border: "2px dashed #ccc",
        }}
      >
        <h3>Receita</h3>
        {droppedItems.map((item) => (
          <DroppedItem
            key={item.id}
            item={item}
            onRemove={handleRemoveDroppedItem}
            onChange={handleQuantityChange}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "300px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          border: "2px solid #ccc",
        }}
      >
        <h3>Ingredientes</h3>
        {items.map((item) => (
          <Item key={item.id} item={item} moveItemToLeft={handleDrop} />
        ))}
      </div>
    </div>
  );
};

export default DragAndDropBoard;
