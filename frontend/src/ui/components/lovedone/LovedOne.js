import React, { useState } from "react";
import "./LoveOne.css";
import drop from "../../../assets/icons/drop.svg";
import { useUserContext } from "../../../context/MemorialContext";
import { BsArrowRight } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
function LovedOne({  }) {
  const [loading, setLoading] = useState(false);
  // console.log("Object coming: ", options[selectedOptions].isCompleted)
  
  const relationships = [
    'Spouse',
    'Parent',
    'Sibling',
    'Child',
    'Friend',
    'Colleague',
    'Relative',
    'Partner'
  ]; // Example relationships
  
  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];
  const memorialDestinations = [
    
    'Mountain',
    'Forest',
    'City',
    'Park',
    'Lake',
    'Island',
    'Countryside',
    'Desert',
    'Historical Site',
    'Landmark',
    'Garden',
    'Resort',
    'Waterfall',
    'Cave',
    'Village',
    'Museum',
    'Monument',
    
  ];
    
  
  const {
    handleChange,
    formData,
    options,
    setShowOption,
    showOption,
    setOptions,
    handleSelected,
    user,
    delayedTrigger,
     
  } = useUserContext();
  const handleNext = () => {
    setShowOption(1);
    // next();
  };
  // console.log("title: ",title)
  let title =
    user && user.meta.hasPaid
      ? "Privacy options"
      : user && !user.meta.hasPaid
      ? "Choose your plan"
      : "Account details";

  const handleSelected1 = (itm) => {
    const newArr = options.map((option) => {
      // console.log(Option)
      if (option.title === title) {
        return {
          ...option,
          isActive: true,
        };
      } else {
        return {
          ...option,
          isActive: false,
        };
      }
    });

    const filterArr = newArr.filter((element) => element.title == title);
    setOptions(newArr);

    setShowOption(...filterArr);
    // console.log(showOption);
    // console.log(options);
    sessionStorage.setItem('formData',JSON.stringify(formData))
    console.log("New array: ", filterArr);
  };

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [relationshipError, setRelationshipError] = useState('');
  const [memorialDestinationError, setMemorialDestinationError] = useState('');
  const [genderError, setGenderError] = useState('')
  const [countryError, setCountryError] = useState('');

 

  const [optional, setOptional] = React.useState(true);

  return (
    <>
      <div className="lo-content">
        <p className="lo-title">This memorial is dedicated to:</p>

        <div className="lo-single-line">
  <div className="lo-single-input">
    <p>First Name</p>
    <input
      name="firstName"
      value={formData.firstName}
      onChange={(e) => {
        handleChange(e);
        if (e.target.value.trim() === '') {
          setFirstNameError('Please enter your first name');
        } else {
          setFirstNameError('');
        }
      }}
      onBlur={(e) => {
        if (e.target.value.trim() === '') {
          setFirstNameError('Please enter your first name');
        } else {
          setFirstNameError('');
        }
      }}
      style={{ border: `${firstNameError ? '1.8px solid red' : 'none'}` }}
      type="name"
    />
    {firstNameError && <p className="error-message">{firstNameError}</p>}
  </div>

  <div className="lo-single-input">
    <p>Last Name</p>
    <input
      name="lastName"
      value={formData.lastName}
      onChange={(e) => {
        handleChange(e);
        if (e.target.value.trim() === '') {
          setLastNameError('Please enter your last name');
        } else {
          setLastNameError('');
        }
      }}
      onBlur={(e) => {
        if (e.target.value.trim() === '') {
          setLastNameError('Please enter your last name');
        } else {
          setLastNameError('');
        }
      }}
      style={{ border: `${lastNameError ? '1.5px solid red' : 'none'}` }}
      type="name"
    />
    {lastNameError && <p className="error-message">{lastNameError}</p>}
  </div>

  <div className="lo-single-input">
    <p>Gender</p>
    <div className="gender">
      <label className="gender-input">
        <input
          className="gender-label"
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={(e) => {
            handleChange(e);
            if (e.target.value === '') {
              setGenderError('Please select a relationship');
            } else {
              setGenderError('');
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              setGenderError('Please select a relationship');
            } else {
              setGenderError('');
            }
          }}
        />
        Male
      </label>

      <label className="gender-label">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={(e) => {
            handleChange(e);
            if (e.target.value === '') {
              setGenderError('Please select a relationship');
            } else {
              setGenderError('');
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              setGenderError('Please select a relationship');
            } else {
              setGenderError('');
            }
          }}
        />
        Female
      </label>
    </div>
    {genderError && <p style={{marginTop:'15px'}} className="error-message">{genderError}</p>}

  </div>
</div>

<div className="lo-single-line">
  <div className="lo-single-input">
    <p>Relationship</p>
    <select
      id="dropdown"
      name="relationship"
      className="drop"
      value={formData.relationship}
      onChange={(e) => {
        handleChange(e);
        if (e.target.value === '') {
          setRelationshipError('Please select a relationship');
        } else {
          setRelationshipError('');
        }
      }}
      onBlur={(e) => {
        if (e.target.value === '') {
          setRelationshipError('Please select a relationship');
        } else {
          setRelationshipError('');
        }
      }}
      style={{ outline: `${relationshipError ? '1.5px solid red' : 'none'}` }}
    >
      <option value="">Select</option>
          {relationships.map((relationship) => (
            <option value={relationship} key={relationship}>{relationship}</option>
          ))}
    </select>
    {relationshipError && <p className="error-message">{relationshipError}</p>}
  </div>

  <div className="lo-single-input">
    <p>Memorial Destination</p>
    <select
      id="dropdown"
      name="memorialDestination"
      className="drop"
      value={formData.memorialDestination}
      onChange={(e) => {
        handleChange(e);
        if (e.target.value === '') {
          setMemorialDestinationError('Please select a memorial destination');
        } else {
          setMemorialDestinationError('');
        }
      }}
      onBlur={(e) => {
        if (e.target.value === '') {
          setMemorialDestinationError('Please select a memorial destination');
        } else {
          setMemorialDestinationError('');
        }
      }}
      style={{ outline: `${memorialDestinationError ? '1.5px solid red' : 'none'}` }}
    >
      <option value="">Select</option>
          {memorialDestinations.map((relationship) => (
            <option value={relationship} key={relationship}>{relationship}</option>
          ))}
    </select>
    {memorialDestinationError && <p className="error-message">{memorialDestinationError}</p>}
  </div>

  <div className="lo-single-input">
    <p>Country (optional)</p>
    <select
      id="dropdown"
      name="country"
      className="drop"
      value={formData.country}
      onChange={(e) => handleChange(e)}
    >
      <option value="">Select</option>
          {countries.map((country) => (
            <option value={country} key={country}>{country}</option>
          ))}
    </select>
  </div>
</div>



        <div className="hidShow">
          <p className="lo-title">More details (optional):</p>
          <img src={drop} onClick={() => setOptional(!optional)} />
        </div>
        {optional ? (
          <>
            <div className="lo-single-line">
              <div className="lo-single-input">
                <p>Birth Date</p>
                <input name="birthDate" value={formData.birthDate} onChange={(e)=>handleChange(e)} type="date" />
              </div>
              <div className="lo-single-input">
                <p>Birth Place</p>
                <input name="birthPlace" value={formData.birthPlace} onChange={(e)=>handleChange(e)} type="text" />
              </div>
              <div className="lo-single-input">
                <p>Birth Country</p>
                <select
      id="dropdown"
      name="birthCountry"
      className="drop"
      value={formData.birthCountry}
      onChange={(e) => handleChange(e)}
    >
      <option value="">Select</option>
          {countries.map((country) => (
            <option value={country} key={country}>{country}</option>
          ))}
    </select>
              </div>
            </div>

            <div className="lo-single-line">
              <div className="lo-single-input">
                <p>Passed Date</p>

                <input name="passedDate" value={formData.passedDate} onChange={(e)=>handleChange(e)} type="date" />
              </div>

              <div className="lo-single-input">
                <p>Death Place</p>
                <input type="text" name="deathPlace" value={formData.deathPlace} onChange={(e)=>handleChange(e)} />
              </div>
              <div className="lo-single-input">
                <p>Death Country</p>
                <select
      id="dropdown"
      name="deathCountry"
      className="drop"
      value={formData.deathCountry}
      onChange={(e) => handleChange(e)}
    >
      <option value="">Select</option>
          {countries.map((country) => (
            <option value={country} key={country}>{country}</option>
          ))}
    </select>
              </div>
            </div>
            {/* <p className="lo-title">Memorial Web Address</p>
            <div className="lo-single-input http">
              <span>https://willalwaysloveu.com/</span>
                <input value={formData.webAddress} name="webAddress" onChange={(e)=>handleChange(e)} type="text" />{" "}
            </div> */}
          </>
        ) : (
          ""
        )}

<button 
 
className="contBtn" onClick={()=>{
  if(formData.firstName=='' ){
    setFirstNameError('Please enter your first name')
  }
   if(formData.lastName==''){
    setLastNameError("Please enter your last name")
  }
  if(formData.relationship==''){
setRelationshipError('Please enter your relationship')
  }
  if(formData.gender==''){
setGenderError('Please enter your gender')
  }
  if(formData.memorialDestination==''){
setMemorialDestinationError('Please enter memorial destination')
  }
  if(formData.firstName!='' && formData.lastName!='' && formData.relationship!='' && formData.gender!='' && formData.memorialDestination!=''){
    setLoading(true)
  delayedTrigger(()=>{
    handleSelected1()
    setLoading(false)
  })
  }
}}>
          {loading ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <>
            Continue
            <BsArrowRight className="arro" />
            </>

          )} 
        </button>
      </div>
    </>
  );
}

export default LovedOne;
