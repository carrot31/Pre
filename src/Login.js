import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import React, { useEffect } from "react";

const buttonBlock = {
  border: "none",
  borderRadius: "9px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "32px",
  cursor: "pointer",
  background: "#fae101",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px",
};

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;
const { kakao } = window;

const Login = () => {
  //   useEffect(() => {
  if (typeof window !== "undefined") {
    window.Kakao.init(`${process.env.REACT_APP_KAKAO_APP_KEY}`);
  }
  //   }, []);

  return (
    <KakaoLogin
      token={`${process.env.REACT_APP_KAKAO_APP_KEY}`}
      onSuccess={() => console.log("로그인 성공")}
      onFail={(err) => console.error("로그인 실패", err)}
      onLogout={() => console.log("로그아웃")}
      style={buttonBlock}
    >
      <ButtoninnerText>카카오로 로그인</ButtoninnerText>
    </KakaoLogin>
  );
};

export default Login;
