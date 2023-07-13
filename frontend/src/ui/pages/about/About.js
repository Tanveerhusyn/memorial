import React from "react";
import "./about.css";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="aboutpage">
      <div className="ab-top">
        <img src={logo} />
        <div className="content1">
          <p className="tp">
            Losing a loved one is incredibly painful, and very personal.
          </p>
          <p className="btm">
            At RememberedandMissed, we provide a shared, easily-accessible
            virtual space where family members and friends can pay homage to a
            special life while helping each other heal by sharing their
            feelings, warm memories, and words of support.
          </p>
          <Link to="/creatememorial">
            <button className="memobtn">Create A Memorial</button>
          </Link>
          '
        </div>
      </div>

      <div className="triagnle"></div>
      <div className="ab-bottom">
        <h3>Welcome to our memorial website </h3>
        <p>
          Let me begin by expressing my deepest condolences and gratitude for
          taking the time to visit and explore this special space dedicated to
          honoring the memory of our loved ones.
        </p>
        <p>
          The inspiration for this memorial website started from a deeply
          personal experience - the love and admiration I have for my late
          father. Losing someone so dear to me was an incredibly difficult time
          in my life, as it is for anyone who experiences such a profound loss.
          During the grieving process, I found myself reflecting on the memories
          we shared and the impact he had on everyone’s life.
        </p>
        <p>
          One thing that weighed heavily on my heart was the absence of a eulogy
          from his children during his memorial service. At the time, the
          overwhelming grief and sense of responsibility prevented me from
          delivering a eulogy that truly captured the essence of who my father
          was. It was a missed opportunity to celebrate his life, express my
          love, and share his remarkable journey with others.
        </p>
        <p>
          This regret served as a catalyst for the creation of
          RememberedAndMissed.com. I wanted to ensure that others wouldn't have
          to experience the same regret and sense of unfulfilled tribute that I
          did. I realized that there are countless individuals who, for various
          reasons, are unable to deliver eulogies or share their heartfelt
          sentiments during memorial services.
        </p>
        <p>
          www.RememberedAndMissed.com serves as a virtual space where
          individuals can contribute their thoughts, memories, stories, and even
          eulogies, paying homage to the remarkable lives that touched their
          hearts. Through the power of shared experiences, this memorial website
          aims to unite individuals who have gone through similar grieving
          journeys. It's a place where we can find solace, strength, and
          inspiration in the memories we hold dear. By coming together, we can
          find healing, support, and a sense of community as we navigate the
          complexities of loss.
        </p>
        <p>
          I hope this memorial website becomes a source of comfort and
          inspiration for all who visit. Whether you're here to celebrate the
          life of a loved one or seek solace during your own journey of grief,
          my wish is that you find peace and healing within these virtual walls.
        </p>
      </div>
    </div>
  );
}

export default About;
