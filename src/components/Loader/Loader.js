import React from "react";
import Loader from "react-loader-spinner";
import "./Loader.css";

export const NewLoader = (props) => {
  return (
    <div className="background">
      <div>
        <Loader type={props.type} color={props.color} height={props.height} width={props.width} />
      </div>
    </div>
  );
};

export default NewLoader;

/*
TYPE OF SPINNER
Audio	
Ball-Triangle	<Loade
Bars	
Circles	
Grid
Hearts	
Oval
Puff
Rings
TailSpin
ThreeDots
*/
