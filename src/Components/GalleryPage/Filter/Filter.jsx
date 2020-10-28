import React from "react";
import classes from "./Filter.module.css";

class Filter extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        contentVisible: false,
      });
    }
  }

  state = {
    contentVisible: false,
    displayChild: null,
    titleName: this.props.name,
  };

  onFilterClick = () => {
    this.setState({
      contentVisible: !this.state.contentVisible,
    });
  };

  _renderChildren = (nodes, name) => {
    const result = nodes.map((el) => {
      return (
        <li
          key={el.id}
          className={classes.Children}
          onClick={() => {
            this.props.onFieldClick(name);
            this.props.onWellClick(el.name);
            this.setState({
              contentVisible: false,
            });
          }}
        >
          {el.name}
        </li>
      );
    });

    return <ul>{result}</ul>;
  };

  expandParent = (id) => {
    this.setState({
      displayChild: id,
    });
  };

  render() {
    return (
      <div
        className={classes.Filter}
        style={this.props.style}
        ref={this.setWrapperRef}
      >
        <div className={classes.Filter__Button} onClick={this.onFilterClick}>
          {this.props.type === "fixed" ? "Фильтр" : this.state.titleName}
        </div>

        <div
          className={classes.Filter__Content}
          style={this.state.contentVisible ? { display: "block" } : null}
        >
          <ul>
            {this.props.show_menu.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  this.expandParent(item.id);
                  this.setState({ titleName: item.name });
                }}
              >
                {item.name}
                {item.id === this.state.displayChild &&
                  item.nodes &&
                  this._renderChildren(item.nodes, item.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Filter;
