import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice.js";
import { BASE_PATH } from "./store/constants.js";
import Plans from "./pages/Plans.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import { getChats } from "./store/slices/chatSlice.js";
import NewChat from "./Features/newchat/NewChat.jsx";
import Chat from "./Features/chat/Chat.jsx";
import MediaLayout from "./layouts/MediaLayout.jsx";
import CreatePage from "./Features/MediaGen/CreatePage.jsx";
import Explore from "./Features/MediaGen/Explore.jsx";
import ExploreImages from "./Features/MediaGen/ExploreImages.jsx";
import ExploreVideos from "./Features/MediaGen/ExploreVideos.jsx";
import MyMedia from "./Features/MediaGen/MyMedia.jsx";
import FavMedia from "./Features/MediaGen/FavMedia.jsx";
import AvatarLayout from "./layouts/AvatarLayout.jsx";

const router = createBrowserRouter([
  {
    path: `${BASE_PATH}`,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <NewChat />,
      },
      {
        path: "c/:chatId",
        element: <Chat />,
      },
    ],
  },
  {
    path: `${BASE_PATH}/gen`,
    element: <MediaLayout />,
    children: [
      {
        index: true,
        element: <Explore />,
      },
      {
        path: `create`,
        element: <CreatePage />,
      },
      {
        path: `explore`,
        element: <Explore />,
      },
      {
        path: `explore/images`,
        element: <ExploreImages />,
      },
      {
        path: `explore/videos`,
        element: <ExploreVideos />,
      },
      {
        path: `my-media`,
        element: <MyMedia />,
      },
      {
        path: `favorites`,
        element: <FavMedia />,
      },
    ],
  },
  {
    path: `${BASE_PATH}/avatar`,
    element: <AvatarLayout />,
    children: [
      {
        index: true,
        element: <CreatePage />,
      },
    ],
  },

  {
    path: `${BASE_PATH}/login`,
    element: <Login />,
  },

  {
    path: `${BASE_PATH}/plans`,
    element: <Plans />,
  },
]);
export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(getChats(user.id));
    }
  }, [user]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
