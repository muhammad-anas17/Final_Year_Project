import React from 'react';

function Card({ imageSrc, title, text }) {
  const imageUrl = require(`../${imageSrc}`).default;
  return (
    <div className="card" style={{ width: '20rem' }}>
      <img className="card-img-top" src={imageSrc} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default function CardList() {
  return (
    <div className="row">
      <div className="col-md-3">
        <Card 
          imageSrc="dash.png"
          title="Dashboard"
          text="Manage your personal dashboard to see all the colleges you have applied to."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc="dash.png"
          title="Room Service"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc="dash.png"
          title="Kitchen Management"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc="dash.png"
          title="Billing Management"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>
    </div>
  );
}
