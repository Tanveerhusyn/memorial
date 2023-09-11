import React,{useState} from 'react';
import './FilterCard.css';
import { useUserContext } from '../../../context/MemorialContext';

const FilterCard = () => {
  const filterOptions = [
    'All',
    'New',
    'Baby',
    'Candles',
    'Birthday',
    'Flowers',
    'Miss You',
    'Hobbies',
    'Veterans',
    'Nature',
    'First Responders',
    'Family',
    'Holiday',
    'Special',
    'Mother’s Day',
    'Abstract',
    'Military',
    'Fantasy',
  ];

  const [selectedTags, setSelectedTags] = useState([]);
const {newThemes:themes,  setNewThemes,themes:allThemes } = useUserContext()
const handleTagChange = (tag) => {
  const lowerCaseTag = tag.toLowerCase();

  if (selectedTags.includes(lowerCaseTag)) {
    setSelectedTags(selectedTags.filter((t) => t !== lowerCaseTag));
  } else {
    setSelectedTags([...selectedTags, lowerCaseTag]);
  }
};

const filteredThemes = selectedTags.includes('all')
  ? allThemes
  : allThemes.filter((theme) => theme.tags && selectedTags.includes(theme.tags.toLowerCase()));

  
  return (
    <div className="filter-bar">
      <h3 className="filter-bar-title">Select a template</h3>
      {/* <p className="filter-bar-description">We have built 45+ <br/> templates for your</p> */}
      <p className="filter-bar-subdesc"> loved ones</p>
        <p className='cat-text'>Category</p>
      <div className="filter-options">
        <div className="filter-column">
          {filterOptions.slice(0, 9).map((option) => (
            <div className="filter-option" key={option}>
              <input type="checkbox"
              id={option}
              checked={selectedTags.includes(option.toLowerCase())}
              onChange={() => handleTagChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
    
      <div className="filter-column">
          {filterOptions.slice(9).map((option) => (
            <div className="filter-option" key={option}>
              <input type="checkbox"
              id={option}
              checked={selectedTags.includes(option.toLowerCase())}
              onChange={() => handleTagChange(option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      
      </div>
      <button 
      onClick={() => {
        console.log("fil", selectedTags)
        if (selectedTags.includes('all') || selectedTags.length==0) {
          setNewThemes(allThemes);
        } else {
          setNewThemes(filteredThemes);
        }
      }}
      className='saveBtn'>
      Save
    </button>
    </div>
  );
};

export default FilterCard;
