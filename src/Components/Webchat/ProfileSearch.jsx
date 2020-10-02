import React from "react";
import "./ProfileSearch.css";
import { MdSearch } from "react-icons/md";

class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      conversation: []
    };
  }

  handleChange = e => {
    var searchString = e.target.value.trim().toLowerCase();
    if (searchString.length > 0) {
      // conversation = conversation.filter;
    }

    console.log("searchString", searchString);
  };
  render() {
    return (
      <div className="web_conversation-search">
        <div className="web_profile-search-icon">
          <MdSearch className="web_search-icon" />
        </div>
        <input
          type="search"
          className="web_conversation-search-input"
          placeholder="Search"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default ProfileSearch;
