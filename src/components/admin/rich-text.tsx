"use client"; // Registers this component as client-side only
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react"; // Import necessary types and hooks
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";

export default function Editor() {
  // Create a new editor instance
  const editor = useCreateBlockNote();
  
  // State to store the HTML output
  const [htmlContent, setHtmlContent] = useState('');

  // Function to extract HTML content from the editor's blocks
  const handleExtractHTML = async () => {
    if (editor) {
      // Convert blocks to HTML using blocksToHTMLLossy
      const HTMLFromBlocks = await editor.blocksToHTMLLossy(); // Use await to resolve the Promise
      // Update the state with the generated HTML
      setHtmlContent(HTMLFromBlocks);
    }
  };

  return (
    <div>
      {/* Render the BlockNote editor */}
      <BlockNoteView editor={editor} />

      {/* Button to trigger HTML extraction */}
      <button onClick={handleExtractHTML} style={{ marginTop: '10px' }}>
        Extract HTML
      </button>

      {/* Display the extracted HTML */}
      <div style={{ marginTop: '20px' }}>
        <h3>Extracted HTML:</h3>
        <pre>{htmlContent}</pre>
      </div>
    </div>
  );
}
