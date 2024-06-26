import axios from "axios";

export interface Notifications {
  id: string;
  type: string;
  notificationsTitle: string;
  notificationsContent: string;
  date: string;
  time: string;
}

export const getNotifications = async (token: string): Promise<Notifications[]> => {
    try {
      const response = await axios.get(
        `https://backend-skyfly-c1.vercel.app/api/v1/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return []; 
    }
  };
  
