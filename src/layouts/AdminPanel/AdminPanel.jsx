import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import AddAvatars from "../../views/AdminPanelViews/AddAvatars/AddAvatars.jsx";
import AddHeaders from "../../views/AdminPanelViews/AddHeaders/AddHeaders.jsx";
import AddThemes from "../../views/AdminPanelViews/AddThemes/AddThemes.jsx";
import AllItems from "../../views/AdminPanelViews/AllItems/AllItems.jsx";
import axios from "axios";

export default function AdminPanel(props) {
  const listitemnames = ["addavatars", "addheaders", "addthemes", "allitems"];

  const loggedIn = localStorage.getItem("loggedIn"); //this state stays in Redux
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");
  const pathname = props.location.pathname.split("/");
  const viewname = pathname[1];

  //   const [pending, setPending] = React.useState(0);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    }
  });

  const view = {
    dashboard: <AddAvatars token={token} />,
    addavatars: <AddAvatars token={token} />,
    addheaders: <AddHeaders token={token} />,
    addthemes: <AddThemes token={token} />,
    allitems: <AllItems token={token} />
  };

  if (!loggedIn || token.length === 0) {
    return <Redirect to="/" />;
  } else if (loggedIn && token.length !== 0 && type === "WizMeAdmin") {
    return (
      <Sidebar
        history={props.history}
        listitemnames={listitemnames}
        // icon={icons}
        path={pathname[1]}
        view={view[viewname]}
        heading={"Wizme Admin"}
        // pending={pending}
      />
    );
  }
}
