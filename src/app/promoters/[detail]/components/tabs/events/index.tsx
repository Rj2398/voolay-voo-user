"use client";
import CustomPagination from "@/components/CustomPagination";
import Card from "./Card";
import { useEffect, useState } from "react";
import {
  calculateDistanceInMiles,
  getCurrentLocation,
} from "@/utils/eventFunction";
interface Coordinates {
  latitude: number;
  longitude: number;
}
interface EventData {
  id: number;
  latitude: number;
  longitude: number;
  event_away_distance: number;
  // ... other properties of your event data
}

const Events = ({ dataList = [] }: { dataList: EventData[] }): any => {
  const [tempEventList, setTempEventList] = useState<any>([]);
  const [renderList, setRenderList] = useState<any>([]);
  console.log(renderList, "hello render list data");

  const [pageNo, setPageNo] = useState<number>(1);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();

        if (dataList && position) {
          for (let indxEvent in dataList) {
            const targetLocation: Coordinates = {
              latitude: dataList[indxEvent]["latitude"],
              longitude: dataList[indxEvent]["longitude"],
            };
            dataList[indxEvent]["event_away_distance"] =
              calculateDistanceInMiles(position, targetLocation);
          }

          let tempEvtList = dataList;

          setTempEventList(tempEvtList);
          tempEvtList = tempEvtList.filter((item, indx) => indx < 9);
          setRenderList(tempEvtList);
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    fetchLocation();
  }, [dataList]);

  const handlePageNumber = (pageNo: number) => {
    let newEventList: any = [];
    for (let i = 0; i < tempEventList.length; i += 9) {
      newEventList.push(tempEventList.slice(i, i + 9));
    }
    setPageNo(pageNo);
    setRenderList(newEventList[pageNo - 1]);
  };
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="events"
        role="tabpanel"
        aria-labelledby="events-tab"
      >
        <div className="row">
          {Array.isArray(renderList) &&
            renderList.length > 0 &&
            renderList?.map((item: any) => (
              <Card key={item?.id} cardData={item} />
            ))}
        </div>
        <div className="row">
          {Array.isArray(renderList) && renderList?.length === 0 && (
            <p className="noDataText">No Events</p>
          )}
        </div>
        <CustomPagination
          dataArray={tempEventList}
          pageNo={pageNo}
          clickPageNumber={handlePageNumber}
          pageLimit={9}
        />
      </div>
    </>
  );
};

export default Events;
