import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import InputArea from "../../Components/InputArea";
const CreateAvatar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed bottom-2">
        <InputArea avatar={true} />
      </div>
    </div>
  );
};
export default CreateAvatar;
