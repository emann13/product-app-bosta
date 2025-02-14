"use client";
import "./page.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-heading">About</h1>

      <p className="about-paragraph">
        This product app is built with **Next.js** because my resume already highlights my experience with React.js.  
        so I wanted to prove my ability to take new chanllenges. Next.js allows me to improve **performance, SEO, and server-side rendering (SSR)**, making the app faster and more efficient.
      </p>

      <p className="about-paragraph">
        The app helps users **browse and discover products easily**. It includes smooth **animations** when adding or removing items  
        from the cart and when opening product details, making the experience more engaging.
      </p>

      <p className="about-paragraph">
        Since Bun doesn't fully support Next.js's default **Image** component, I built a **custom Image component**  
        that provides **a fallback for missing images** and adapts its size and style based on usage.
      </p>

      <p className="about-paragraph">
        For accessibility, I avoided using `.stopPropagation()` or `.preventDefault()` in the cart icon inside product cards.  
        This ensures better support for **screen readers and keyboard navigation**, following **WCAG** best practices.
      </p>

      <p className="about-paragraph">
        API calls are handled separately to **leverage SSR** and improve performance. I also avoided using `"use client"`  
        in several pages where it wasn’t needed to keep rendering efficient.
      </p>
      <p className="about-paragraph">
      TypeScript could not find a declaration file for react-star-ratings, causing a presistant error soCreated a custom type declaration file for react-star-ratings.
    
      </p>
      <p className="about-paragraph">
        Built with performance, accessibility, and user experience in mind, this app is designed to make product discovery smooth and enjoyable.
      </p>

      <p className="about-paragraph">
        Developed by Eman Ouda for Bosta.
      </p>
    </div>
  );
}
