import React, { useEffect, useState } from "react";
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
  const [showDateError, setShowDateError] = useState("");
  const [showTimeError, setShowTimeError] = useState("");
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

    // Check if selected date is before today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setShowDateError("Selected date cannot be in the past");
      return;
    } else {
      setShowDateError("");
    }

    // Check if end time is later than start time
    const start = new Date(`1970-01-01T${formData.startTime}:00`);
    const end = new Date(`1970-01-01T${formData.endTime}:00`);

    if (end <= start) {
      setShowTimeError("End time must be later than start time");
    } else {
      setShowTimeError("");
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
    formData.date, 
    selectedRoom,
  ]);

  const isFormComplete =
    formData.room &&
    formData.hireType &&
    formData.date &&
    formData.startTime &&
    formData.endTime &&
    showDateError === "" &&
    showTimeError === "";

  // handle next button click
  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) return;
    localStorage.setItem("roomBookingData", JSON.stringify(formData));
    window.location.href = props.linkUrl;
  };

  return (
    <form className={styles.bookingFormContainer} onSubmit={handleNextClick}>
      {/* Room and Hire Type Group */}
      <div className={styles.columnGroup}>
        {/* Room Group */}
        <div className={styles.formGroup}>
          <label>{props.roomLabel}</label>
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
        </div>

        {/* Hire Type Group */}
        <div className={styles.formGroup}>
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
      </div>

      {showInfo && (
        <div
          className={styles.hireTypeInfo}
          dangerouslySetInnerHTML={{ __html: props.hireTypeInfo }}
        />
      )}

      {/* Date and Time Group */}
      <div className={styles.columnGroup}>
        {/* Date Group */}
        <div className={styles.formGroup}>
          <label>{props.dateLabel}</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Time Group */}
        <div className={styles.formGroup}>
          <label>{props.timeLabel}</label>
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
      </div>

      {/* Error Message */}
      {showDateError && <p className="alertError">{showDateError}</p>}
      {showTimeError && <p className="alertError">{showTimeError}</p>}

      {/* Display Total (Only show if form is complete and no errors) */}
      {isFormComplete && (
        <div className={styles.totalDisplay}>Total: ${total}</div>
      )}

      <button
        type="submit"
        className="button-white"
        style={{ display: "block", margin: "0 auto" }}
        disabled={!isFormComplete}
      >
        Save
      </button>
    </form>
  );
};

export { RoomDetailsFormForm };
