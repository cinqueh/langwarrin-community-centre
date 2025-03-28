"use client";
import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent, builder } from "@builder.io/sdk";
import "../builder-registry";
import "../styles/global.css";
import { Prompt } from "next/font/google";
import { Custom404 } from "./404-page/custom-404";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
        <BuilderComponent model="header" />
        <div className={`pageContainer ${prompt.className}`}>
          <BuilderComponent content={content} model={model} />
        </div>
        <BuilderComponent model="footer" />
      </>
    );
  }
  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // custom 404 page.
  return (
    <>
      <BuilderComponent model="header" />
      <div className={`pageContainer ${prompt.className}`}>
      <Custom404 />
      </div>
      <BuilderComponent model="footer" />
    </>
  );
}
