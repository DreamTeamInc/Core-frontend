import React from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import { getLocations } from "../../../Reducers/locationReducer";
import { getWellsInLocation } from "../../../Reducers/locationReducer";

class Filter extends React.Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        contentVisible: false,
      });
    }
  };

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

  _renderChildren = (name, index) => {
    const result = this.props.wells[index].map((el) => {
      return (
        <li
          key={el}
          className={classes.Children}
          onClick={() => {
            this.props.onFieldClick(name);
            this.props.onWellClick(el);
            this.setState({
              contentVisible: false,
            });
          }}
        >
          {el}
        </li>
      );
    });

    return <ul>{result}</ul>;
  };

  expandParent = (item) => {
    this.setState({
      displayChild: item,
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
          {this.props.type === "fixed" ? "Локация" : this.state.titleName}
        </div>

        <div
          className={classes.Filter__Content}
          style={this.state.contentVisible ? { display: "block" } : null}
        >
          <ul>
            {this.props.type === "fixed"
              ? this.props.locations.map((item, index) => (
                  <li
                    key={item}
                    onClick={() => {
                      this.expandParent(item);
                      this.setState({ titleName: item });
                    }}
                  >
                    {item}
                    {item === this.state.displayChild &&
                      this._renderChildren(item, index)}
                  </li>
                ))
              : this.props.show_menu.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      if (item.id === this.props.idAll) {
                        this.props.onFilterClick("");
                        this.setState({ titleName: this.props.name });
                      } else {
                        this.props.onFilterClick(item.name);
                        this.setState({ titleName: item.name });
                      }
                    }}
                  >
                    {item.name}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  locations: state.location.locations,
  well: state.location.well,
});

export default connect(mapStateToProps, { getLocations, getWellsInLocation })(
  Filter
);

