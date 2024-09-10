import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const builderModelName = "page";

  const content = await builder
    // get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
        timestamp: Date.now()
      }
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <Header/>
      <RenderBuilderContent content={content} model={builderModelName} />
      <Footer/>
    </>
  );
}
