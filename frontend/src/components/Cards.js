import React from 'react';
import StudentImage from './images/student.jpg'; // Importing the logo image directly
import TrackImage from './images/tracking.jpg';  // Importing another image
import ManageImage from './images/management.jpg';
import './Cards.css'
function Card({ imageSrc, title, text }) {
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
          imageSrc={StudentImage} 
          title="Dashboard"
          text="Manage your personal dashboard to see all the colleges you have applied to."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc={TrackImage}
          title="Room Service"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>
      <div className="col-md-3">
        <Card 
          imageSrc={ManageImage} 
          title="Kitchen Management"
          text="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>

    </div>
  );
}
