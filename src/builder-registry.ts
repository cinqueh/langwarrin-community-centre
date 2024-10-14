"use client";
import { builder, Builder } from "@builder.io/react";
import { FacebookEmbed } from "./components/facebook-card/facebook-card";
import Footer from "./components/layout/footer";
import {
  FormDownloadCard,
  DarkGreenProgramCard,
  MediumGreenProgramCard,
  LightGreenProgramCard,
  divider,
} from "./components/programs/programs-card";
import { GovernmentCard } from "./components/government-card/government-card";
import {
  GreenTitleCard,
  TitleCard,
  TitleCardWithBackButton,
} from "./components/title-card/title-card";
import Header from "./components/layout/header";
import homeimage from "./components/home-image/home-image";
import {
  LightGreenInformationCardTitle,
  DarkGreenInformationCardTitle,
  DarkGreenInformationCard,
  MediumGreenInformationCard,
  LightGreenInformationCard,
  WhiteInformationCard,
  InformationCardWithButton,
} from "./components/information-card/information-card";
import MainBanner from "./components/main-banner/main-banner";
import {
  ProgramImageCard,
  ImageCard,
} from "./components/image-card/image-card";
import {
  RoomBookingCardLeft,
  RoomBookingCardRight,
} from "./components/room-booking/room-booking-card";
import WhiteFeatureCard from "./components/feature-card/feature-card";
import {
  WhiteNewsCard,
  GreenNewsCard,
} from "./components/news-section/news-scetion";
import { MembershipForm } from "./components/membership-form/membership-form";
import { ChildcareContactForm } from "./components/childcare-form/childcare-form";
import { ProgressBar } from "./components/progress-bar/progress-bar";
import { RoomDetailsFormForm } from "./components/room-booking-form/room-details-form";
import { AdditionalInfoForm } from "./components/room-booking-form/additional-info-form";
import { PersonalDetailsForm } from "./components/room-booking-form/personal-info-form";
import { ConfirmationForm } from "./components/room-booking-form/confirmation-details";
import { ProgramEnrollmentForm } from "./components/program-form/program-form";
import { ContactForm } from "./components/contact-us/contact-us-card";

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
    defaultValue: "Become a Member!",
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
    name: "contactButtonLink",
    type: "string",
    defaultValue: "/#contactForm",
    helperText: "Enter the URL for the contact button link.",
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
    name: "memberButtonLink",
    type: "string",
    defaultValue: "/membership",
    helperText: "Enter the URL for the membership button link.",
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
    defaultValue: "\u00A9 2024 Company Name. All rights reserved.",
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
  {
    name: "description",
    type: "string",
    defaultValue: "Description",
  },
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "#",
  },
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
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "#",
  },
];

