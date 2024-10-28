"use client"; // Ensure client-side rendering

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react"; // Import BlockNote editor
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import styles from "./email-form.module.css"; // Import styles

export default function EmailForm() {
  const [emails, setEmails] = useState<string[]>([]); // For storing multiple email addresses
  const [emailInput, setEmailInput] = useState(""); // For the current email input field
  const [subject, setSubject] = useState(""); // For storing email subject
  const [htmlContent, setHtmlContent] = useState(""); // For storing email content as HTML

  const editor = useCreateBlockNote(); // Initialize the BlockNote editor

  // Add a new email to the list
  const handleAddEmail = () => {
    if (emailInput && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput(""); // Clear input after adding
    }
  };

  // Remove an email from the list
  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  // Extract HTML content from the BlockNote editor
  const handleExtractHTML = async () => {
    if (editor) {
      const HTMLFromBlocks = await editor.blocksToHTMLLossy(); // Convert content to HTML
      setHtmlContent(HTMLFromBlocks); // Store the HTML in state
      return HTMLFromBlocks;
    }
    return "";
  };

  // Send email function
  const handleSendEmail = async () => {
    const extractedHTML = await handleExtractHTML(); // Extract HTML content first
    const strippedContent = extractedHTML.replace(/<[^>]+>/g, '').trim();

    const verificationConditions = [
      { check: emails.length === 0, message: "Please enter at least one email." },
      { check: subject.trim() === "", message: "Please enter a subject." },
      { check: strippedContent === "", message: "Please enter an email body." }
    ]

    for (const condition of verificationConditions) {
      if (condition.check) {
        alert(condition.message);
        return;
      }
    }

    // Confirm before sending the email
    const confirmed = window.confirm(`Are you sure you want to send this email to ${emails.length} people?`);

    if (confirmed) {
      const emailData = {
        recipients: emails,
        subject: subject,
        body: extractedHTML,
      };

      try {
        const response = await fetch('/api/admin/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });
  
        if (!response.ok) {
          alert('An error occurred while sending the email. Please try again later.');
        } else {
          alert('Email sent successfully!');
        }
      } catch (error) {
        alert('An error occurred while sending the email. Please try again later.');
      }

    }
  };

  return (
    <div className={styles.content}>
      {/* Email input for multiple addresses */}
      <div className={styles.emailInputContainer}>
        <label className={styles.label}>Emails</label>
        <div className={styles.emailList}>
          {emails.map((email, index) => (
            <div key={index} className={styles.emailChip}>
              {email}
              <button type="button" onClick={() => handleRemoveEmail(email)} className={styles.removeEmailButton}>
                &times;
              </button>
            </div>
          ))}
        </div>

        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter email and press enter"
          onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
          className={styles.emailInput}
        />
      </div>

      {/* Subject input */}
      <div className={styles.subjectInputContainer}>
        <label className={styles.label}>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          className={styles.subjectInput}
        />
      </div>

      {/* BlockNote Rich Text Editor */}
      <div className={styles.editorContainer}>
        <label className={styles.label}>Email Content</label>
        <div className={styles.editorBox}>
            <BlockNoteView editor={editor} />
        </div>
      </div>

      {/* Send email button */}
      <button onClick={handleSendEmail} className={styles.sendButton}>
        Send Email
      </button>
    </div>
  );
}
