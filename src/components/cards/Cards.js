import React, { Fragment, useContext } from "react";
import { StaysContext } from "../../context/index";
import "./Cards.css";
import star from "../../images/star.svg";
import uniqid from "uniqid";

function Cards() {
  const appContext = useContext(StaysContext);
  const { searchResults } = appContext;

  return (
    <Fragment>
      {searchResults.length > 0 && (
        <div className="airbnb-mock__text-container">
          <h1 className="airbnb-mock__heading">
            {" "}
            Stays in {searchResults[0].country}
          </h1>
          <p className="airbnb-mock__result-count">
            {searchResults.length >= 1
              ? `${searchResults.length - 1}+ stays`
              : `${searchResults.length} stay`}
          </p>
        </div>
      )}
      <div className="airbnb-mock__cards-container">
        {searchResults.length ? (
          searchResults.map((item) => (
            <div className="airbnb-mock__card" key={uniqid()}>
              <div
                className="airbnb-mock__image-container"
                style={{
                  backgroundImage: `url(${item.photo})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="card__meta-container">
                {item.superHost && (
                  <div className="card__meta-superhost">Superhost</div>
                )}

                <p className="card__meta-type">{item.type} </p>
                {item.beds && (
                  <p className="card__meta-beds">. {item.beds} beds</p>
                )}
                <div className="card-meta-rating__container">
                  <img
                    className="airbnb-mock__rating-image"
                    src={star}
                    alt="star rating"
                  />
                  <p className="card__meta-rating">{item.rating}</p>
                </div>
                <p className="card__meta-title">{item.title}</p>
              </div>
            </div>
          ))
        ) : (
          <h2 className="airbnb-mock__no-results">No results available</h2>
        )}
      </div>
    </Fragment>
  );
}

export default Cards;
