import React, { useState, useEffect } from "react";
import { BrowserView } from "react-device-detect";

import { get } from "../../utilities";
import "./FilterRecipes.css";

const FilterRecipes = ({ fillerText, setFillerText, selectedTags, addTags, removeTags }) => {
  const [groupTags, setGroupTags] = useState([]);

  useEffect(() => {
    get("/api/tags").then((allTags) => {
      setGroupTags(allTags);
      addTags(allTags.filter((group) => group.name == "main")[0].tags);
    });
  }, []);

  const filterGroups = groupTags.map((group) => {
    return (
      <FilterGroup
        key={`FilterGroup-${group.name}`}
        title={group.name}
        tags={group.tags}
        selectedTags={selectedTags}
        addTags={addTags}
        removeTags={removeTags}
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

const FilterGroup = ({ title, tags, selectedTags, addTags, removeTags }) => {
  const allTagsSelected = tags.filter((tag) => selectedTags.includes(tag)).length == tags.length;

  const tagGroupClassName = allTagsSelected ? "FilterGroup-Tag-selected" : "FilterGroup-Tag";

  const tagList = tags.map((tag) => {
    const tagIsSelected = selectedTags.includes(tag);
    const className = tagIsSelected ? "FilterGroup-Tag-selected" : "FilterGroup-Tag";
    return (
      <div
        key={`Tag-${tag}`}
        className={className}
        onClick={() => {
          if (tagIsSelected) {
            removeTags([tag]);
          } else {
            addTags([tag]);
          }
        }}
      >
        {tag}
      </div>
    );
  });
  return (
    <div className="FilterGroup-Container">
      <div
        onClick={() => {
          if (allTagsSelected) {
            removeTags(tags);
          } else {
            addTags(tags);
          }
        }}
        className={`${tagGroupClassName} FilterGroup-Title`}
      >
        {title}
      </div>
      <div className="FilterGroup-TagList">{tagList}</div>
    </div>
  );
};

export default FilterRecipes;
