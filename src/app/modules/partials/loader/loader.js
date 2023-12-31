import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//import Loader from "react-loader";

import LoadingOverlay from "react-loading-overlay";
//import BounceLoader from "react-spinners/BounceLoader";

import "./styles.css";

import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default function FullPageLoader({loaded}) {
//   const [loaded, setLoaded] = useState(true);



  return (
    <div className="full-page-loader">
      {/* <button onClick={() => setLoaded(!loaded)}>Start Loading</button> */}
      <DarkBackground disappear={!loaded}>
        {/* <Loader
          loaded={false}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#a5d8ff"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.0}
          loadedClassName="loadedContent"
        />*/}
        <LoadingOverlay
          active={true}
          // spinner={<BounceLoader />}
          spinner={true}
          text="Switching organization ..."
        >
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
      </DarkBackground>
    </div>
  );
}
