/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/button-has-type */
/* eslint-disable lines-around-directive */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import type { KakaoBackGroundMapProps } from '@/types/map/BottomSheetProps';
import type { AreaGridType, OneSearchKeywordType } from '@/types/map/map';
import { useSearchParams } from 'next/navigation';
import useMap from '@/apis/map/hooks/useMap';
import { useAroundGymListStore } from '@/store/map/gymStore';

/**
 * @description 맵으로서 해당 도메인에서는 뒷배경에 위치하고 있습니다.
 * @param handleMovePosition 마커를 눌렀을 시에 해당 마커로 이동시키기 위해서 사용합니다.
 * @param mapInfo 현재 맵의 중심 좌표 값을 간직하고 있습니다.
 */
function KakaoBackGroundMap({
  mapInfo,
  handleMovePosition,
}: KakaoBackGroundMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
    libraries: ['clusterer', 'services'],
  });
  // 카카오맵 useRef
  const mapRef = useRef<kakao.maps.Map>(null);
  // 지도 움직임에 따라 경도,위도,줌인 useState
  const [data, setData] = useState<{
    level: number;
    position: {
      lat: number;
      lng: number;
    };
  }>({
    level: 3,
    position: mapInfo.center,
  });
  // 지도 움직임에 따라 인근 암장 리스트 zustand
  const { mapAroundGymList, setMapAroundGymList } = useAroundGymListStore();

  const onMovePosition = (item: OneSearchKeywordType) => {
    handleMovePosition(item);
  };

  // 지도가 움직이면, 주변 사각너비 구하는 함수
  const getMapInfo = (): AreaGridType => {
    const map = mapRef.current;
    if (!map)
      return {
        bottom_latitude: 0,
        top_latitude: 0,
        left_longitude: 0,
        right_longitude: 0,
      };

    const bounds = map.getBounds().toString(); // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식
    const regex = /-?\d+\.\d+/g; // 정규 표현식을 사용하여 숫자만 추출
    const boundsArray = bounds.match(regex); // [남, 서, 북, 동] = [bottom, left, top, right]

    if (!boundsArray || boundsArray.length < 4) {
      // boundsArray가 null이거나 길이가 충분하지 않으면 기본값 반환
      return {
        bottom_latitude: 0,
        top_latitude: 0,
        left_longitude: 0,
        right_longitude: 0,
      };
    }
    // API에 들어갈 형식으로 반환
    return {
      bottom_latitude: parseFloat(boundsArray[0]),
      top_latitude: parseFloat(boundsArray[2]),
      left_longitude: parseFloat(boundsArray[1]),
      right_longitude: parseFloat(boundsArray[3]),
    };
  };

  // 지도 이동하면 해당 면적계산하여 API호출 (useEffect에서 감지)
  const { isLoading, data: mapAroundGymListResponse } =
    useMap.useGetAroundGymList(mapInfo.center, getMapInfo());

  useEffect(() => {
    getMapInfo();
    if (Array.isArray(mapAroundGymListResponse?.data.data))
      setMapAroundGymList(mapAroundGymListResponse?.data.data);
  }, [isLoading, data, mapInfo]);

  return (
    <div className="h-full-size-omit-nav relative z-10">
      <Map // 지도를 표시할 Container
        id="map"
        ref={mapRef}
        draggable
        center={mapInfo.center} // 지도의 중심좌표
        isPanto={mapInfo.isPanto} // 스무스하게 움직일 여부표시
        style={{
          width: '100%',
          height: '100%',
        }}
        level={3} // 지도의 확대 레벨
        onDragEnd={map => {
          setData({
            level: map.getLevel(),
            position: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
          });
        }}
      >
        {/* 현재 위치 마커표시 */}
        <MapMarker position={mapInfo.center} />
        {/* 주변 암장 리스트 마커표시 */}
        <MarkerClusterer averageCenter minLevel={10}>
          {Array.isArray(mapAroundGymList) &&
            mapAroundGymList.map((marker: OneSearchKeywordType) => (
              <MapMarker
                onClick={() => onMovePosition(marker)}
                key={`${marker.position.latitude}-${marker.position.longitude}`}
                position={{
                  lat: marker.position.latitude,
                  lng: marker.position.longitude,
                }}
                image={{
                  src: '/icons/locationPanel.png', // 마커이미지
                  size: {
                    width: 48,
                    height: 48,
                  }, // 마커이미지의 크기
                }}
              />
            ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
}

export default KakaoBackGroundMap;
