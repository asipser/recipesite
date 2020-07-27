import React, { useState, useEffect } from "react";
import { BrowserView } from "react-device-detect";

import { get } from "../../utilities";
import "./FilterRecipes.css";

const FilterRecipes = ({ fillerText, setFillerText, toggleTags, selectedTags }) => {
  const [groupTags, setGroupTags] = useState([]);

  useEffect(() => {
    get("/api/tags").then((allTags) => {
      setGroupTags(allTags);
    });
  }, []);

  const filterGroups = groupTags.map((group) => {
    return (
      <FilterGroup
        key={`FilterGroup-${group.name}`}
        title={group.name}
        tags={group.tags}
        selectedTags={selectedTags}
        toggleTags={toggleTags}
      />
    );
  });

  return (
    <>
      <input
        value={fillerText}
        onChange={(e) => setFillerText(e.target.value)}
        placeholder="Search Name"
        className="FilterRecipes-Input"
      />
      <BrowserView>
        <div className="FilterRecipes-FilterGroups">{filterGroups}</div>
      </BrowserView>
    </>
  );
};

const FilterGroup = ({ title, tags, selectedTags, toggleTags }) => {
  const tagList = tags.map((tag) => {
    const tagIsSelected = selectedTags.includes(tag);
    const className = tagIsSelected ? "FilterGroup-Tag-selected" : "FilterGroup-Tag";
    return (
      <div key={`Tag-${tag}`} className={className} onClick={(e) => toggleTags(tag)}>
        {tag}
      </div>
    );
  });
  return (
    <div className="FilterGroup-Container">
      <div className="FilterGroup-Title">{title}</div>
      <div className="FilterGroup-TagList">{tagList}</div>
    </div>
  );
};

export default FilterRecipes;
