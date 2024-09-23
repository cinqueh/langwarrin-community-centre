"use client";
import { builder, Builder } from "@builder.io/react";
import {
  RoomBookingCardLeft,
  RoomBookingCardRight,
} from "./components/room-booking/room-booking-card";

import {
  TitleCard,
  InformationCardTitle,
  LightGreenInformationCard,
  DarkGreenInformationCard,
  FormDownloadCard,
  DarkGreenProgramCard,
  MediumGreenProgramCard,
  LightGreenProgramCard,
  divider,
  ProgramImageCard,
  InformationCardWithButton,
} from "./components/programs/programs-card";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const programImageCardParameters = [
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
];

const programCard1Parameters = [
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
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
];

const formDownloadCardParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
  {
    name: "description",
    type: "string",
    defaultValue: "Description",
  },
  {
    name: "buttonText",
    type: "string",
    defaultValue: "Button Text",
  },
];

const informationCardParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
  {
    name: "description",
    type: "string",
    defaultValue: "Description",
  },
];

const informationCardTitleParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
];

const titleCardParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Title",
  },
];

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

Builder.registerComponent(InformationCardWithButton, {
  name: "Information Card With Button",
  inputs: informationCardParameters,
});

Builder.registerComponent(DarkGreenInformationCard, {
  name: "Dark Green Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(LightGreenInformationCard, {
  name: "Light Green Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(divider, {
  name: "Divider",
});

Builder.registerComponent(ProgramImageCard, {
  name: "Program Image Card",
  inputs: programImageCardParameters,
});

Builder.registerComponent(DarkGreenProgramCard, {
  name: "Dark Green Program Card",
  inputs: programCard1Parameters,
});

Builder.registerComponent(LightGreenProgramCard, {
  name: "Light Green Program Card",
  inputs: programCard1Parameters,
});

Builder.registerComponent(MediumGreenProgramCard, {
  name: "Medium Green Program Card",
  inputs: programCard1Parameters,
});

Builder.registerComponent(FormDownloadCard, {
  name: "Form Download Card",
  inputs: formDownloadCardParameters,
});


Builder.registerComponent(TitleCard, {
  name: "Title Card",
  inputs: titleCardParameters,
});

Builder.registerComponent(InformationCardTitle, {
  name: "Information Card Title",
  inputs: informationCardTitleParameters,
});

Builder.registerComponent(RoomBookingCardLeft, {
  name: "Room Booking Card Left",
  inputs: roomBookingParameters,
});
Builder.registerComponent(RoomBookingCardRight, {
  name: "Room Booking Card Right",
  inputs: roomBookingParameters,
});

// room booking cards
Builder.register('insertMenu', {
  name: 'Room Booking Cards',
  items: [
    { name: 'Room Booking Card Left' },
    { name: 'Room Booking Card Right' },
  ],
});

// information cards
Builder.register('insertMenu', {
  name: 'Information Cards',
  items: [
    {name: 'Information Card Title'},
    { name: 'Light Green Information Card' },
    { name: 'Dark Green Information Card' },
    { name: 'Information Card With Button' },
  ],
});

// program cards
Builder.register('insertMenu', {
  name: 'Program Cards',
  items: [
    { name: 'Dark Green Program Card' },
    { name: 'Medium Green Program Card' },
    { name: 'Light Green Program Card' },
  ],
});
