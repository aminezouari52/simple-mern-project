import React from 'react'

import PlaceItem from './PlaceItem'
import './PlacesList.css'

const PlacesList = (props) => {
  let content
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any places. Maybe create one?</p>
  } else {
    content = (
      <ul className="place-list">
        {props.items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            title={place.title}
            description={place.description}
          />
        ))}
      </ul>
    )
  }

  return <section id="places">{content}</section>
}

export default PlacesList
