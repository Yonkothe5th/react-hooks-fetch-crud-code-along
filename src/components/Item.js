import React from "react";

function Item({ item, onUpdateItem , onDeletedItem}) {

  function handleDeleteClick() {
    // Call onDeleteItem, passing the deleted item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeletedItem(item));
  }

    function hanldeAddToCArt(){
      fetch(`http://localhost:4000/items/${item.id}`,{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          isInCart:!item.isInCart,
        }),
      })
      .then ((resp)=>resp.json())
      .then ((updatedItem)=>onUpdateItem(updatedItem))
      console.log("clicked item:", item);
    }

    
    

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={hanldeAddToCArt}
        >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
