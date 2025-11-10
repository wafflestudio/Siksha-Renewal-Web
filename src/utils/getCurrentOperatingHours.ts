const getCurrentOperatingHours = (
  type: string,
  hours: {
    weekdays: string[];
    saturday: string[];
    holiday: string[];
  },
): string => {
  const currentDay = new Date().getDay();

  const getDayType = (): string[] => {
    switch (currentDay) {
    case 0: // 일요일
      return hours.holiday;
    case 6: // 토요일
      return hours.saturday;
    default: // 평일
      return hours.weekdays;
    }
  };

  const dayType = getDayType();
  const [br, lu, dn] = dayType.length === 3 ? dayType : [null, ...dayType]; // 길이에 따라 [br, lu, dn] 처리

  return (type === "br" ? br : type === "lu" ? lu : dn) ?? "";
};

export default getCurrentOperatingHours;
