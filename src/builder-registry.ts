"use client";
import { builder, Builder } from "@builder.io/react";
import {
  RoomBookingCardLeft,
  RoomBookingCardRight,
} from "./components/room-booking/room-booking-card";
import {
  TitleCard,
  ChildrenGroupCard,
  CommunityChildcareCard,
  ActivitiesCard,
  YouthGroupCard,
  ParentsInfoCard,
} from "./components/children/children-group-card";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Childcare page
const titleCardParameters = [
  {
    name: "pageTitle",
    type: "string",
    defaultValue: "Page Title",
  },
];

const communityChildcareCardParameters = [
  {
    name: "imageUrl",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
  },
  {
    name: "altText",
    type: "string",
    description:
      "This is the alternative text for the image, used for accessibility and SEO",
  },
  {
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
  {
    name: "subtitle",
    type: "string",
    defaultValue: "Subtitle",
  },
  {
    name: "description",
    type: "string",
    defaultValue: "Description",
  },
];

const childrenGroupCardParameters = [
  {
    name: "childcareInfoTitle",
    type: "string",
    defaultValue: "Childcare Information Title",
  },
  {
    name: "childcareInfoDescription",
    type: "string",
    defaultValue: "Childcare Information Description",
  },
  {
    name: "costTitle",
    type: "string",
    defaultValue: "Cost Title",
  },
  {
    name: "costDescription",
    type: "string",
    defaultValue: "Cost Description",
  },
  {
    name: "program1Title",
    type: "string",
    defaultValue: "Program 1 Title",
  },
  {
    name: "program1Description",
    type: "string",
    defaultValue: "Program 1 Description",
  },
  {
    name: "program2Title",
    type: "string",
    defaultValue: "Program 2 Title",
  },
  {
    name: "program2Description",
    type: "string",
    defaultValue: "Program 2 Description",
  },
];

const activityCardParameters = [
  {
    name: "activity1Title",
    type: "string",
    defaultValue: "Activity 1 Title",
  },
  {
    name: "activity1Description",
    type: "string",
    defaultValue: "Activity 1 Description",
  },
  {
    name: "activity2Title",
    type: "string",
    defaultValue: "Activity 2 Title",
  },
  {
    name: "activity2Description",
    type: "string",
    defaultValue: "Activity 2 Description",
  },
];

const youthGroupCardParameters = [
  {
    name: "imageUrl1",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
  },
  {
    name: "altText1",
    type: "string",
    description:
      "This is the alternative text for the image, used for accessibility and SEO",
  },
  {
    name: "infoTitle",
    type: "string",
    defaultValue: "Information Title",
  },
  {
    name: "infoDescription",
    type: "string",
    defaultValue: "Information Description",
  },
];

const parentsInfoCardParameters = [
  {
    name: "information1title",
    type: "string",
    defaultValue: "Information 1 Title",
  },
  {
    name: "information1link",
    type: "string",
    defaultValue: "Information 1 Link",
  },
  {
    name: "information2title",
    type: "string",
    defaultValue: "Information 2 Title",
  },
  {
    name: "information2link",
    type: "string",
    defaultValue: "Information 2 Link",
  },
  {
    name: "information3title",
    type: "string",
    defaultValue: "Information 3 Title",
  },
  {
    name: "information3link",
    type: "string",
    defaultValue: "Information 3 Link",
  },
];

// End of Childcare page

const roomBookingParameters = [
  {
    name: "imageUrl",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"], // allowed file types
  },
  {
    name: "altText",
    type: "string",
    description:
      "This is the alternative text for the image, used for accessibility and SEO",
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
];

// Childcare page components
Builder.registerComponent(TitleCard, {
  name: "Title Card",
  inputs: titleCardParameters,
});

Builder.registerComponent(CommunityChildcareCard, {
  name: "Community childcare Card",
  inputs: communityChildcareCardParameters,
});

Builder.registerComponent(ChildrenGroupCard, {
  name: "Children Group Card",
  inputs: childrenGroupCardParameters,
});

Builder.registerComponent(ActivitiesCard, {
  name: "Activities Card",
  inputs: activityCardParameters,
});

Builder.registerComponent(YouthGroupCard, {
  name: "Youth Group Card",
  inputs: youthGroupCardParameters,
});

Builder.registerComponent(ParentsInfoCard, {
  name: "Parents Info Card",
  inputs: parentsInfoCardParameters,
});

// End of Childcare page components

Builder.registerComponent(RoomBookingCardLeft, {
  name: "Room Booking Card Left",
  inputs: roomBookingParameters,
});

Builder.registerComponent(RoomBookingCardRight, {
  name: "Room Booking Card Right",
  inputs: roomBookingParameters,
});
