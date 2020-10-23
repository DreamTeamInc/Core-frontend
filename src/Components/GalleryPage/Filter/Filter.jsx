import React from "react";
import classes from "./Filter.module.css";


class Filter extends React.Component {
  state = {
    contentVisible: false,
    displayChild: null
  };

  onFilterClick = () => {
    this.setState({
      contentVisible: !this.state.contentVisible,
    });
  };

  _renderChildren = (nodes) => {
        const result = nodes.map(el => {
          return (<li key={el.id} className={classes.Children}> {el.name} </li>)
        });
    
        return (
          <ul>
            {result}
          </ul>
        )
      };
    
      expandParent = (id) => {
        this.setState({
          displayChild: id
        });
      };
  

  render() {
    return (
      <div className={classes.Filter}>
        <div className={classes.Filter__Button} onClick={this.onFilterClick}>
          {this.props.children}
        </div>

        <div
          className={classes.Filter__Content}
          style={this.state.contentVisible ? { display: "block" } : null}
        >
          <ul>
            {this.props.show_menu.map(item=> (
                <li key={item.id} onClick={() => this.expandParent(item.id)}>
                  {item.name}
                  {item.id === this.state.displayChild && item.nodes && this._renderChildren(item.nodes)}
          
                </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

}

export default Filter;