const featureCardParameters = [
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
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "#",
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
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "#",
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
  {
    name: "titleAlignment",
    type: "enum",
    enum: ["left", "center"],
    defaultValue: "left",
    helperText: "Choose the alignment for the title",
  },
  {
    name: "height",
    type: "string",
    defaultValue: "auto",
    helperText: "Set the height of the card, e.g., '300px' or '100%'",
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
  {
    name: "titleAlignment",
    type: "enum",
    enum: ["left", "center"],
    defaultValue: "left",
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
  {
    name: "buttonText",
    type: "string",
    defaultValue: "Request the room",
  },
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "/request-a-room/room-details-form",
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
    name: "linkUrl",
    type: "string",
    defaultValue: "/membership",
    helperText: "Enter the URL for the button link.",
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
Builder.registerComponent(TitleCardWithBackButton, {
  name: "Title Card With Back Button",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Page Title",
      helperText: "Edit the title for the card.",
    },
    {
      name: "backLink",
      type: "string",
      defaultValue: "/",
      helperText: "Enter the URL for the back button link.",
    },
  ],
});

const partnershipSectionParameters = [
  {
    name: "title",
    type: "string",
    defaultValue: "Our Partnership",
    helperText: "Title of the partnership section",
  },
  {
    name: "description",
    type: "string",
    defaultValue: "We are proud to partner with...",
    helperText: "Description of the partnership",
  },
  {
    name: "imageUrl",
    type: "file",
    allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
    helperText: "Upload the logo/image for the partnership",
  },
  {
    name: "altText",
    type: "string",
    defaultValue: "Partner Logo",
    helperText: "Alternative text for the image",
  },
];
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

Builder.registerComponent(WhiteFeatureCard, {
  name: "White Feature Card",
  inputs: featureCardParameters,
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

Builder.registerComponent(DarkGreenInformationCardTitle, {
  name: "Dark Green Information Card Title",
  inputs: informationCardTitleParameters,
});
// Programs components

const informationCardWithButtonParameters = [
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
  {
    name: "buttonText",
    type: "string",
    defaultValue: "Book Online Now",
  },
  {
    name: "linkUrl",
    type: "string",
    defaultValue: "#",
  },
];

Builder.registerComponent(InformationCardWithButton, {
  name: "Information Card With Button",
  inputs: informationCardWithButtonParameters,
});

Builder.registerComponent(DarkGreenInformationCard, {
  name: "Dark Green Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(MediumGreenInformationCard, {
  name: "Medium Green Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(LightGreenInformationCard, {
  name: "Light Green Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(WhiteInformationCard, {
  name: "White Information Card",
  inputs: informationCardParameters,
});

Builder.registerComponent(divider, {
  name: "Divider",
});

Builder.registerComponent(ProgramImageCard, {
  name: "Program Image Card (with padding)",
  inputs: programImageCardParameters,
});

Builder.registerComponent(ImageCard, {
  name: "Image Card (without padding)",
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

Builder.registerComponent(LightGreenInformationCardTitle, {
  name: "Light Green Information Card Title",
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
// Register the component in Builder.io

Builder.registerComponent(GovernmentCard, {
  name: "GovernmentCard",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Government Partnership",
      helperText: "Enter the title for the card",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Supporting Initiatives",
      helperText: "Enter the subheading",
    },
    {
      name: "image1",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the first image",
    },
    {
      name: "altText1",
      type: "string",
      defaultValue: "Image 1 Alt Text",
      helperText: "Enter alt text for the first image",
    },
    {
      name: "image2",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the second image",
    },
    {
      name: "altText2",
      type: "string",
      defaultValue: "Image 2 Alt Text",
      helperText: "Enter alt text for the second image",
    },
    {
      name: "image3",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the third image",
    },
    {
      name: "altText3",
      type: "string",
      defaultValue: "Image 3 Alt Text",
      helperText: "Enter alt text for the third image",
    },
    {
      name: "image4",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the fourth image",
    },
    {
      name: "altText4",
      type: "string",
      defaultValue: "Image 4 Alt Text",
      helperText: "Enter alt text for the fourth image",
    },
    {
      name: "image5",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the fifth image",
    },
    {
      name: "altText5",
      type: "string",
      defaultValue: "Image 5 Alt Text",
      helperText: "Enter alt text for the fifth image",
    },
    {
      name: "image6",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png"],
      helperText: "Upload the sixth image",
    },
    {
      name: "altText6",
      type: "string",
      defaultValue: "Image 6 Alt Text",
      helperText: "Enter alt text for the sixth image",
    },
    {
      name: "list",
      type: "richText",
      helperText: "Enter the list of initiatives",
    },
  ],
});

export const membershipFormInputs = [
  {
    name: "title",
    type: "string",
    defaultValue: "Membership Form",
    helperText: "Enter the title for the membership form.",
  },
  {
    name: "subtitle",
    type: "string",
    defaultValue: "Join us today!",
    helperText: "Enter the subtitle for the form.",
  },
  {
    name: "subtitle2",
    type: "string",
    defaultValue: "We are excited to have you.",
    helperText: "Enter the secondary subtitle for the form.",
  },
  {
    name: "firstNamePlaceholder",
    type: "string",
    defaultValue: "First Name",
    helperText: "Enter the placeholder text for the first name input.",
  },
  {
    name: "lastNamePlaceholder",
    type: "string",
    defaultValue: "Last Name",
    helperText: "Enter the placeholder text for the last name input.",
  },
  {
    name: "emailPlaceholder",
    type: "string",
    defaultValue: "Email",
    helperText: "Enter the placeholder text for the email input.",
  },
  {
    name: "mobilePlaceholder",
    type: "string",
    defaultValue: "Mobile",
    helperText: "Enter the placeholder text for the mobile input.",
  },
  {
    name: "homePhonePlaceholder",
    type: "string",
    defaultValue: "Home Phone",
    helperText: "Enter the placeholder text for the home phone input.",
  },
  {
    name: "occupationPlaceholder",
    type: "string",
    defaultValue: "Occupation",
    helperText: "Enter the placeholder text for the occupation input.",
  },
  {
    name: "apartmentPlaceholder",
    type: "string",
    defaultValue: "Apartment, Unit No., Suite, etc (Optional)",
    helperText: "Enter the placeholder text for the apartment input.",
  },
  {
    name: "addressPlaceholder",
    type: "string",
    defaultValue: "Address",
    helperText: "Enter the placeholder text for the address input.",
  },
  {
    name: "suburbPlaceholder",
    type: "string",
    defaultValue: "Suburb",
    helperText: "Enter the placeholder text for the suburb input.",
  },
  {
    name: "statePlaceholder",
    type: "string",
    defaultValue: "State",
    helperText: "Enter the placeholder text for the state input.",
  },
  {
    name: "postcodePlaceholder",
    type: "string",
    defaultValue: "Postcode",
    helperText: "Enter the placeholder text for the postcode input.",
  },
  {
    name: "submitButtonText",
    type: "string",
    defaultValue: "Submit",
    helperText: "Enter the text for the submit button.",
  },
  {
    name: "checkboxLabel",
    type: "richText",
    defaultValue:
      "Yes, I agree to collection, use, and processing of my personal information which includes using this information for communication, event invitations, and regular membership updates. ",
  },
];

Builder.registerComponent(MembershipForm, {
  name: "Membership Form",
  inputs: membershipFormInputs,
});

const childcareFormInputs = [
  {
    name: "title",
    type: "string",
    defaultValue: "Childcare Form",
    helperText: "Enter the title for the childcare form.",
  },
  {
    name: "subtitle",
    type: "string",
    defaultValue: "Enquire now!",
    helperText: "Enter the subtitle for the form.",
  },
  {
    name: "firstNamePlaceholder",
    type: "string",
    defaultValue: "First Name",
    helperText: "Enter the placeholder text for the first name input.",
  },
  {
    name: "lastNamePlaceholder",
    type: "string",
    defaultValue: "Last Name",
    helperText: "Enter the placeholder text for the last name input.",
  },
  {
    name: "emailPlaceholder",
    type: "string",
    defaultValue: "Email",
    helperText: "Enter the placeholder text for the email input.",
  },
  {
    name: "mobilePlaceholder",
    type: "string",
    defaultValue: "Mobile",
    helperText: "Enter the placeholder text for the mobile input.",
  },
  {
    name: "homePhonePlaceholder",
    type: "string",
    defaultValue: "Home Phone",
    helperText: "Enter the placeholder text for the home phone input.",
  },
  {
    name: "occupationPlaceholder",
    type: "string",
    defaultValue: "Occupation",
    helperText: "Enter the placeholder text for the occupation input.",
  },
  {
    name: "childFirstNamePlaceholder",
    type: "string",
    defaultValue: "Child's First Name",
    helperText: "Enter the placeholder text for the child's first name input.",
  },
  {
    name: "childLastNamePlaceholder",
    type: "string",
    defaultValue: "Child's Last Name",
    helperText: "Enter the placeholder text for the child's last name input.",
  },
  {
    name: "programPlaceholder",
    type: "string",
    defaultValue: "Program",
    helperText: "Enter the placeholder text for the program input.",
  },
  {
    name: "messagePlaceholder",
    type: "string",
    defaultValue: "Message",
    helperText: "Enter the placeholder text for the message input.",
  },
  {
    name: "submitButtonText",
    type: "string",
    defaultValue: "Submit",
    helperText: "Enter the text for the submit button.",
  },
];

Builder.registerComponent(ChildcareContactForm, {
  name: "Childcare Form",
  inputs: childcareFormInputs,
});

Builder.registerComponent(ProgressBar, {
  name: "ProgressBar",
  inputs: [
    {
      name: "steps",
      type: "list",
      defaultValue: [{ label: "Step Label", link: "/room-details" }],
      subFields: [
        {
          name: "label",
          type: "string",
          defaultValue: "Step Label",
          helperText: "The label for the step.",
        },
        {
          name: "link",
          type: "url",
          helperText: "The URL the step should link to.",
        },
      ],
    },
    {
      name: "currentStepIndex",
      type: "number",
      defaultValue: 1,
      helperText: "The current step in the progress bar.",
    },
  ],
});

Builder.registerComponent(RoomDetailsFormForm, {
  name: "RoomDetailsForm",
  inputs: [
    {
      name: "roomLabel",
      type: "string",
      defaultValue: "Which room are you booking for? *",
      helperText: "Label for the room select field.",
    },
    {
      name: "hireTypeLabel",
      type: "string",
      defaultValue: "Please select your hire type *",
      helperText: "Label for the hire type select field.",
    },
    {
      name: "dateLabel",
      type: "string",
      defaultValue: "Date *",
      helperText: "Label for the date input field.",
    },
    {
      name: "timeLabel",
      type: "string",
      defaultValue: "Time *",
      helperText: "Label for the time input field.",
    },
    {
      name: "linkUrl",
      type: "string",
      defaultValue: "/room-booking-form",
      helperText: "Enter the URL for the button link.",
    },
    {
      name: "hireTypeInfo",
      type: "richText",
      defaultValue: `
        <p><strong>Casual Hirers</strong>: A group/person that makes an irregular or one-off booking.</p>
        <p><strong>Permanent Hirers</strong>: A group/person that makes 8 or more bookings per year.</p>
        <p><strong>Community Groups</strong>: Not for Profit Groups.</p>
      `,
    },
  ],
});

Builder.registerComponent(AdditionalInfoForm, {
  name: "Additional Info Form",
  inputs: [
    {
      name: "fields",
      type: "list",
      defaultValue: [
        { question: "What is your name?", inputType: "text", required: true },
        { question: "What is your age?", inputType: "text", required: true },
      ],
      subFields: [
        {
          name: "question",
          type: "string",
          helperText: "The question to display.",
        },
        {
          name: "inputType",
          type: "enum",
          enum: ["text", "select"],
          helperText: "The input type for the answer.",
        },
        {
          name: "options",
          type: "list",
          subFields: [
            {
              name: "option",
              type: "string",
              helperText: "Enter the options for select input.",
            },
          ],
          showIf: (options: any) => options.get("inputType") === "select",
        },
        {
          name: "required",
          type: "boolean",
          helperText: "Is this field required?",
        },
      ],
    },
    {
      name: "linkUrl",
      type: "string",
      defaultValue: "/",
      helperText: "Enter the URL for the button link.",
    },
  ],
});

Builder.registerComponent(PersonalDetailsForm, {
  name: "PersonalDetailsForm",
  inputs: [
    {
      name: "contactInfoTitle",
      type: "string",
      defaultValue: "Contact Info",
      helperText: "The title of the contact information section.",
    },
    {
      name: "addressInfoTitle",
      type: "string",
      defaultValue: "Address",
      helperText: "The title of the address information section.",
    },
    {
      name: "firstNamePlaceholder",
      type: "string",
      defaultValue: "First Name",
      helperText: "Placeholder text for the first name field.",
    },
    {
      name: "familyNamePlaceholder",
      type: "string",
      defaultValue: "Family Name",
      helperText: "Placeholder text for the family name field.",
    },
    {
      name: "emailPlaceholder",
      type: "string",
      defaultValue: "Email",
      helperText: "Placeholder text for the email field.",
    },
    {
      name: "mobilePlaceholder",
      type: "string",
      defaultValue: "Mobile",
      helperText: "Placeholder text for the mobile field.",
    },
    {
      name: "unitNoPlaceholder",
      type: "string",
      defaultValue: "Unit No. (Optional)",
      helperText: "Placeholder text for the unit number field.",
    },
    {
      name: "streetNamePlaceholder",
      type: "string",
      defaultValue: "Street Name",
      helperText: "Placeholder text for the street name field.",
    },
    {
      name: "cityPlaceholder",
      type: "string",
      defaultValue: "City",
      helperText: "Placeholder text for the city field.",
    },
    {
      name: "postalCodePlaceholder",
      type: "string",
      defaultValue: "ZIP / Postal Code",
      helperText: "Placeholder text for the postal code field.",
    },
    {
      name: "statePlaceholder",
      type: "string",
      defaultValue: "State",
      helperText: "Placeholder text for the state field.",
    },
    {
      name: "linkUrl",
      type: "string",
      defaultValue: "/",
      helperText: "Enter the URL for the button link.",
    },
  ],
});

Builder.registerComponent(ConfirmationForm, {
  name: "ConfirmationForm",
  inputs: [
    {
      name: "termsText",
      type: "richText",
      defaultValue: "Yes, I agree to the Terms and Conditions",
      helperText: "Text for the Terms and Conditions agreement.",
    },
    {
      name: "bondText",
      type: "richText",
      defaultValue: "Yes, I agree to the Bond Agreement",
      helperText: "Text for the Bond Agreement.",
    },
  ],
});

Builder.registerComponent(ProgramEnrollmentForm, {
  name: "Program Enrollment Form",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Sign Up to A Program Now",
      helperText: "Edit the main title of the form.",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "Want to join a program? Fill out this form now.",
      helperText: "Edit the subtitle of the form.",
    },
    {
      name: "programInfoTitle",
      type: "string",
      defaultValue: "Program Information",
      helperText: "Edit the title for the Program Information section.",
    },
    {
      name: "programOptions",
      type: "list",
      subFields: [
        {
          name: "option",
          type: "string",
          defaultValue: "Program 1",
        },
      ],
      helperText: "List of program options to display in the dropdown",
    },
    {
      name: "contactInfoTitle",
      type: "string",
      defaultValue: "Contact Information",
      helperText: "Edit the title for the Contact Information section.",
    },
    {
      name: "addressInfoTitle",
      type: "string",
      defaultValue: "Address Information",
      helperText: "Edit the title for the Address Information section.",
    },
    {
      name: "termsConditionsTitle",
      type: "string",
      defaultValue: "Terms and Conditions of Enrolment",
      helperText: "Edit the title for the Terms and Conditions section.",
    },
    {
      name: "termsConditionsText",
      type: "richText",
      defaultValue: "I agree to the terms and conditions",
      helperText: "Edit the text for the Terms and Conditions section.",
    },
    {
      name: "accessCorrectionTitle",
      type: "string",
      defaultValue: "Access, Correction and Complaints",
      helperText:
        "Edit the title for the Access, Correction and Complaints section.",
    },
    {
      name: "accessCorrectionText",
      type: "richText",
      defaultValue: "I agree to the terms and conditions",
      helperText:
        "Edit the text for the Access, Correction and Complaints section.",
    },
    {
      name: "termsCheckboxLabel",
      type: "string",
      defaultValue:
        "I declare that the information I have provided to the best of my knowledge is true and correct.",
      helperText: "Edit the label for the Terms and Conditions checkbox.",
    },
    {
      name: "promotionCheckboxLabel",
      type: "string",
      defaultValue:
        "I agree to appear in photos and promotion material for the Centre and its services.",
      helperText: "Edit the label for the promotion consent checkbox.",
    },
    {
      name: "ageCheckboxLabel",
      type: "string",
      defaultValue:
        "I declare that I am 18 OR have guardian consent if under 18.",
      helperText: "Edit the label for the age declaration checkbox.",
    },
    {
      name: "linkUrl",
      type: "string",
      defaultValue: "/",
      helperText: "Enter the URL for the button link.",
    },
  ],
});

Builder.registerComponent(ContactForm, {
  name: "ContactForm",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: "Contact Us",
    },
    {
      name: "subtitle",
      type: "text",
      defaultValue:
        "Got any suggestions or questions? Fill this form to reach out.",
    },
    {
      name: "addressTitle",
      type: "text",
      defaultValue: "Address",
    },
    {
      name: "feedbackTitle",
      type: "text",
      defaultValue: "Feedback & Compliments",
    },
    {
      name: "complaintsTitle",
      type: "text",
      defaultValue: "Complaints",
    },
  ],
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
    { name: "Light Green Information Card Title" },
    { name: "Dark Green Information Card Title" },
    { name: "White Information Card" },
    { name: "Light Green Information Card" },
    { name: "Medium Green Information Card" },
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
Builder.register("insertMenu", {
  name: "Image Cards",
  items: [
    { name: "Program Image Card (with padding)" },
    { name: "Image Card (without padding)" },
  ],
});

Builder.register("insertMenu", {
  name: "Custom Forms",
  items: [{ name: "Membership Form" }, { name: "Childcare Form" }],
});

Builder.register("insertMenu", {
  name: "Room Booking Forms",
  items: [
    { name: "ProgressBar" },
    { name: "RoomDetailsForm" },
    { name: "Additional Info Form" },
    { name: "PersonalDetailsForm" },
    { name: "ConfirmationForm" },
  ],
});

Builder.register("insertMenu", {
  name: "Title Cards",
  items: [
    { name: "Green Title Card" },
    { name: "Title Card" },
    { name: "Title Card With Back Button" },
  ],
});
