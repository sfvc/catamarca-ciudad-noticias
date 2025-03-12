import { useState } from "react";

export const BtnLectura = () => {

      const [isReading, setIsReading] = useState(false);
    
      // Function to handle the text-to-speech functionality
      const handleReadAloud = () => {
        const content = document.querySelector('.news').innerText; // Get the text content of the article section
    
        // If it's already reading, stop it
        if (isReading) {
          speechSynthesis.cancel(); // Stops the current speech
          setIsReading(false);
        } else {
          const utterance = new SpeechSynthesisUtterance(content); // Create a new SpeechSynthesisUtterance
          utterance.lang = 'es-ES'; // Set the language (Spanish in this case)
          utterance.rate = 1; // Speed of the speech (1 is normal speed)
          utterance.pitch = 1; // Pitch of the speech (1 is normal pitch)
    
          // Speak the content
          speechSynthesis.speak(utterance);
          setIsReading(true); // Set the state to reading
        }
      };
    return ( 
        <button className="toolbar__btn" onClick={handleReadAloud}>
            {isReading ? 'P' : 'L'}
        </button>
     );
}