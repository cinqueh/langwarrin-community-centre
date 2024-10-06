import React, { use, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "next/navigation";

interface Room {
  roomName: string;
  capacity: number;
  communityGroupHourlyRate: number;
  permanentHiresHourlyRate: number;
  casualHiresHourlyRate: number;
}

interface RoomDetailsFormProps {
  roomLabel: string;
  hireTypeLabel: string;
  hireTypeInfo: string;
  dateLabel: string;
  timeLabel: string;
  linkUrl: string;
}

const RoomDetailsFormForm = (props: RoomDetailsFormProps) => {
  const [formData, setFormData] = useState({
    room: "",
    hireType: "",
    date: "",
    startTime: "",
    endTime: "",
    total: 0,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Load data from local storage when the page loads
  useEffect(() => {
    const savedFormData = localStorage.getItem("roomBookingData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData(parsedData);
      setSelectedRoom(
        rooms.find((r) => r.roomName === parsedData.room) || null
      );
      setTotal(parsedData.total);
    }
  }, []);

  useEffect(() => {
    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRooms(data);

        // Set room from URL query parameter if present or from local storage
        const roomFromUrl = searchParams.get("room");
        const selectedRoomName = roomFromUrl || formData.room;

        if (selectedRoomName) {
          const room = data.find(
            (r: { roomName: string }) => r.roomName === selectedRoomName
          );
          if (room) {
            setSelectedRoom(room);
            setFormData((prevFormData) => ({
              ...prevFormData,
              room: selectedRoomName,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [searchParams]);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Set selected room details for calculations
    if (e.target.name === "room") {
      const room = rooms.find((r) => r.roomName === e.target.value);
      setSelectedRoom(room || null);
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom) return total;

    const { hireType, startTime, endTime } = formData;

    // Get the hourly rate based on hire type
    let hourlyRate = 0;
    if (hireType === "Community Groups") {
      hourlyRate = selectedRoom.communityGroupHourlyRate;
    } else if (hireType === "Permanent Hirers") {
      hourlyRate = selectedRoom.permanentHiresHourlyRate;
    } else if (hireType === "Casual Hirers") {
      hourlyRate = selectedRoom.casualHiresHourlyRate;
    }

    // Calculate time difference in hours
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const hoursBooked = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    ); // Round up to nearest hour

    return hoursBooked * hourlyRate;
  };

  // when a field is changed, check if the end time is later than the start time
  // and calculate the total price
  useEffect(() => {
    if (!selectedRoom) {
      if (formData.room) {
        const room = rooms.find((r) => r.roomName === formData.room);
        setSelectedRoom(room || null);
      } else {
        return;
      }
    }

    // Check if end time is later than start time
    const start = new Date(`1970-01-01T${formData.startTime}:00`);
    const end = new Date(`1970-01-01T${formData.endTime}:00`);

    if (end <= start) {
      setShowError(true);
    } else {
      setShowError(false);

      // Calculate the total price only when all fields are filled
      const totalPrice = calculateTotal();
      setTotal(totalPrice);
      setFormData((prevFormData) => ({
        ...prevFormData,
        total: totalPrice,
      }));
    }
  }, [
    formData.room,
    formData.hireType,
    formData.startTime,
    formData.endTime,
    selectedRoom,
  ]);

  const isFormComplete =
    formData.room &&
    formData.hireType &&
    formData.date &&
    formData.startTime &&
    formData.endTime &&
    !showError;

  // handle next button click
  const handleNextClick = () => {
    if (isFormComplete) {
      localStorage.setItem("roomBookingData", JSON.stringify(formData));
      window.location.href = props.linkUrl;
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className={styles.bookingFormContainer}>
      {/* Room and Hire Type Row */}
      <div className={styles.inputGroup}>
        <label>{props.roomLabel}</label>
        <label>
          {props.hireTypeLabel}
          <span
            className={styles.infoIcon}
            title="Show hire types"
            onClick={() => setShowInfo(!showInfo)}
          >
            ℹ️
          </span>
        </label>
      </div>

      {showInfo && (
        <div
          className={styles.hireTypeInfo}
          dangerouslySetInnerHTML={{ __html: props.hireTypeInfo }}
        />
      )}
      <div className={styles.inputGroup}>
        <select
          name="room"
          value={formData.room}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          {rooms.map((room, index) => (
            <option key={index} value={room.roomName}>
              {room.roomName}
            </option>
          ))}
        </select>

        <select
          name="hireType"
          value={formData.hireType}
          onChange={handleInputChange}
          required
        >
          <option value="">--</option>
          <option value="Casual Hirers">Casual Hirers</option>
          <option value="Permanent Hirers">Permanent Hirers</option>
          <option value="Community Groups">Community Groups</option>
        </select>
      </div>

      {/* Date and Time Row */}
      <div className={styles.inputGroup}>
        <label>{props.dateLabel}</label>
        <label>{props.timeLabel}</label>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <div className={styles.timeInputGroup}>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
          <span>to</span>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Error Message */}
      {showError && (
        <p className={styles.errorMessage}>
          Make sure the end time is later than the start time.
        </p>
      )}

      {/* Display Total (Only show if form is complete and no errors) */}
      {isFormComplete && (
        <div className={styles.totalDisplay}>Total: ${total}</div>
      )}

      <button
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleNextClick}
      >
        Save
      </button>
    </div>
  );
};

export { RoomDetailsFormForm };
