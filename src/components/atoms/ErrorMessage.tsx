import React from "react";

const ErrorMessage = ({ error }: { error?: string }) => {
  return <p className="text-[#F9F9F9] w-[90%] font-normal text-[12px] mt-2 ">{error}</p>;
};


export default ErrorMessage;
