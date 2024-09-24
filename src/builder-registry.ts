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

import homeimage from "./components/homeimage/homeimage";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import NewsSection from "./components/NewsSection/NewsSection";
import ContactUs from "./components/ContactUs/contactUs";
import MainBanner from "./components/MainBanner/main-banner";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Programs card parameters
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

const programCardParameters = [
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
    type: "richText",
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


// Room booking card parameters
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


// Homepage card parameters
Builder.registerComponent(homeimage, {
  name: "BackgroundSection",
  inputs: [
    {
      name: "imageUrl",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue: "/images/homeimagegreen.png", // Default image path
      helperText: "Upload the background image.",
    },
    {
      name: "altText",
      type: "string",
      defaultValue: "Langwarrin Community Centre Background",
      helperText: "Enter the alternative text for the image.",
    },
  ],
});

Builder.registerComponent(FeatureCard, {
  name: "FeatureCard",
  inputs: [
    {
      name: "features",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
          defaultValue: "Feature Title",
          helperText: "Enter the title of the feature.",
        },
        {
          name: "imageUrl",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          defaultValue: "/images/Programs.png", // Provide a default image path
          helperText: "Upload the feature image.",
        },
        {
          name: "altText",
          type: "string",
          defaultValue: "Feature Image",
          helperText: "Enter the alternative text for the image.",
        },
        {
          name: "buttonText",
          type: "string",
          defaultValue: "Learn More",
          helperText: "Enter the text for the button.",
        },
      ],
      defaultValue: [
        {
          title: "Programs",
          imageUrl: "/images/Programs.png",
          altText: "Programs",
          buttonText: "Learn More",
        },
        {
          title: "Childcare",
          imageUrl: "/images/Childcare.png",
          altText: "Childcare",
          buttonText: "Learn More",
        },
        {
          title: "Community",
          imageUrl: "/images/Community.png",
          altText: "Community",
          buttonText: "Learn More",
        },
      ],
    },
  ],
});

// Register the NewsSection component with Builder.io
Builder.registerComponent(NewsSection, {
  name: "News Section",
  inputs: [
    {
      name: "newsItems",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
          defaultValue: "News Title",
          helperText: "Enter the title of the news section.",
        },
        {
          name: "content",
          type: "string",
          defaultValue: "Enter brief description about the event/news here.",
          helperText: "Enter the content of the news section.",
        },
        {
          name: "imageUrl",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          helperText: "Upload the image for this news item.",
        },
        {
          name: "altText",
          type: "string",
          defaultValue: "News Image",
          helperText: "Enter the alternative text for the image for accessibility.",
        },
      ],
      defaultValue: [
        {
          title: "News Title 1",
          content: "Enter brief description about the event/news here.",
          imageUrl: "", // Default empty, you can set a sample image if needed
          altText: "News Image 1",
        },
        {
          title: "News Title 2",
          content: "Enter brief description about the event/news here.",
          imageUrl: "",
          altText: "News Image 2",
        },
        {
          title: "News Title 3",
          content: "Enter brief description about the event/news here.",
          imageUrl: "",
          altText: "News Image 3",
        },
      ],
    },
  ],
});

Builder.registerComponent(ContactUs, {
  name: "ContactUs",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Contact Us",
      helperText: "Enter the title for the form.",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "Got any suggestions or questions? Fill this form to reach out.",
      helperText: "Enter the subtitle text for the form.",
    },
    {
      name: "firstNamePlaceholder",
      type: "string",
      defaultValue: "First Name",
      helperText: "Placeholder text for the First Name input.",
    },
    {
      name: "familyNamePlaceholder",
      type: "string",
      defaultValue: "Family Name",
      helperText: "Placeholder text for the Family Name input.",
    },
    {
      name: "emailPlaceholder",
      type: "string",
      defaultValue: "Enter your email",
      helperText: "Placeholder text for the Email input.",
    },
    {
      name: "mobilePlaceholder",
      type: "string",
      defaultValue: "Mobile",
      helperText: "Placeholder text for the Mobile input.",
    },
    {
      name: "subjectPlaceholder",
      type: "string",
      defaultValue: "What is it about?",
      helperText: "Placeholder text for the subject select input.",
    },
    {
      name: "messagePlaceholder",
      type: "string",
      defaultValue: "Enter your message",
      helperText: "Placeholder text for the Message textarea.",
    },
    {
      name: "sendButtonText",
      type: "string",
      defaultValue: "SEND",
      helperText: "Text for the Send button.",
    },
    {
      name: "imageSrc",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      helperText: "Upload the image for the right-side section.",
    },
    {
      name: "imageAlt",
      type: "string",
      defaultValue: "Side Image",
      helperText: "Alt text for the image.",
    },
  ],
});

// Register the MainBanner component with Builder.io
Builder.registerComponent(MainBanner, {
  name: "MainBanner",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "LANGWARRIN",
      helperText: "Edit the main title of the banner.",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "Community Centre",
      helperText: "Edit the subtitle of the banner.",
    },
    {
      name: "subText",
      type: "string",
      defaultValue: "Lifelong learning & Community Participation",
      helperText: "Edit the subtitle text of the banner.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "Become a member",
      helperText: "Edit the button text.",
    },
    {
      name: "note",
      type: "string",
      defaultValue:
        "Sign up now to get regular updates about all our events and programs!",
      helperText: "Edit the note below the button.",
    },
  ],
});

// Register components

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
  inputs: programCardParameters,
});

Builder.registerComponent(LightGreenProgramCard, {
  name: "Light Green Program Card",
  inputs: programCardParameters,
});

Builder.registerComponent(MediumGreenProgramCard, {
  name: "Medium Green Program Card",
  inputs: programCardParameters,
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
