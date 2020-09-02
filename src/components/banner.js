/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";
import { Button, Flex, Text, Box } from "rebass";
import { Link } from "gatsby";


const DonateButton = ({...props}) => {
    return (
        <a 
          href="https://secure.actblue.com/donate/movement-4-black-lives-1"
          target="_blank"
          style={{ backgroundImage: "none", }}
        >
        <Button 
          sx={{
            appearance: "none",
            display: "inline-block",
            textAlign: "center",
            fontSize: "small",
            border: "1px solid",
            borderRadius: 2,
            margin: "5px",
            borderColor: "#FFFFFF",
            color: "#FFFFFF",
            backgroundColor: "transparent",
            ':hover': {
                color: "#000000",
                backgroundColor: "#FFFFFF",
            }
          }}
        >
          { props.text }
        </Button>
        </a>
    )
};

const Banner = ({...props}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#000000",
        width: "100%",
      }}
    >
      <div 
        style={{
          width: "100%", 
       margin: "0 auto", 
       padding: "10px",
       border: "1px solid #000",
       textAlign: "center"
        }}
      >
        <Flex sx={{ justifyContent: "center", alignItems: "center", }}>
            <h3 style={{color: "#FFFFFF", margin: 0, paddingRight: "1rem", }}>
                { props.statement }
            </h3>
            { props.callToAction }
        </Flex>
      </div>
    </div>
  )
};

const BLMBanner = () => {
    const statement = "Black Lives Matter.";
    const callToAction = <DonateButton text="Donate" />
    return ( <Banner statement={ statement } callToAction={ callToAction } /> );
};

export default BLMBanner;
