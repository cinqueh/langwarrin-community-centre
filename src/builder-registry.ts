"use client";
import { builder, Builder } from "@builder.io/react";
import { RoomBookingCardLeft, RoomBookingCardRight } from "./components/room-booking/room-booking-card"

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const roomBookingParameters = [
    {
      name: "imageUrl",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"], // allowed file types
    },
    {
      name: "altText",
      type: "string",
      description: "This is the alternative text for the image, used for accessibility and SEO",
    },
    {
      name: "roomName",
      type: "string",
      defaultValue: "Room Name",
    },
    {
      name: "capacity",
      type: "number",
      defaultValue: "0",
    },
    {
      name: "communityGroupHourlyRate",
      type: "number",
      defaultValue: "0",
    },
    {
      name: "permanentHiresHourlyRate",
      type: "number",
      defaultValue: "0",
    },
    {
      name: "casualHiresHourlyRate",
      type: "number",
      defaultValue: "0",
    },
  ]

Builder.registerComponent(RoomBookingCardLeft, {  
  name: "Room Booking Card Left",
  inputs: roomBookingParameters
});
Builder.registerComponent(RoomBookingCardRight, {  
  name: "Room Booking Card Right",
  inputs: roomBookingParameters
});
