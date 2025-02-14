// 'use client';

// import { MdLightMode, MdDarkMode } from 'react-icons/md';
// import './DarkModeSwitch.css'; 
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// const DarkModeSwitch: React.FC = () => {
//     const { theme, setTheme, systemTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);
//     const currentTheme = theme === 'system' ? systemTheme : theme;
  
//     useEffect(() => setMounted(true), []);
  
//     return (
//       <div>
//         {mounted &&
//           (currentTheme === 'dark' ? (
//             <MdLightMode
//               onClick={() => setTheme('light')}
//               className="theme-icon"
//             />
//           ) : (
//             <MdDarkMode
//               onClick={() => setTheme('dark')}
//               className="theme-icon"
//             />
//           ))}
//       </div>
//     );
//   };
  
//   export default DarkModeSwitch;