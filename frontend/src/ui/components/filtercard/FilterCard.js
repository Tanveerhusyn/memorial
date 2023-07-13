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
const {newThemes:themes,  setNewThemes,themes:allthemes } = useUserContext()
  const handleTagChange = (tag) => {
    const lowerCaseTag = tag.toLowerCase();

    if (selectedTags.includes(lowerCaseTag)) {
      setSelectedTags(selectedTags.filter((t) => t !== lowerCaseTag));
    } else {
      setSelectedTags([...selectedTags, lowerCaseTag]);
    }
  };

  const filteredThemes = selectedTags.length > 0
    ? themes.filter((theme) => theme.tags && theme.tags.some((tag) => selectedTags.includes(tag.toLowerCase())))
    : themes;
  
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
        onClick={()=>{
          console.log("fil",selectedTags)
          if(selectedTags.length==0){
          setNewThemes(allthemes)

          }
          else {setNewThemes(filteredThemes)}
        }}
        className='saveBtn'>Save</button>
    </div>
  );
};

export default FilterCard;
