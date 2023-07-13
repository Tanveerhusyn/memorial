import React, { useState, useEffect } from "react";
import "./Services.css";
function Services() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  useEffect(() => {
    const startCounting = () => {
      let counter1 = 0;
      let counter2 = 0;
      let counter3 = 0;
      let counter4 = 0;

      const interval1 = setInterval(() => {
        if (counter1 <= 230) {
          setNumber1(counter1);
          counter1++;
        } else {
          clearInterval(interval1);
        }
      }, 10);

      const interval2 = setInterval(() => {
        if (counter2 <= 230) {
          setNumber2(counter2);
          counter2++;
        } else {
          clearInterval(interval2);
        }
      }, 10);

      const interval3 = setInterval(() => {
        if (counter3 <= 4.8) {
          setNumber3(counter3);
          counter3++;
        } else {
          clearInterval(interval3);
        }
      }, 10);
      const interval4 = setInterval(() => {
        if (counter4 <= 200) {
          setNumber4(counter4);
          counter4++;
        } else {
          clearInterval(interval4);
        }
      }, 10);
    };

    startCounting();
  }, []);

  return (
    <div className="service-container">
      <div className="text-Container">
        <h3 className="numbers-div">{`${number1}K+`}</h3>
        <p className="content-text">MEMORIALS</p>
      </div>

      <div className="text-Container">
        <h3 className="numbers-div">{`${number2}K+`}</h3>
        <p className="content-text">Families</p>
      </div>

      <div className="text-Container">
        <h3 className="numbers-div">{`${number3}M+`}</h3>
        <p className="content-text">Tributes</p>
      </div>

      <div className="text-Container">
        <h3 className="numbers-div">{`${number4}K+`}</h3>
        <p className="content-text">visitors</p>
      </div>
    </div>
  );
}

export default Services;
