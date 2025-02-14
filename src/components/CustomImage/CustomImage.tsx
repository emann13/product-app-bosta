"use client";

interface CustomImageProps {
  src: string; 
  alt: string;
  width: string; 
  height: string;
  type: string;
}

export default function CustomImage({ src, alt, width, height, type }: CustomImageProps) {
  const imgAlt = "../assets/p.png";
  return (
    <img
      className="elevate-image"
      src={src || imgAlt}
      alt={alt}
      width={width}
      height={height}
      style={{
        objectFit: 'cover',
        borderRadius: '8px',
        width: "100%",
        height: "100%", 
        maxHeight: type === "card" ? "185px" : "70%", 
        maxWidth: type === "card" ? "" : "70%"

      }} 
    />
  );
}
