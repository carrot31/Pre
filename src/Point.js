import React, { useEffect } from "react";
// 지도에서 위치찍어서 포스트 올리기!
const Point = () => {
  const { kakao } = window;

  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    const marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result);
          let detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";
          console.log(result[0]);
          let content =
            '<div class="bAddr">' +
            '<span class="title">약속 장소</span>' +
            detailAddr +
            "</div>";
          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const infoDiv = document.getElementById("centerAddr");
      }
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "50%",
        height: "500px",
        margin: "50px auto",
      }}
    ></div>
  );
};

export default Point;

//지도에서 위치 찍기
// const mapContainer = document.getElementById("map"),
//       mapOption = {
//         center: new kakao.maps.LatLng(36.5, 127.5),
//         // 지도의 중심 좌표(임의 설정)
//         level: 13,
//         // 지도의 확대 레벨(임의 설정)
//       };

//     //설정한 지도 생성
//     const map = new kakao.maps.Map(mapContainer, mapOption);
//     //마커 초기화(초기화 시 지도에 미리 지정 가능 : 카카오맵 API 문서 참조)
//     const marker = new kakao.maps.Marker();
//     //카카오맵 클릭 이벤트 추가
//     kakao.maps.event.addListener(map, "click", (mouseEvent) => {
//       //클릭한 위도, 경도 정보 불러오기
//       const latlng = mouseEvent.latLng;
//       //마커 위치를 클릭한 위치로 이동
//       marker.setPosition(latlng);
//       marker.setMap(map);
//       alert(`위도 : ${latlng.getLat()}, 경도 : ${latlng.getLng()}`);
//     });
