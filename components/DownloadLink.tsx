const Download = ({ name, href, type }) => {
  return (
    <a href={href} download style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className="flex items-center w-full space-x-4 p-1 pl-2 pr-2 rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-200 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:bg-surface0 dark:hover:bg-surface0-dark mt-5 mb-5" style={{ borderColor: 'rgb(125, 125, 125)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{ width: '20.8px', height: '20.8px' }}>
          <path fill="currentColor" fillRule="evenodd" d="M7.328 2.32a3.006 3.006 0 0 1 4.328 0 3.169 3.169 0 0 1 0 4.4l-4.681 4.81a1.803 1.803 0 0 1-2.594 0 1.885 1.885 0 0 1 0-2.619l4.82-4.952a.6.6 0 0 1 .86.837L5.24 9.748a.685.685 0 0 0 0 .945c.243.25.63.25.874 0l4.681-4.81c.73-.751.73-1.976 0-2.727a1.806 1.806 0 0 0-2.608 0l-4.68 4.81a3.253 3.253 0 0 0 0 4.509 3.008 3.008 0 0 0 4.34 0l5.722-5.88a.6.6 0 0 1 .86.837l-5.721 5.88a4.208 4.208 0 0 1-6.062 0c-1.663-1.71-1.663-4.473 0-6.182l4.681-4.81Z"></path>
        </svg>
        <div>
          <p className="text-base font-bold text-gray-800 m-1.5">{name}</p>
          <p className="text-base font-medium text-gray-500 m-1.5">{type}</p>
        </div>
      </div>
    </a>
  );
};

export default Download;

