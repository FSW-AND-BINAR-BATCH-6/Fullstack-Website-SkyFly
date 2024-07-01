"use client";

import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";
import { showTicket } from "./actions";

interface ShowTicketProps {}

const ShowTicket: FC<ShowTicketProps> = ({}) => {
  const [ticketHtml, setTicketHtml] = useState<string>("");

  const handleShowTicket = async () => {
    try {
      const data = await showTicket();
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={handleShowTicket} className="w-40 sm:w-60">
        Show Tickets
      </Button>
      <div
        dangerouslySetInnerHTML={{ __html: ticketHtml }}
        className="ticket-container"
      />
    </div>
  );
};

export default ShowTicket;
