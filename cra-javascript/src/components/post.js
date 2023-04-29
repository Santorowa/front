import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "30%",
    left: "55%",
    width: "600px",
    height: "480px",
    padding: "10px",
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </>
  );
};

export default Post;
