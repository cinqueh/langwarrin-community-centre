"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent, builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";
import "../styles/global.css";
import Header from "./layout/header";

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export function RenderBuilderContent({ content, model }: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  // TODO: this is a temp fix add css styles here
  if (content || isPreviewing) {
    return (
      <>
        {/* <BuilderComponent model="header"/> */}
        <Header logoUrl="/images/templogo.png" logoAlt="Langwarrin CC Logo" navItems={[
          {label: "Programs", link: "/programs"},
          {label: "Children", link: "/children"},
          {label: "Room Hire", link: "/room-bookings"},
          {label: "Forms", link: "/"},
          {label: "About", link: "/about-us"},
        ]} membershipText="Become a Member!"></Header>
        <div className="pageContainer">
          <BuilderComponent content={content} model={model} />
        </div>
        <BuilderComponent model="footer"/>
      </>
    );
  }
  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />;
}
