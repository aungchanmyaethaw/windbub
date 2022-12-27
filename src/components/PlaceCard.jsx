import React from "react";
import { AiFillStar } from "react-icons/ai";
const PlaceCard = ({ title, rating, superHost, type, photo, beds }) => {
  return (
    <article>
      <img
        src={photo}
        alt={title}
        className="object-cover h-[20rem] w-full rounded-[1.5rem] mb-4"
      />

      <div className="flex items-center">
        {superHost ? (
          <span className="mr-2 py-[0.25em] px-[1em] rounded-xl border-dark border-2 text-dark uppercase text-xs font-bold">
            Super host
          </span>
        ) : null}
        <span className="capitalize text-gray font-medium">
          {type} {beds ? `.${beds} beds` : null}
        </span>

        <div className="flex items-center gap-1 ml-auto text-dark">
          <AiFillStar fill="#eb5757" />
          <span>{rating}</span>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
