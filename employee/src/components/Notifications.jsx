import React, { useContext } from "react";
import moment from "moment";
import { Mail, MailCheck, Trash } from "lucide-react";
import { EmployeeContext } from "./context/EmployeeContexr";
import axios from "axios";
import no_notification from "./../assets/a-well-designed-flat-icon-of-no-notification-yet-vector.jpg";

const Notifications = () => {
  const { notifications, markAsRead, getNotification } =
    useContext(EmployeeContext);

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
    getNotification();
  };

  const handleDelete = async (id) => {
    console.log("delete initiated");
    console.log(id);
    await axios
      .post("http://localhost:5000/api/v1/notification/deleteNotification", {
        id,
      })
      .then((res) => {
        getNotification();
        console.log("delete completed");
      });
  };

  return (
    <div className="pt-10 lg:pt-0">
      <h1 className="my-3 text-xl text-semibold">Notification Center</h1>
      {notifications && notifications?.length > 0 ? (
        <div>
          {notifications?.map((data, index) => (
            <div
              key={index}
              onClick={() => handleMarkAsRead(data._id)}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 w-[75%] border-b border-gray-200"
            >
              <p className="flex items-start gap-2 ">
                {" "}
                {data.read ? (
                  <MailCheck className="w-20" />
                ) : (
                  <Mail className="w-20" />
                )}
                <span
                  className={`items-center flex gap-4 justify-between w-[75%] ${
                    data.read ? "text-gray-500" : "text-black"
                  }`}
                >
                  {data?.message}{" "}
                </span>
              </p>
              <span className="mt-1 text-gray-400 float-end">
                {moment(data?.createdAt).fromNow()}
              </span>
              <Trash
                className="cursor-pointer text-black-700"
                onClick={() => handleDelete(data._id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-[80vw] h-[60vh]">
          <img src={no_notification} alt="" className="w-[25%]" />
        </div>
      )}
    </div>
  );
};

export default Notifications;
