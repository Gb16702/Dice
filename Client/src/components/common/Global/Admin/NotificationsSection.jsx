"use cloent"

const NotificationSection = () => {

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-adminBgAlt rounded-md">
      test
      <div
        className="bg-red-400 w-[100px] h-[100px]"
        onClick={handleClick}
      ></div>
    </div>
  );
};

export default NotificationSection;
