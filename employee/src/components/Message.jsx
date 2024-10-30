import React, { useContext, useState, useEffect } from "react";
import employee_profile from "./../assets/employee_profile.png";
import axios from "axios";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { EmployeeContext } from "./context/EmployeeContexr";

const Message = () => {
  const { uniqueRecipients, id, getUniqueRecipientsWithLatestMessage } =
    useContext(EmployeeContext);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [msg, setMsg] = useState("");

  // Set the first recipient as the default selected recipient
  useEffect(() => {
    if (uniqueRecipients.length > 0) {
      setSelectedRecipient(uniqueRecipients[0].recipient);
    }
  }, [uniqueRecipients]);

  // Fetch conversation when a recipient is selected
  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedRecipient) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/messages/getMessages",
            {
              sender: id, 
              receiver: selectedRecipient._id,
            }
          );
          setConversation(response.data.message);
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      }
    };
    fetchConversation();
  }, [selectedRecipient]);

  // Handle sending a new message
  const handleSubmitSend = async (receiverId, e) => {
    e.preventDefault();
    const senderType = "employee";
    const sender = id;
    const receiver = receiverId;
    const message = msg;
    const receiverType = "Admin";

    try {
      await axios.post("http://localhost:5000/api/v1/messages/sendMessage", {
        sender,
        senderType,
        receiver,
        message,
        receiverType,
      })
        .then((res) => {
          if (res.data.message === "Message sent successfully") {
            toast(
              <div className="w-full p-4 text-white bg-green-900 rounded-lg">
                <h1 className="text-md">Message sent successfully</h1>
              </div>
            );
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
      setMsg("");
      
      // Re-fetch the conversation to update it
      const response = await axios.post(
        "http://localhost:5000/api/v1/messages/getMessages",
        {
          sender: id, // Replace with admin ID
          receiver: selectedRecipient._id,
        }
      );
      setConversation(response.data.message);
      getUniqueRecipientsWithLatestMessage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="z-30 flex flex-col gap-4 lg:flex-row lg:justify-center">
      <Toaster className="toast-container" />
      <div className="border border-gray-500 lg:w-[25%] p-3 rounded-md w-full">
        {uniqueRecipients.map((data) => (
          <div
            key={data?.recipient?._id}
            className={`flex gap-4 mt-4 overflow-hidden cursor-pointer ${
              selectedRecipient?._id === data?.recipient?._id
                ? "bg-green-50"
                : ""
            }`}
            onClick={() => setSelectedRecipient(data?.recipient)}
          >
            <img
              src={data?.recipient?.profilePic}
              alt=""
              className="w-10 rounded-full"
            />
            <div>
              <h1>{data?.recipient?.name}</h1>
              <h1 className="text-truncate">
                {data?.latestMessage?.senderType === "employee"
                  ? "You: "
                  : `${data?.recipient?.name}: `}
                <span className="truncate-message">
                  {data?.latestMessage?.message}
                </span>
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-500 lg:w-[60%] p-3 rounded-md w-full lg:h-[70vh] flex flex-col overflow-auto ">
        {selectedRecipient ? (
          <>
            <h1>Conversation with {selectedRecipient.name}</h1>
            <div className="flex-grow overflow-y-auto">
              {conversation.length > 0 ? (
                conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`mt-2 ${
                      msg.senderType === "employee"
                        ? "text-right float-right clear-both px-3"
                        : "text-left float-left clear-both"
                    }`}
                  >
                    <p
                      className={`flex p-2 rounded-lg items-center gap-2 ${
                        msg.senderType === "employee"
                          ? "bg-green-200"
                          : "bg-gray-200"
                      }`}
                    >
                      <img
                        src={msg.sender.profilePic}
                        alt=""
                        className="w-10 rounded-full"
                      />

                      {msg.message}
                    </p>
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
          </>
        ) : (
          <p>Select a recipient to view the conversation.</p>
        )}

        <form
          className="mt-auto"
          onSubmit={(e) => handleSubmitSend(selectedRecipient._id, e)}
        >
          <textarea
            name=""
            id=""
            className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
            rows={5}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-center">
            <Button className="px-10 py-2 mt-3 bg-green-900" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
