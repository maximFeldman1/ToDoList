import "./App.css";
import React, { Component } from "react";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
  }

  handleInput = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  };
  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  };

  deleteItem = (key) => {
    const filterItems = this.state.items.filter((item) => {
      return item.key !== key;
    });
    this.setState({
      items: filterItems,
    });
  };

  setUpdate = (text, key) => {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });

    this.setState({
      items: items,
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <ListItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        ></ListItems>
      </div>
    );
  }
}
