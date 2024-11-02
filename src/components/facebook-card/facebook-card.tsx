import React from "react";
import styles from "./styles.module.css";

interface FacebookEmbedProps {
  href: string;
  width?: string;
  height?: string;
}

const FacebookEmbed: React.FC<FacebookEmbedProps> = ({
  href = "https://www.facebook.com/LangwarrinCommunityCentreInc",
  width = "800",
  height = "850",
}) => {
  return (
    <div className={styles.facebookEmbedContainer}>
      <iframe
        src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
          href
        )}&tabs=timeline&width=${width}&height=${height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId`}
        width={width}
        height={height}
        className={styles.facebookEmbedIframe}
        style={{ border: "none", overflow: "hidden" }}
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export { FacebookEmbed };