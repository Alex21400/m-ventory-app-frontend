import { FaTh, FaCommentAlt } from "react-icons/fa";
import { CgProfile } from 'react-icons/cg'
import { MdLibraryAdd } from "react-icons/md";

const menu = [
  {
    title: "Stats",
    icon: <FaTh />,
    path: "stats",
  },
  {
    title: "Add Product",
    icon: <MdLibraryAdd />,
    path: "add-product",
  },
  {
    title: "Account",
    icon: <CgProfile />,
    children: [
      {
        title: "Profile",
        path: "profile",
      },
      {
        title: "Edit Profile",
        path: "edit-profile",
      },
      {
        title: "Change Password",
        path: 'change-password'
      }
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "contact-us",
  },
];

export default menu;