import React, { useState, useEffect } from "react";
import "./FilterRecipes.css";

const FilterRecipes = ({ fillerText, setFillerText, toggleTags, selectedTags }) => {
  const [groupTags, setGroupTags] = useState([]);

  useEffect(() => {
    setGroupTags([
      {
        name: "main",
        tags: ["fish", "pork", "meat"],
      },
      {
        name: "desserts",
        tags: ["cake", "cookie", "ice cream"],
      },
    ]);
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
    <div>
      <div className="FilterRecipes-Input">
        <input
          value={fillerText}
          onChange={(e) => setFillerText(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div className="FilterRecipes-FilterGroups">{filterGroups}</div>
    </div>
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
