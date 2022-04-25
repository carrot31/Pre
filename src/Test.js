import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
//회원가입할때 내 동네 찾기!

const Test = () => {
  const [loca, setLoca] = React.useState();
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  const Click = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      // console.log(pos);
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      console.log(lat, lon);
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
          {
            headers: {
              Authorization: "KakaoAK 6b1dc7559108279aacbea1614bb2fcc1",
            },
          }
        )
        .then((res) => {
          const location = res.data.documents[0].address; //내 현 위치의 주소
          const result = location.address_name;
          setLoca(result); //input에 지소 띄우기

          //네이버 지도
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
          //위도, 경도로 변환 및 마커표시
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(result, function (result, status) {
            //정상적으로 검색이 완료될 경우,
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시
              const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              var infowindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">우리집</div>',
              });
              infowindow.open(map, marker);
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        });
    });
  };

  return (
    <>
      <div
        id="map"
        style={{
          width: "50%",
          height: "500px",
          margin: "50px auto",
        }}
      ></div>
      <Box>
        <Input
          value={loca || ""}
          placeholder="아래 버튼을 통해 동네를 설정해 주세요."
          type="text"
          onChange={(e) => console.log(e.target.value)}
        />
        <Btn onClick={Click}>내 위치 확인하기</Btn>
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 30vw;
  height: 1 0vh;
  margin: 50px auto;
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
`;

const Btn = styled.button`
  width: 100px;
  height: 50px;
`;

export default Test;
