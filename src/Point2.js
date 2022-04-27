import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
// 지도에서 위치찍어서 포스트 올리기!
const Point2 = () => {
  const Main = () => {
    const [position, setPosition] = useState();
    return (
      <>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: "100%",
            height: "450px",
          }}
          level={3} // 지도의 확대 레벨
          onClick={(_t, mouseEvent) =>
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
        >
          {position && <MapMarker position={position} />}
        </Map>
        {/* {position && (
          <p>
            {"클릭한 위치의 위도는 " +
              position.lat +
              " 이고, 경도는 " +
              position.lng +
              " 입니다"}
          </p>
        )} */}
        {position &&
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.lng}&y=${position.lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: "KakaoAK 6b1dc7559108279aacbea1614bb2fcc1",
                },
              }
            )
            .then((res) => {
              const location = res.data.documents[0].address; //내 현 위치의 주소
              const result = location.address_name;
              console.log([result]);
            })}
      </>
    );
  };
  return <Main />;
};

export default Point2;
