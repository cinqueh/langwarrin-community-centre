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

import homeimage from "./components/home-image/home-image";
import WhiteFeatureCard from "./components/feature-card/feature-card";
import {
  WhiteNewsCard,
  GreenNewsCard,
} from "./components/news-section/news-scetion";
import ContactUs from "./components/contact-us/contact-us-card";
import MainBanner from "./components/main-banner/main-banner";
import { GreenTitleCard } from "./components/title-card/title-card";
import { FacebookEmbed } from "./components/facebook-card/facebook-card";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Header parameters
export const headerInputs = [
  {
    name: "logoUrl",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
    helperText: "Upload the logo image.",
  },
  {
    name: "logoAlt",
    type: "string",
    defaultValue: "Langwarrin Community Centre Logo",
    helperText: "Enter the alternative text for the logo.",
  },
  {
    name: "navItems",
    type: "list",
    subFields: [
      {
        name: "label",
        type: "string",
        defaultValue: "Home",
        helperText: "Enter the label for the navigation item.",
      },
      {
        name: "link",
        type: "url",
        defaultValue: "#",
        helperText: "Enter the link for the navigation item.",
      },
    ],
    helperText: "Add multiple navigation items.",
  },
  {
    name: "membershipText",
    type: "string",
    defaultValue: "Become a Member",
    helperText: "Enter the text for the membership button.",
  },
];

// Footer parameters
export const footerInputs = [
  {
    name: "contactTitle",
    type: "string",
    defaultValue: "Contact Us",
    helperText: "Enter the title for the contact section.",
  },
  {
    name: "contactPhone",
    type: "string",
    defaultValue: "123-456-7890",
    helperText: "Enter the contact phone number.",
  },
  {
    name: "contactEmail",
    type: "string",
    defaultValue: "info@example.com",
    helperText: "Enter the contact email address.",
  },
  {
    name: "contactButtonText",
    type: "string",
    defaultValue: "Get In Touch",
    helperText: "Enter the text for the contact button.",
  },
  {
    name: "logoText",
    type: "string",
    defaultValue: "Company Logo",
    helperText: "Enter the logo text.",
  },
  {
    name: "subText",
    type: "string",
    defaultValue: "Empowering the community",
    helperText: "Enter the subtext for the logo section.",
  },
  {
    name: "memberButtonText",
    type: "string",
    defaultValue: "Become a Member",
    helperText: "Enter the text for the membership button.",
  },
  {
    name: "addressTitle",
    type: "string",
    defaultValue: "Address",
    helperText: "Enter the title for the address section.",
  },
  {
    name: "addressLine",
    type: "string",
    defaultValue: "123 Main St",
    helperText: "Enter the first address line.",
  },
  {
    name: "openingDays",
    type: "string",
    defaultValue: "Monday to Friday",
    helperText: "Enter the days open.",
  },
  {
    name: "openingTimes",
    type: "string",
    defaultValue: "9:00am - 4:00pm",
    helperText: "Enter the time open.",
  },
  {
    name: "copyrightText",
    type: "string",
    defaultValue: "© 2024 Company Name. All rights reserved.",
    helperText: "Enter the copyright text.",
  },
];

// Programs card parameters
const newsCardParameters = [
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
  { name: "description", type: "string", defaultValue: "Description" },
];

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
// BackgroundSection Parameters
const backgroundSectionParameters = [
  {
    name: "imageUrl",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
    helperText: "Upload the background image.",
  },
  {
    name: "altText",
    type: "string",
    defaultValue: "Langwarrin Community Centre Background",
    helperText: "Enter the alternative text for the image.",
  },
];

// ContactUs Parameters
const contactUsParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Contact Us",
    helperText: "Enter the title for the form.",
  },
  {
    name: "subtitle",
    type: "string",
    defaultValue:
      "Got any suggestions or questions? Fill this form to reach out.",
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
];

// MainBanner Parameters
const mainBannerParameters = [
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
];

// Register components
// Header
// Register Header component with the section model
Builder.registerComponent(Header, {
  name: "Header",
  inputs: headerInputs,
});

// Register Footer component with the section model
Builder.registerComponent(Footer, {
  name: "Footer",
  inputs: footerInputs,
});

// homepage components

// Register MainBanner component
Builder.registerComponent(MainBanner, {
  name: "MainBanner",
  inputs: mainBannerParameters,
});
// Register BackgroundSection component
Builder.registerComponent(homeimage, {
  name: "BackgroundSection",
  inputs: backgroundSectionParameters,
});
// Register ContactUs component
Builder.registerComponent(ContactUs, {
  name: "ContactUs",
  inputs: contactUsParameters,
});
Builder.registerComponent(WhiteFeatureCard, {
  name: "White Feature Card",
  inputs: programCardParameters,
});
Builder.registerComponent(GreenTitleCard, {
  name: "Green Title Card",
  inputs: titleCardParameters,
});
Builder.registerComponent(GreenNewsCard, {
  name: "Green News Card",
  inputs: newsCardParameters,
});

Builder.registerComponent(WhiteNewsCard, {
  name: "White News Card",
  inputs: newsCardParameters,
});

Builder.registerComponent(FacebookEmbed, {
  name: "Facebook Embed",
});

// Programs components
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
Builder.register("insertMenu", {
  name: "Room Booking Cards",
  items: [
    { name: "Room Booking Card Left" },
    { name: "Room Booking Card Right" },
  ],
});

// information cards
Builder.register("insertMenu", {
  name: "Information Cards",
  items: [
    { name: "Information Card Title" },
    { name: "Light Green Information Card" },
    { name: "Dark Green Information Card" },
    { name: "Information Card With Button" },
  ],
});

// program cards
Builder.register("insertMenu", {
  name: "Program Cards",
  items: [
    { name: "Dark Green Program Card" },
    { name: "Medium Green Program Card" },
    { name: "Light Green Program Card" },
  ],
});
