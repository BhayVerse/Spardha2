import React, { useEffect, useState } from "react";
import Image from "next/image";

interface EventsElement {
  eventName: string;
  eventCategory: string;
}
interface EventsAboutElement {
  coordinators: { coordinator_name: string; coordinator_number: string }[];
  description: string;
  document: string;
  endTime: number;
  eventName: string;
  flagship: string;
  poster: string;
  startTime: number;
  venue: string;
  eventCategory: string;
}
const initData: EventsAboutElement = {
  coordinators: [
    { coordinator_name: "Bhavesh Gupta", coordinator_number: "9521221162" },
    { coordinator_name: "Renu", coordinator_number: "7082481332" },
  ],
  description:
    "Hola Sherlock's 🧐🧐\nBring into play the principle of reversibility🔄 in your heads and pen down your arithmetic skills📝 to find the raw data as we are back with brainstorming🤯 event of the era , Black Box📦 at Techspardha 2K23!\nPut your quizzing caps🤠 on and get ready to sweat to compete with amazing teams😎..",
  document: "https://bit.ly/BlackBox23",
  endTime: 1674898200000,
  eventName: "Black Box",
  flagship: "false",
  poster: "https://i.ibb.co/CMDkkRJ/IMG-20230120-WA0047.jpg",
  startTime: 1674804600000,
  venue: "CS Department",
  eventCategory: "Programming",
};
const EventAbout: React.FC<{
  item: EventsElement;
}> = ({ item }) => {
  const [event, setEvent] = useState<EventsAboutElement | null>(initData);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/events/description?eventCategory=${item.eventCategory}&eventName=${item.eventName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data: {
          message: string;
          success: boolean;
          data: EventsAboutElement;
        }) => {
          setEvent(data.data);
        }
      )
      .catch((err: Error) => err);
    setLoading(false);
  }, [item]);
  return (
    <div className="h-full w-full flex-shrink-0 overflow-y-auto">
      {event && !loading ? (
        <>
          <div className=" w-full">
            {event.poster ? (
              <Image
                alt="Poster"
                className="w-full"
                src={event.poster}
                width={1000}
                height={1000}
              />
            ) : (
              <div className="h-[300px] w-auto p-2 bg-[rgba(137,137,137,0.69)] animate-pulse"></div>
            )}
          </div>
          <div className="w-full p-2">
            <p>{event.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="h-full w-full flex-shrink-0 overflow-y-auto">
            <div className="h-2/3 w-auto p-2 bg-[rgba(137,137,137,0.69)] animate-pulse"></div>
            <div className="w-full p-2 ">
              <p className="animate-pulse">Loading....</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventAbout;
